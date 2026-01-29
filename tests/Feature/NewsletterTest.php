<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsletterTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_subscribe_newsletter()
    {
        $email = 'testuser@example.com';

        $response = $this->postJson('/api/newsletter/subscribe', [
            'email' => $email,
        ]);

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('newsletter_subscribers', [
            'email' => $email,
        ]);
    }

    public function test_cannot_subscribe_duplicate_email()
    {
        $email = 'duplicate@example.com';

        // Subscribe pertama
        $this->postJson('/api/newsletter/subscribe', ['email' => $email]);

        // Subscribe kedua
        $response = $this->postJson('/api/newsletter/subscribe', ['email' => $email]);

        // Harus gagal (422 Unprocessable Entity atau custom error)
        // Di controller kita return JSON success:false kalau catch error duplicat,
        // atau error validation 422. Mari assume validation laravel default.

        // Wait, controller kita pakai try catch QueryException.
        // Cek NewsletterController:
        // $request->validate(['email' => 'required|email|unique:newsletter_subscribers,email']);
        // Jadi return 422.

        // Jadi return 422 atau 409 (Conflict) tergantung implementasi

        $response->assertStatus(409);
    }
}
