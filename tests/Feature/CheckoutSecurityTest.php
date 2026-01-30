<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Tests\TestCase;

class CheckoutSecurityTest extends TestCase
{
    use RefreshDatabase;

    private $product;

    protected function setUp(): void
    {
        parent::setUp();

        // Disable Midtrans & Mail for testing
        Config::set('midtrans.server_key', 'dummy');
        Config::set('midtrans.is_production', false);

        // Mock Mail to prevent errors
        \Illuminate\Support\Facades\Mail::fake();

        $this->product = Product::factory()->create([
            'name' => 'Security Test Product',
            'price' => 100000,
            'stock' => 10,
            'weight' => 200,
            'is_active' => true,
        ]);

        // Mock Midtrans Service
        $this->mock(\App\Services\MidtransService::class, function ($mock) {
            $mock->shouldReceive('getSnapToken')
                ->andReturn('dummy-snap-token-for-testing');
        });
    }

    public function test_checkout_ignores_frontend_price_tampering()
    {
        $user = User::factory()->create();

        // Attempt to checkout with modified price (Rp 1)
        $payload = [
            'customer_name' => 'Hacker One',
            'email' => 'hacker@example.com',
            'customer_phone' => '08123456789',
            'shipping_address' => 'Dark Web',
            'items' => [
                [
                    'id' => $this->product->id,
                    'quantity' => 2,
                    'price' => 1, // MALICIOUS INPUT
                ]
            ],
            // Bypass shipping calculation by omitting shipping fields
            'shipping_courier' => null,
        ];

        // We expect redirection to order complete (success)
        // But the stored order MUST use the correct price
        $response = $this->actingAs($user)
            ->post(route('checkout.store'), $payload);

        // Check for redirection (success)
        $response->assertStatus(302);

        // Verify Database
        $this->assertDatabaseHas('orders', [
            'email' => 'hacker@example.com',
            'subtotal' => 200000, // 2 * 100,000 (NOT 2 * 1)
            'gross_amount' => 200000,
        ]);
    }

    public function test_checkout_deducts_stock_correctly()
    {
        $user = User::factory()->create();

        $payload = [
            'customer_name' => 'Legit User',
            'email' => 'user@example.com',
            'customer_phone' => '08123456789',
            'shipping_address' => 'Home',
            'items' => [
                [
                    'id' => $this->product->id,
                    'quantity' => 5,
                ]
            ],
        ];

        $this->actingAs($user)->post(route('checkout.store'), $payload);

        // Assert Stock Reduced: 10 - 5 = 5
        $this->assertDatabaseHas('products', [
            'id' => $this->product->id,
            'stock' => 5,
        ]);
    }

    public function test_checkout_fails_if_stock_insufficient()
    {
        $user = User::factory()->create();

        // Update stock to 5
        $this->product->update(['stock' => 5]);

        // Try to buy 6 items (Stock is 5, Form Max is 10)
        // This passes validation but fails business logic
        $payload = [
            'customer_name' => 'Overseller',
            'email' => 'over@example.com',
            'customer_phone' => '08123456789',
            'shipping_address' => 'Warehouse',
            'items' => [
                [
                    'id' => $this->product->id,
                    'quantity' => 6,
                ]
            ],
        ];

        $response = $this->actingAs($user)->post(route('checkout.store'), $payload);

        // Should return 200 (Inertia Error Component) or 422 if using validator
        // Our controller catches Exception and returns Inertia Render
        $response->assertStatus(200);

        // Assert Stock UNCHANGED
        $this->assertDatabaseHas('products', [
            'id' => $this->product->id,
            'stock' => 5,
        ]);
    }

    public function test_guest_can_checkout()
    {
        $payload = [
            'customer_name' => 'Guest User',
            'email' => 'guest@example.com',
            'customer_phone' => '08123456789',
            'shipping_address' => 'Guest House',
            'items' => [
                [
                    'id' => $this->product->id,
                    'quantity' => 1,
                ]
            ],
        ];

        $response = $this->post(route('checkout.store'), $payload);

        $response->assertStatus(302);

        $this->assertDatabaseHas('orders', [
            'email' => 'guest@example.com',
            'user_id' => null,
            'subtotal' => 100000,
        ]);
    }
}
