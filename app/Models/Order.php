<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Enum\OrderStatus;
use App\Enum\PaymentStatus;
use Illuminate\Support\Facades\Log;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_id',
        'subtotal',
        'shipping_cost',
        'gross_amount',
        'snap_token',
        'transaction_id',
        'payment_method',
        'payment_status',
        'paid_at',
        'payment_email_sent',
        'order_status',
        'customer_name',
        'customer_phone',
        'email',
        'shipping_address',
        'shipping_courier',
        'shipping_service',
        'shipping_etd',
        'notes',
        'tracking_number',
        'cancellation_reason'
    ];

    protected $casts = [
        'order_status' => OrderStatus::class,
        'payment_status' => PaymentStatus::class,
        'subtotal' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'gross_amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'payment_status_updated_at' => 'datetime',
        'order_status_updated_at' => 'datetime',
        'payment_email_sent' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Otomatis update timestamp dan kirim email saat status berubah
     * - Payment status: auto set paid_at, log perubahan
     * - Order status: kirim email shipped/cancelled ke customer
     */
    protected static function booted()
    {
        static::updating(function ($order) {
            // Tracking perubahan status pembayaran
            if ($order->isDirty('payment_status')) {
                $order->payment_status_updated_at = now();

                $newStatus = $order->payment_status instanceof PaymentStatus
                    ? $order->payment_status->value
                    : $order->payment_status;

                // Auto set waktu bayar jika sukses
                if ($newStatus === 'success' && is_null($order->paid_at)) {
                    $order->paid_at = now();
                }

                // Log audit trail
                Log::info("Order Payment Status Changed", [
                    'order_id' => $order->id,
                    'order_id' => $order->order_id,
                    'from' => $order->getOriginal('payment_status'),
                    'to' => $newStatus,
                    'actor' => auth()->user()?->name ?? 'System/Webhook',
                    'actor_id' => auth()->id(),
                    'ip' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                    'timestamp' => now()->toIso8601String(),
                ]);
            }

            // Tracking perubahan status order
            if ($order->isDirty('order_status')) {
                $order->order_status_updated_at = now();

                $newStatus = $order->order_status instanceof OrderStatus
                    ? $order->order_status->value
                    : $order->order_status;

                Log::info("Order Status Changed", [
                    'order_id' => $order->id,
                    'order_id' => $order->order_id,
                    'from' => $order->getOriginal('order_status'),
                    'to' => $newStatus,
                    'actor' => auth()->user()?->name ?? 'System/Webhook',
                    'actor_id' => auth()->id(),
                    'ip' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                    'timestamp' => now()->toIso8601String(),
                ]);

                // Kirim email ke customer saat shipped atau cancelled
                try {
                    if ($newStatus === 'shipped' && $order->email) {
                        \Illuminate\Support\Facades\Mail::to($order->email)->send(new \App\Mail\OrderShipped($order));
                        Log::info('Order shipped email sent to customer: ' . $order->order_id);
                    }
                    if ($newStatus === 'cancelled' && $order->email) {
                        \Illuminate\Support\Facades\Mail::to($order->email)->send(new \App\Mail\OrderCancelled($order));
                        Log::info('Order cancelled email sent to customer: ' . $order->order_id);
                    }
                } catch (\Exception $e) {
                    Log::error("Mail error for status change: " . $e->getMessage());
                }
            }
        });
    }
}
