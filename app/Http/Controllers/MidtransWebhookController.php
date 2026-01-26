<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Enum\PaymentStatus;

class MidtransWebhookController extends Controller
{
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

            // Log the notification
            Log::info('Midtrans Notification Received', [
                'order_id' => $orderId,
                'transaction_status' => $transactionStatus,
                'fraud_status' => $fraudStatus,
                'payment_type' => $paymentType,
                // 'notification' => $notification // Avoid logging full object if huge
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

            // Find the order
            $order = Order::where('order_id', $orderId)->first();

            if (!$order) {
                Log::error('Order not found for Midtrans notification', [
                    'order_id' => $orderId
                ]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Order not found'
                ], 404);
            }

            // Update order based on transaction status
            if ($transactionStatus == 'capture') {
                if ($fraudStatus == 'accept') {
                    // Payment success (credit card)
                    $order->payment_status = PaymentStatus::Success;
                    $order->transaction_id = $notification->transaction_id;
                    $order->payment_method = $paymentType;
                    $order->paid_at = now();
                } else {
                    // Payment flagged as fraud
                    $order->payment_status = PaymentStatus::Failed;
                    $order->transaction_id = $notification->transaction_id;
                    $order->payment_method = $paymentType;
                }
            } elseif ($transactionStatus == 'settlement') {
                // Payment success
                $order->payment_status = PaymentStatus::Success;
                $order->transaction_id = $notification->transaction_id;
                $order->payment_method = $paymentType;
                $order->paid_at = now();
            } elseif ($transactionStatus == 'pending') {
                // Payment pending
                $order->payment_status = PaymentStatus::Pending;
                $order->transaction_id = $notification->transaction_id;
                $order->payment_method = $paymentType;
            } elseif ($transactionStatus == 'deny' || $transactionStatus == 'cancel') {
                // Payment denied or cancelled
                $order->payment_status = PaymentStatus::Failed;
                $order->transaction_id = $notification->transaction_id;
                $order->payment_method = $paymentType;
            } elseif ($transactionStatus == 'expire') {
                // Payment expired
                $order->payment_status = PaymentStatus::Expired;
                $order->transaction_id = $notification->transaction_id;
                $order->payment_method = $paymentType;
            }

            $order->save();

            Log::info('Order status updated from Midtrans notification', [
                'order_id' => $orderId,
                'payment_status' => $order->payment_status,
                'transaction_id' => $order->transaction_id
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Notification processed'
            ]);
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

            // Update order based on transaction status (Same logic as handle)
            if ($transactionStatus == 'capture') {
                if ($fraudStatus == 'accept') {
                    $order->payment_status = PaymentStatus::Success;
                    $order->paid_at = now();
                } else {
                    $order->payment_status = PaymentStatus::Failed;
                }
            } elseif ($transactionStatus == 'settlement') {
                $order->payment_status = PaymentStatus::Success;
                $order->paid_at = now();
            } elseif ($transactionStatus == 'pending') {
                $order->payment_status = PaymentStatus::Pending;
            } elseif ($transactionStatus == 'deny' || $transactionStatus == 'cancel') {
                $order->payment_status = PaymentStatus::Failed;
            } elseif ($transactionStatus == 'expire') {
                $order->payment_status = PaymentStatus::Expired;
            }

            $order->transaction_id = $transactionId;
            $order->payment_method = $paymentType;
            $order->save();

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
