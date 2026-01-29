<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Enum\PaymentStatus;
use App\Enum\OrderStatus;

class CheckoutController extends Controller
{
    public function index()
    {
        return Inertia::render('Shop/Checkout');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            // Shipping information
            'shipping_courier' => 'nullable|string|max:100',
            'shipping_service' => 'required_with:shipping_courier|string|max:100',
            // 'shipping_cost' => 'nullable|integer|min:0', // We calculate this server-side now
            'destination_district_id' => 'required_with:shipping_courier|integer',
            'shipping_etd' => 'nullable|string|max:50',
        ]);

        try {
            $order = DB::transaction(function () use ($validated, $request) {
                $itemIds = collect($validated['items'])->pluck('id');

                // Lock produk untuk mencegah race condition pada stok
                $products = Product::whereIn('id', $itemIds)
                    ->lockForUpdate()
                    ->get()
                    ->keyBy('id');

                $subtotal = 0;
                $totalWeight = 0;
                $orderItemsData = [];

                foreach ($validated['items'] as $item) {
                    $product = $products[$item['id']];

                    if ($product->stock < $item['quantity']) {
                        throw new \Exception(
                            "Stok untuk produk '{$product->name}' tidak mencukupi. " .
                                "Tersedia: {$product->stock}, Diminta: {$item['quantity']}"
                        );
                    }

                    $price = $product->price;
                    $lineTotal = $price * $item['quantity'];

                    $subtotal += $lineTotal;
                    $totalWeight += ($product->weight ?? 200) * $item['quantity'];

                    $orderItemsData[] = [
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'unit_price' => $price,
                        'quantity' => $item['quantity'],
                        'subtotal' => $lineTotal,
                    ];

                    $product->decrement('stock', $item['quantity']);
                }

                // Server-side Shipping Cost Calculation
                $shippingCost = 0;
                if (!empty($validated['shipping_courier']) && !empty($validated['destination_district_id'])) {
                    $rajaOngkir = app(\App\Services\RajaOngkirService::class);
                    $costs = $rajaOngkir->calculateShippingCost(
                        $validated['destination_district_id'],
                        $totalWeight,
                        strtolower($validated['shipping_courier'])
                    );

                    $validOption = null;
                    if ($costs) {
                        foreach ($costs as $option) {
                            if (strcasecmp($option['service'], $validated['shipping_service']) === 0) {
                                $validOption = $option;
                                break;
                            }
                        }
                    }

                    if ($validOption) {
                        $shippingCost = $validOption['cost'];
                        // Optional: Overwrite ETD with server data to be safe
                        $validated['shipping_etd'] = $validOption['etd'];
                    } else {
                        // Fail if cost verification fails (security)
                        throw new \Exception("Invalid shipping service selected or price changed. Please refresh and try again.");
                    }
                }
                $grossAmount = $subtotal + $shippingCost;
                $orderId = 'ORD-' . strtoupper(Str::random(4)) . '-' . now()->timestamp;

                $order = Order::create([
                    'user_id' => auth()->id(),
                    'order_id' => $orderId,
                    'subtotal' => $subtotal,
                    'shipping_cost' => $shippingCost,
                    'gross_amount' => $grossAmount,
                    'payment_status' => PaymentStatus::Pending,
                    'customer_name' => $validated['customer_name'],
                    'email' => $validated['email'],
                    'customer_phone' => $validated['customer_phone'],
                    'shipping_address' => $validated['shipping_address'],
                    'notes' => $validated['notes'] ?? null,
                    // Shipping courier details for warehouse
                    'shipping_courier' => $validated['shipping_courier'] ?? null,
                    'shipping_service' => $validated['shipping_service'] ?? null,
                    'shipping_etd' => $validated['shipping_etd'] ?? null,
                ]);

                foreach ($orderItemsData as $data) {
                    $order->orderItems()->create($data);
                }

                // Generate Midtrans Snap Token
                \Midtrans\Config::$serverKey = config('midtrans.server_key');
                \Midtrans\Config::$isProduction = config('midtrans.is_production');
                \Midtrans\Config::$isSanitized = config('midtrans.is_sanitized');
                \Midtrans\Config::$is3ds = config('midtrans.is_3ds');

                // Prepare items for Midtrans
                $midtransItems = [];
                foreach ($orderItemsData as $item) {
                    $midtransItems[] = [
                        'id' => $item['product_id'],
                        'price' => (int) $item['unit_price'],
                        'quantity' => $item['quantity'],
                        'name' => $item['product_name'],
                    ];
                }

                // Add shipping as item
                if ($shippingCost > 0) {
                    $midtransItems[] = [
                        'id' => 'SHIPPING',
                        'price' => (int) $shippingCost,
                        'quantity' => 1,
                        'name' => 'Shipping Cost - ' . ($validated['shipping_courier'] ?? 'Standard'),
                    ];
                }

                $midtransParams = [
                    'transaction_details' => [
                        'order_id' => $orderId,
                        'gross_amount' => (int) $grossAmount,
                    ],
                    'item_details' => $midtransItems,
                    'customer_details' => [
                        'first_name' => $validated['customer_name'],
                        'email' => $validated['email'],
                        'phone' => $validated['customer_phone'],
                        'billing_address' => [
                            'address' => $validated['shipping_address'],
                        ],
                        'shipping_address' => [
                            'address' => $validated['shipping_address'],
                        ],
                    ],
                    'callbacks' => [
                        'finish' => route('order.complete', ['order' => $orderId]),
                    ],
                ];

                try {
                    $snapToken = \Midtrans\Snap::getSnapToken($midtransParams);
                    $order->snap_token = $snapToken;
                    $order->save();
                } catch (\Exception $e) {
                    Log::error('Midtrans Snap Token Error: ' . $e->getMessage(), [
                        'order_id' => $orderId,
                        'params' => $midtransParams
                    ]);
                    // CRITICAL: Rollback if payment gateway fails
                    throw new \Exception("Payment gateway error. Please try again later.");
                }


                return $order;
            });

            // Send Emails (Customer first, then Admin after 10s delay)
            try {
                // 1. Customer Email - Order Confirmation
                \Illuminate\Support\Facades\Mail::to($order->email)->send(new \App\Mail\OrderConfirmation($order));
                Log::info('Order confirmation email sent to customer: ' . $order->order_id);
            } catch (\Exception $e) {
                Log::error('Failed to send Customer Email: ' . $e->getMessage());
            }

            // Delay 10 detik (Mailtrap Rate Limit Protection)
            \sleep(10);

            try {
                // 2. Admin Email - New Order Alert
                \Illuminate\Support\Facades\Mail::to('admin@junelabel.com')->send(new \App\Mail\NewOrderAlert($order));
                Log::info('New order alert sent to admin: ' . $order->order_id);
            } catch (\Exception $e) {
                Log::error('Failed to send Admin Email: ' . $e->getMessage());
            }

            return redirect()->route('order.complete', ['order' => $order->order_id])
                ->with('success', 'Order created successfully. Please proceed to payment.');
        } catch (\Exception $e) {
            Log::error('Checkout Error: ' . $e->getMessage(), [
                'user_id' => auth()->id(),
                'items' => $validated['items'] ?? [],
                'exception' => $e
            ]);

            return inertia('Shop/OrderError', [
                'error' => 'Unable to process your order. Please check your information and try again.'
            ]);
        }
    }

    public function complete($orderCode)
    {
        $order = Order::with('orderItems')->where('order_id', $orderCode)->firstOrFail();

        if (auth()->check() && $order->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Shop/OrderComplete', [
            'order' => $order
        ]);
    }

    public function cancel($orderId)
    {
        try {
            $order = Order::with('orderItems')->where('order_id', $orderId)->firstOrFail();

            // Security: Only owner can cancel
            if ($order->user_id !== auth()->id()) {
                return back()->with('error', 'Unauthorized action.');
            }

            // Only pending payment can be cancelled
            if ($order->payment_status !== PaymentStatus::Pending) {
                return back()->with('error', 'Only pending orders can be cancelled.');
            }

            DB::transaction(function () use ($order) {
                // Restore product stock
                foreach ($order->orderItems as $item) {
                    $product = Product::find($item->product_id);
                    if ($product) {
                        $product->increment('stock', $item->quantity);
                    }
                }

                // Update order status
                $order->payment_status = PaymentStatus::Failed;
                $order->order_status = OrderStatus::Cancelled;
                $order->cancellation_reason = 'Cancelled by customer';
                $order->save();

                Log::info('Order cancelled by customer', [
                    'order_id' => $order->order_id,
                    'user_id' => auth()->id(),
                ]);
            });

            return back()->with('success', 'Order cancelled successfully. Stock has been restored.');
        } catch (\Exception $e) {
            Log::error('Order cancellation error: ' . $e->getMessage(), [
                'order_id' => $orderId,
                'user_id' => auth()->id(),
            ]);

            return back()->with('error', 'Failed to cancel order. Please try again.');
        }
    }
}
