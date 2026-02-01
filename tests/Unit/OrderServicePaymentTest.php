<?php

namespace Tests\Unit;

use App\Enum\OrderStatus;
use App\Enum\PaymentStatus;
use App\Mail\AdminPaymentSuccess;
use App\Mail\PaymentSuccess;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class OrderServicePaymentTest extends TestCase
{
    use RefreshDatabase;

    private $orderService;

    protected function setUp(): void
    {
        parent::setUp();
        // We mock dependencies for Service if needed, or use real ones if lightweight.
        // RajaOngkir and Midtrans are injected in OrderService constructor.
        // We should mock them to avoid real API calls.

        $this->mock(\App\Services\RajaOngkirService::class);
        $this->mock(\App\Services\MidtransService::class);

        $this->orderService = app(OrderService::class);

        Mail::fake();
    }

    public function test_update_payment_status_capture_accept()
    {
        $order = Order::factory()->create([
            'payment_status' => PaymentStatus::Pending,
        ]);

        $this->orderService->updatePaymentStatus(
            $order,
            'capture',
            'accept',
            'credit_card',
            'TRANS-123'
        );

        $this->assertEquals(PaymentStatus::Success, $order->fresh()->payment_status);
        $this->assertEquals(OrderStatus::Processing, $order->fresh()->order_status);
        $this->assertEquals('TRANS-123', $order->fresh()->transaction_id);

        Mail::assertQueued(PaymentSuccess::class);
        Mail::assertQueued(AdminPaymentSuccess::class);
    }

    public function test_update_payment_status_capture_fraud()
    {
        $order = Order::factory()->create([
            'payment_status' => PaymentStatus::Pending,
        ]);

        $this->orderService->updatePaymentStatus(
            $order,
            'capture',
            'challenge', // Fraud
            'credit_card',
            'TRANS-FRAUD'
        );

        $this->assertEquals(PaymentStatus::Failed, $order->fresh()->payment_status);
        Mail::assertNotQueued(PaymentSuccess::class);
    }

    public function test_update_payment_status_settlement()
    {
        $order = Order::factory()->create([
            'payment_status' => PaymentStatus::Pending,
        ]);

        $this->orderService->updatePaymentStatus(
            $order,
            'settlement',
            null,
            'bank_transfer',
            'TRANS-456'
        );

        $this->assertEquals(PaymentStatus::Success, $order->fresh()->payment_status);
        Mail::assertQueued(PaymentSuccess::class);
    }
}
