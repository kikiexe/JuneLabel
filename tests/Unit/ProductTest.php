<?php

namespace Tests\Unit;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_belongs_to_category()
    {
        $category = Category::factory()->create();
        $product = Product::factory()->create(['category_id' => $category->id]);

        $this->assertInstanceOf(Category::class, $product->category);
        $this->assertEquals($category->id, $product->category->id);
    }

    public function test_it_has_soft_deletes()
    {
        $product = Product::factory()->create();

        $product->delete();

        $this->assertSoftDeleted($product);
        $this->assertDatabaseHas('products', ['id' => $product->id]);
    }

    public function test_it_casts_price_to_integer_or_float()
    {
        $product = Product::factory()->create(['price' => 150000.00]);

        // Tergantung casting di model, pastikan numerik
        $this->assertIsNumeric($product->price);
        $this->assertEquals(150000, $product->price);
    }
}
