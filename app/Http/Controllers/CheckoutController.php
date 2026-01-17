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

                    $orderItemsData[] = [
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'unit_price' => $price,
                        'quantity' => $item['quantity'],
                        'subtotal' => $lineTotal,
                    ];

                    $product->decrement('stock', $item['quantity']);
                }

                // TODO CRITICAL: Integrasi API Ongkir (RajaOngkir/BinderByte)
                // Saat ini gratis ongkir = RUGI! Prioritas tinggi!
                $shippingCost = 0;
                $totalPrice = $subtotal + $shippingCost;
                $orderCode = 'ORD-' . strtoupper(Str::random(4)) . '-' . now()->timestamp;

                $order = Order::create([
                    'user_id' => auth()->id(),
                    'order_code' => $orderCode,
                    'subtotal' => $subtotal,
                    'shipping_cost' => $shippingCost,
                    'total_price' => $totalPrice,
                    'payment_status' => PaymentStatus::Pending,
                    'customer_name' => $validated['customer_name'],
                    'customer_phone' => $validated['customer_phone'],
                    'shipping_address' => $validated['shipping_address'],
                    'notes' => $validated['notes'] ?? null,
                ]);

                foreach ($orderItemsData as $data) {
                    $order->orderItems()->create($data);
                }

                return redirect()->route('order.complete', ['order' => $order->order_code])
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
        $order = Order::with('orderItems')->where('order_code', $orderCode)->firstOrFail();

        if (auth()->check() && $order->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Shop/OrderComplete', [
            'order' => $order
        ]);
    }
}
