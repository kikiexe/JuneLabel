<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class CartApiTest extends TestCase
{
    use RefreshDatabase;

    private $product;

    protected function setUp(): void
    {
        parent::setUp();

        // Create dummy product with stock 5
        $this->product = Product::factory()->create([
            'name' => 'Test Product',
            'slug' => 'test-product',
            'price' => 100000,
            'stock' => 5,
            'is_active' => true,
        ]);
    }

    public function test_guest_can_add_item_to_cart()
    {
        $response = $this->postJson(route('cart.store'), [
            'product_id' => $this->product->id,
            'quantity' => 2,
        ]);

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        // Cek cookie tetap ada (Controller set cookie)
        $response->assertCookie('guest_cart_id');

        // Cek database
        $this->assertDatabaseHas('carts', [
            'product_id' => $this->product->id,
            'quantity' => 2,
            'user_id' => null,
        ]);
    }

    public function test_cannot_add_more_than_stock()
    {
        // Stock cuma 5, coba beli 6
        $response = $this->postJson(route('cart.store'), [
            'product_id' => $this->product->id,
            'quantity' => 6,
        ]);

        $response->assertStatus(400)
            ->assertJson(['success' => false]);

        // Validasi database kosong
        $this->assertDatabaseMissing('carts', [
            'product_id' => $this->product->id,
        ]);
    }

    public function test_cannot_exceed_max_quantity_limit()
    {
        $this->product->update(['stock' => 50]);

        $response = $this->postJson(route('cart.store'), [
            'product_id' => $this->product->id,
            'quantity' => 11,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['quantity']);
    }

    public function test_cumulative_quantity_check()
    {
        // Generate Guest ID manuallly for consistent testing
        $guestId = (string) Str::uuid();

        // Request 1: Add 3 items
        $this->withHeader('X-Guest-ID', $guestId)
            ->postJson(route('cart.store'), [
                'product_id' => $this->product->id,
                'quantity' => 3,
            ]);

        // Request 2: Add 3 items again (Total 6 > 5)
        // Pass Header yang SAMA
        $response = $this->withHeader('X-Guest-ID', $guestId)
            ->postJson(route('cart.store'), [
                'product_id' => $this->product->id,
                'quantity' => 3,
            ]);

        $response->assertStatus(400)
            ->assertJson(['success' => false]);

        // Database harus tetap 3
        $this->assertDatabaseHas('carts', [
            'product_id' => $this->product->id,
            'quantity' => 3,
            'identifier' => $guestId,
        ]);
    }

    public function test_guest_cart_merges_on_login()
    {
        // 1. Guest add to cart logic (Use Cookie as Controller fallback logic will generate cookie)
        // But for testing purposes, we manually create entry
        $guestId = (string) Str::uuid();
        Cart::create([
            'identifier' => $guestId,
            'product_id' => $this->product->id,
            'quantity' => 2,
        ]);

        // 2. User login
        // Disini masalahnya: Listener mengambil cookie 'guest_cart_id'
        // Karena encrypted cookies, kita tidak bisa easily mock cookie raw.
        // TAPI CartController::getCartIdentifier() kita sudah support header.
        // Namun Listener MergeGuestCart HANYA cek cookie.

        // Mari kita fix Listener dulu agar baca dari helper/header juga?
        // Ah, listener MergeGuestCart pakai `request()->cookie('guest_cart_id')`.
        // Sebaiknya kita juga support header di Listener untuk testability.

        // Tapi sementara, kita coba mock dengan cookie yang dibuat.
        // Atau lebih baik pakai Header X-Guest-ID di Listener juga?
        // Ya, demi konsistensi.

        $user = User::factory()->create();

        $response = $this->withHeader('X-Guest-ID', $guestId) // Send via Header for Listener (need update)
            ->withCookie('guest_cart_id', $guestId) // Try cookie too (might fail decrypt)
            ->post('/login', [
                'email' => $user->email,
                'password' => 'password',
            ]);

        // 3. Cek apakah cart dipindah ke user
        // Note: Unless we update Listener to check header, this might fail with encryption on.
        // Let's assume passed for now and update Listener next.
        $this->assertDatabaseHas('carts', [
            'user_id' => $user->id,
            'product_id' => $this->product->id,
            'quantity' => 2,
            'identifier' => null,
        ]);
    }
}
