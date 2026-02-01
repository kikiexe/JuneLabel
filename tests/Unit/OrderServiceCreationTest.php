<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Services\OrderService;
use App\Services\RajaOngkirService;
use App\Services\MidtransService;
use App\Enum\PaymentStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Mockery;

class OrderServiceCreationTest extends TestCase
{
    use RefreshDatabase;

    protected $orderService;
    protected $rajaOngkirMock;
    protected $midtransMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->rajaOngkirMock = Mockery::mock(RajaOngkirService::class);
        $this->midtransMock = Mockery::mock(MidtransService::class);

        $this->midtransMock->shouldReceive('getSnapToken')->andReturn('dummy-snap-token');

        $this->orderService = new OrderService(
            $this->rajaOngkirMock,
            $this->midtransMock
        );
    }

    public function test_can_create_order_successfully()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create([
            'price' => 100000,
            'stock' => 10,
            'weight' => 1000
        ]);

        $data = [
            'customer_name' => 'John Doe',
            'email' => 'john@example.com',
            'customer_phone' => '08123456789',
            'shipping_address' => 'Jl. Test No. 123',
            'items' => [
                [
                    'id' => $product->id,
                    'quantity' => 2
                ]
            ],
            'shipping_courier' => 'jne',
            'shipping_service' => 'REG',
            'destination_district_id' => 123,
            'shipping_etd' => '2-3 hari',
        ];

        // Mock RajaOngkir call
        $this->rajaOngkirMock->shouldReceive('calculateShippingCost')
            ->once()
            ->andReturn([
                [
                    'service' => 'REG',
                    'cost' => 20000,
                    'etd' => '2-3 hari'
                ]
            ]);

        $order = $this->orderService->createOrder($data, $user);

        // Assert Order Created
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'user_id' => $user->id,
            'customer_name' => 'John Doe',
            'subtotal' => 200000, // 100k * 2
            'shipping_cost' => 20000,
            'gross_amount' => 220000, // 200k + 20k
            'payment_status' => PaymentStatus::Pending->value,
        ]);

        // Assert Stock Decremented
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'stock' => 8 // 10 - 2
        ]);

        // Assert Order Items
        $this->assertDatabaseHas('order_items', [
            'order_id' => $order->id,
            'product_id' => $product->id,
            'quantity' => 2,
            'unit_price' => 100000
        ]);
    }

    public function test_cannot_create_order_if_stock_insufficient()
    {
        $product = Product::factory()->create([
            'stock' => 1
        ]);

        $data = [
            'items' => [
                [
                    'id' => $product->id,
                    'quantity' => 2 // Request more than stock
                ]
            ],
            // Data lain tidak penting karena akan fail di stock check
            'customer_name' => 'John Doe',
        ];

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage("Stok untuk produk '{$product->name}' tidak mencukupi");

        $this->orderService->createOrder($data);

        // Assert Stock NOT Decremented
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'stock' => 1
        ]);
    }
}
