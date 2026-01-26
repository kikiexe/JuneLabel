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
            return DB::transaction(function () use ($validated, $request) {
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
                        'email' => auth()->user()->email ?? 'guest@junelabel.com',
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


                return redirect()->route('order.complete', ['order' => $order->order_id])
                    ->with('success', 'Order created successfully. Please proceed to payment.');
            });
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
}
