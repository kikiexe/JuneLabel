<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MidtransWebhookController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    /**
     * Handle Midtrans notification webhook
     *
     * This endpoint receives payment notifications from Midtrans
     * and updates the order payment status accordingly
     */
    public function handle(Request $request)
    {
        // Configure Midtrans
        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = config('midtrans.is_production');
        \Midtrans\Config::$isSanitized = config('midtrans.is_sanitized');
        \Midtrans\Config::$is3ds = config('midtrans.is_3ds');

        try {
            // Get notification from Midtrans
            $notification = new \Midtrans\Notification();

            $orderId = $notification->order_id;
            $transactionStatus = $notification->transaction_status;
            $fraudStatus = $notification->fraud_status;
            $paymentType = $notification->payment_type;
            $transactionId = $notification->transaction_id;

            // Log the notification
            Log::info('Midtrans Notification Received', [
                'order_id' => $orderId,
                'transaction_status' => $transactionStatus,
                'fraud_status' => $fraudStatus,
                'payment_type' => $paymentType,
            ]);

            // Verify Signature to ensure authenticity
            $serverKey = config('midtrans.server_key');
            $statusCode = $notification->status_code;
            $grossAmount = $notification->gross_amount;
            $signatureKey = $notification->signature_key;

            $input = $orderId . $statusCode . $grossAmount . $serverKey;
            $mySignature = hash('sha512', $input);

            if ($mySignature !== $signatureKey) {
                Log::warning('Midtrans Invalid Signature', [
                    'order_id' => $orderId,
                    'expected' => $mySignature,
                    'received' => $signatureKey
                ]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid signature'
                ], 403);
            }

            return DB::transaction(function () use ($orderId, $transactionStatus, $fraudStatus, $paymentType, $transactionId) {
                // Find the order with lock
                $order = Order::where('order_id', $orderId)->lockForUpdate()->first();

                if (!$order) {
                    Log::error('Order not found for Midtrans notification', [
                        'order_id' => $orderId
                    ]);
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Order not found'
                    ], 404);
                }

                // Delegate status update to OrderService
                $this->orderService->updatePaymentStatus(
                    $order,
                    $transactionStatus,
                    $fraudStatus,
                    $paymentType,
                    $transactionId
                );

                return response()->json([
                    'status' => 'success',
                    'message' => 'Notification processed'
                ]);
            });
        } catch (\Exception $e) {
            Log::error('Error processing Midtrans notification', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to process notification'
            ], 500);
        }
    }

    /**
     * Manual check payment status
     * This can be used to manually verify payment status with Midtrans
     */
    public function checkStatus($orderId)
    {
        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = config('midtrans.is_production');

        try {
            $status = \Midtrans\Transaction::status($orderId);
            $order = Order::where('order_id', $orderId)->firstOrFail();

            $transactionStatus = $status->transaction_status;
            $fraudStatus = $status->fraud_status ?? null;
            $paymentType = $status->payment_type;
            $transactionId = $status->transaction_id;

            // Delegate status update to OrderService
            $this->orderService->updatePaymentStatus(
                $order,
                $transactionStatus,
                $fraudStatus,
                $paymentType,
                $transactionId
            );

            return response()->json([
                'status' => 'success',
                'data' => $status,
                'order_status' => $order->payment_status
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
