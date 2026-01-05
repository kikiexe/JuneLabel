<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function index()
    {
        return Inertia::render('Checkout');
    }

    public function store(Request $request)
    {
        // 1. Validate User Input
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
                // 2. Security: Recalculate Totals from Database
                // We do NOT trust any price sent from the frontend.
                $itemIds = collect($validated['items'])->pluck('id');
                $products = Product::whereIn('id', $itemIds)->get()->keyBy('id');

                $subtotal = 0;
                $orderItemsData = [];

                foreach ($validated['items'] as $item) {
                    $product = $products[$item['id']];
                    
                    // Optional: Check stock availability here
                    // if ($product->stock < $item['quantity']) { ... }

                    $price = $product->price; // Security: Taking price from DB
                    $lineTotal = $price * $item['quantity'];
                    
                    $subtotal += $lineTotal;

                    $orderItemsData[] = [
                        'product_id' => $product->id,
                        'product_name' => $product->name, // Store snapshot of name
                        'price' => $price, // Store snapshot of price at time of purchase
                        'quantity' => $item['quantity'],
                        'subtotal' => $lineTotal,
                    ];
                }

                $shippingCost = 0; // Logic for shipping cost calculation could go here
                $totalPrice = $subtotal + $shippingCost;

                // 3. Create Order
                // Generate a unique order code
                $orderCode = 'ORD-' . strtoupper(Str::random(4)) . '-' . now()->timestamp;

                $order = Order::create([
                    'user_id' => auth()->id(), // Nullable if guest checkout
                    'order_code' => $orderCode,
                    'subtotal' => $subtotal,
                    'shipping_cost' => $shippingCost,
                    'total_price' => $totalPrice,
                    'payment_status' => 'pending',
                    'customer_name' => $validated['customer_name'],
                    'customer_phone' => $validated['customer_phone'],
                    'shipping_address' => $validated['shipping_address'],
                    'notes' => $validated['notes'] ?? null,
                ]);

                // 4. Create Order Items
                foreach ($orderItemsData as $data) {
                    $order->items()->create($data);
                }

                // 5. Integration with Payment Gateway (Midtrans) would happen here
                // For now, we'll just redirect to a success page or back with success message.

                // Ideally, we return a redirect URL to the payment page or the order details page.
                return redirect()->route('order.complete', ['order' => $order->order_code])
                    ->with('success', 'Order created successfully. Please proceed to payment.');
            });

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create order: ' . $e->getMessage()]);
        }
    }

    public function complete($orderCode)
    {
        $order = Order::with('items')->where('order_code', $orderCode)->firstOrFail();
        
        // Security check: If user is logged in, make sure it's their order
        if (auth()->check() && $order->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('OrderComplete', [
            'order' => $order
        ]);
    }
}
