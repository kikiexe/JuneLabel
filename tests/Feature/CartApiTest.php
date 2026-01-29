<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Cart;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CartApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_add_item_to_cart()
    {
        // 1. Buat data produk dummy
        $product = Product::factory()->create();

        // 2. Hit API Add to Cart
        // Note: Disini kita biarkan middleware jalan normal (cookie akan dienkripsi otomatis dan digenerate controller)
        $response = $this->postJson('/api/cart/add', [
            'product_id' => $product->id,
            'quantity' => 2,
        ]);

        // 3. Assert Response OK
        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        // 4. Assert Database
        // Karena ini guest, identifier bukan user_id tapi string (session uuid)
        $this->assertDatabaseHas('carts', [
            'product_id' => $product->id,
            'quantity' => 2,
            'user_id' => null,
        ]);
    }

    public function test_api_cart_returns_items()
    {
        // Disable EncryptCookies middleware agar kita bisa kirim cookie plain text
        $this->withoutMiddleware(\Illuminate\Cookie\Middleware\EncryptCookies::class);

        $product = Product::factory()->create();
        $guestId = (string) \Illuminate\Support\Str::uuid();

        // Insert manual ke DB (bypass Logic Add)
        Cart::create([
            'product_id' => $product->id,
            'identifier' => $guestId,
            'quantity' => 1,
            'user_id' => null,
        ]);

        // Gunakan call() manual untuk kirim cookie array secara explicit (parameter ke-4 is cookies)
        $response = $this->call(
            'GET',
            '/api/cart',
            [],
            ['guest_cart_id' => $guestId]
        );

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => $product->name]);
    }
}
