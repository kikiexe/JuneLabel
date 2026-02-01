<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Enum\PaymentStatus;
use App\Enum\OrderStatus;

class CheckoutController extends Controller
{
    public function index()
    {
        return Inertia::render('Shop/Checkout');
    }

    public function store(Request $request, OrderService $orderService)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1|max:10',
            // Shipping information
            'shipping_courier' => 'nullable|string|max:100',
            'shipping_service' => 'required_with:shipping_courier|string|max:100',
            'destination_district_id' => 'required_with:shipping_courier|integer',
            'shipping_etd' => 'nullable|string|max:50',
        ]);

        try {
            // Business Logic delegated to OrderService
            $order = $orderService->createOrder($validated, auth()->user());

            // Handle Emails (could be queued in service, but called here for now)
            $orderService->sendNotifications($order);

            return redirect()->route('order.complete', ['order' => $order->order_id])
                ->with('success', 'Order created successfully. Please proceed to payment.');
        } catch (\Exception $e) {
            Log::error('Checkout Error: ' . $e->getMessage(), [
                'user_id' => auth()->id(),
                'items' => $validated['items'] ?? [],
                'exception' => $e
            ]);

            return inertia('Shop/OrderError', [
                'error' => 'Unable to process your order. ' . $e->getMessage()
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

            // Validation using Enum method
            if (!$order->order_status->isCancellable()) {
                // If paid but not shipped (Processing), might need admin help
                if ($order->payment_status === PaymentStatus::Success) {
                    return back()->with('error', 'Order sudah dibayar. Hubungi admin untuk pembatalan & refund.');
                }

                return back()->with('error', 'Order tidak bisa dibatalkan karena status: ' . $order->order_status->getLabel());
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
