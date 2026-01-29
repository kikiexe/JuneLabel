<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomepageTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_can_be_rendered(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_shop_page_can_be_rendered(): void
    {
        // Setup data dummy
        Category::factory()->count(3)->create();

        $response = $this->get('/shop');

        $response->assertStatus(200);
    }

    public function test_contact_page_can_be_rendered(): void
    {
        $response = $this->get('/contact-us');
        $response->assertStatus(200);
    }
}
