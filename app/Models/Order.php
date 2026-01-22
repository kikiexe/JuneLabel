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
        'order_code',
        'subtotal',
        'shipping_cost',
        'total_price',
        'snap_token',
        'transaction_id',
        'payment_method',
        'payment_status',
        'paid_at',
        'order_status',
        'customer_name',
        'customer_phone',
        'shipping_address',
        'shipping_courier',
        'shipping_service',
        'shipping_etd',
        'notes'
    ];

    protected $casts = [
        'order_status' => OrderStatus::class,
        'payment_status' => PaymentStatus::class,
        'subtotal' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'total_price' => 'decimal:2',
        'paid_at' => 'datetime',
        'payment_status_updated_at' => 'datetime',
        'order_status_updated_at' => 'datetime',
    ];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    // Auto-update timestamps and audit log
    protected static function booted()
    {
        static::updating(function ($order) {
            // Payment Status Tracking
            if ($order->isDirty('payment_status')) {
                $order->payment_status_updated_at = now();

                // Normalize value (handle both Enum and String)
                $newStatus = $order->payment_status instanceof PaymentStatus
                    ? $order->payment_status->value
                    : $order->payment_status;

                // Auto-set paid_at on success
                if ($newStatus === 'success' && is_null($order->paid_at)) {
                    $order->paid_at = now();
                }

                // Audit Log
                Log::info("Order Payment Status Changed", [
                    'order_id' => $order->id,
                    'order_code' => $order->order_code,
                    'from' => $order->getOriginal('payment_status'),
                    'to' => $newStatus,
                    'actor' => auth()->user()?->name ?? 'System/Webhook',
                    'actor_id' => auth()->id(),
                    'ip' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                    'timestamp' => now()->toIso8601String(),
                ]);
            }

            // Order Status Tracking
            if ($order->isDirty('order_status')) {
                $order->order_status_updated_at = now();

                $newStatus = $order->order_status instanceof OrderStatus
                    ? $order->order_status->value
                    : $order->order_status;

                Log::info("Order Status Changed", [
                    'order_id' => $order->id,
                    'order_code' => $order->order_code,
                    'from' => $order->getOriginal('order_status'),
                    'to' => $newStatus,
                    'actor' => auth()->user()?->name ?? 'System/Webhook',
                    'actor_id' => auth()->id(),
                    'ip' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                    'timestamp' => now()->toIso8601String(),
                ]);
            }
        });
    }
}
