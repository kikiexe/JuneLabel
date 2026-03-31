<?php

namespace App\Services;

use App\Enum\OrderStatus;
use App\Enum\PaymentStatus;
use App\Mail\NewOrderAlert;
use App\Mail\OrderConfirmation;
use App\Mail\PaymentSuccess;
use App\Mail\AdminPaymentSuccess;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class OrderService
{
    protected $rajaOngkirService;
    protected $midtransService;

    public function __construct(
        RajaOngkirService $rajaOngkirService,
        MidtransService $midtransService
    ) {
        $this->rajaOngkirService = $rajaOngkirService;
        $this->midtransService = $midtransService;
    }

    /**
     * Handle order creation process
     *
     * @param array $data Validated checkout data
     * @param User|null $user Authenticated user (optional)
     * @return Order
     * @throws \Exception
     */
    public function createOrder(array $data, ?User $user = null): Order
    {
        return DB::transaction(function () use ($data, $user) {
            // 1. Prepare Items & Lock Stock
            $itemIds = collect($data['items'])->pluck('id');

            $products = Product::whereIn('id', $itemIds)
                ->lockForUpdate()
                ->get()
                ->keyBy('id');

            $subtotal = 0;
            $totalWeight = 0;
            $orderItemsData = [];

            foreach ($data['items'] as $item) {
                if (!isset($products[$item['id']])) {
                    throw new \Exception("Product with ID {$item['id']} not found.");
                }

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

            // 2. Calculate Shipping Cost
            $shippingCost = $this->calculateShipping($data, $totalWeight);
            $grossAmount = $subtotal + $shippingCost;

            // 3. Create Order Record
            $orderId = 'ORD-' . strtoupper(Str::random(4)) . '-' . now()->timestamp;

            $order = Order::create([
                'user_id' => $user ? $user->id : null,
                'order_id' => $orderId,
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'gross_amount' => $grossAmount,
                'payment_status' => PaymentStatus::Pending,
                'customer_name' => $data['customer_name'],
                'email' => $data['email'],
                'customer_phone' => $data['customer_phone'],
                'shipping_address' => $data['shipping_address'],
                'notes' => $data['notes'] ?? null,
                'shipping_courier' => $data['shipping_courier'] ?? null,
                'shipping_service' => $data['shipping_service'] ?? null,
                'shipping_etd' => $data['shipping_etd'] ?? null,
            ]);

            // 4. Create Order Items
            foreach ($orderItemsData as $itemData) {
                $order->orderItems()->create($itemData);
            }

            // 5. Setup Midtrans Payment
            // $this->setupPayment($order, $orderItemsData, $shippingCost, $grossAmount, $data);


            return $order;
        });
    }

    protected function calculateShipping(array $data, int $totalWeight): int
    {
        $shippingCost = 0;

        if (!empty($data['shipping_courier']) && !empty($data['destination_district_id'])) {
            $costs = $this->rajaOngkirService->calculateShippingCost(
                $data['destination_district_id'],
                $totalWeight,
                strtolower($data['shipping_courier'])
            );

            $validOption = null;
            if ($costs) {
                foreach ($costs as $option) {
                    if (strcasecmp($option['service'], $data['shipping_service']) === 0) {
                        $validOption = $option;
                        break;
                    }
                }
            }

            if ($validOption) {
                $shippingCost = $validOption['cost'];
                // Note: Not updating $data ref here as in controller,
                // caller should handle 'shipping_etd' update if needed,
                // but strictly speaking we just need the cost for the order.
                // The stored order will use the passed 'shipping_etd' or we can return it.
                // For now, let's keep it simple and use the cost found.
            } else {
                throw new \Exception("Invalid shipping service selected or price changed. Please refresh and try again.");
            }
        }

        return $shippingCost;
    }

    protected function setupPayment(Order $order, array $items, int $shippingCost, int $grossAmount, array $customerData): void
    {
        $midtransItems = [];
        foreach ($items as $item) {
            $midtransItems[] = [
                'id' => $item['product_id'],
                'price' => (int) $item['unit_price'],
                'quantity' => $item['quantity'],
                'name' => $item['product_name'],
            ];
        }

        if ($shippingCost > 0) {
            $midtransItems[] = [
                'id' => 'SHIPPING',
                'price' => (int) $shippingCost,
                'quantity' => 1,
                'name' => 'Shipping Cost - ' . ($customerData['shipping_courier'] ?? 'Standard'),
            ];
        }

        $midtransParams = [
            'transaction_details' => [
                'order_id' => $order->order_id,
                'gross_amount' => (int) $grossAmount,
            ],
            'item_details' => $midtransItems,
            'customer_details' => [
                'first_name' => $customerData['customer_name'],
                'email' => $customerData['email'],
                'phone' => $customerData['customer_phone'],
                'billing_address' => [
                    'address' => $customerData['shipping_address'],
                ],
                'shipping_address' => [
                    'address' => $customerData['shipping_address'],
                ],
            ],
            'callbacks' => [
                'finish' => route('order.complete', ['order' => $order->order_id]),
            ],
        ];

        try {
            $snapToken = $this->midtransService->getSnapToken($midtransParams);
            $order->snap_token = $snapToken;
            $order->save();
        } catch (\Exception $e) {
            Log::error('Midtrans Snap Token Error: ' . $e->getMessage(), [
                'order_id' => $order->order_id,
                'params' => $midtransParams
            ]);
            throw new \Exception("Payment gateway error. Please try again later.");
        }
    }

    public function sendNotifications(Order $order): void
    {
        // 1. Customer Email
        try {
            Mail::to($order->email)->send(new OrderConfirmation($order));
            Log::info('Order confirmation email sent to customer: ' . $order->order_id);
        } catch (\Exception $e) {
            Log::error('Failed to send Customer Email: ' . $e->getMessage());
        }

        // 2. Admin Email
        try {
            Mail::to(config('mail.admin_address'))->send(new NewOrderAlert($order));
            Log::info('New order alert sent to admin: ' . $order->order_id);
        } catch (\Exception $e) {
            Log::error('Failed to send Admin Email: ' . $e->getMessage());
        }
    }

    public function updatePaymentStatus(Order $order, string $transactionStatus, ?string $fraudStatus, string $paymentType, ?string $transactionId): void
    {
        // Update order based on transaction status
        if ($transactionStatus == 'capture') {
            if ($fraudStatus == 'accept') {
                // Payment success (credit card)
                $order->payment_status = PaymentStatus::Success;
                $order->paid_at = now();
                $order->order_status = OrderStatus::Processing;
                $this->sendPaymentSuccessEmails($order);
            } else {
                // Payment flagged as fraud
                $order->payment_status = PaymentStatus::Failed;
            }
        } elseif ($transactionStatus == 'settlement') {
            // Payment success
            $order->payment_status = PaymentStatus::Success;
            $order->paid_at = now();
            $order->order_status = OrderStatus::Processing;
            $this->sendPaymentSuccessEmails($order);
        } elseif ($transactionStatus == 'pending') {
            // Payment pending
            $order->payment_status = PaymentStatus::Pending;
        } elseif ($transactionStatus == 'deny' || $transactionStatus == 'cancel') {
            // Payment denied or cancelled
            $order->payment_status = PaymentStatus::Failed;
        } elseif ($transactionStatus == 'expire') {
            // Payment expired
            $order->payment_status = PaymentStatus::Expired;
        }

        if ($transactionId) {
            $order->transaction_id = $transactionId;
        }
        $order->payment_method = $paymentType;

        $order->save();

        Log::info('Order status updated via Service', [
            'order_id' => $order->order_id,
            'payment_status' => $order->payment_status,
            'transaction_id' => $order->transaction_id
        ]);
    }

    protected function sendPaymentSuccessEmails(Order $order): void
    {
        // Avoid duplicate emails
        if ($order->payment_email_sent) {
            return;
        }

        try {
            if ($order->email) {
                // 1. Customer Email
                Mail::to($order->email)->send(new PaymentSuccess($order));
                Log::info('Payment success email sent to customer: ' . $order->order_id);

                // 2. Admin Email
                Mail::to(config('mail.admin_address'))->send(new AdminPaymentSuccess($order));
                Log::info('Admin payment notification sent: ' . $order->order_id);

                $order->payment_email_sent = true;
                $order->saveQuietly(); // Use saveQuietly or just allow save() in caller but careful with race conditions?
                // Caller (updatePaymentStatus) calls save() at the end.
                // Updating propery here is fine, caller's save() will persist it.
                // Wait, caller saves `payment_method` etc.
                // Let's rely on object reference.
            }
        } catch (\Exception $e) {
            Log::error('Failed to send payment success email: ' . $e->getMessage());
        }
    }
}
