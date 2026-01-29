<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => \App\Models\Category::factory(),
            'name' => $this->faker->words(3, true),
            'slug' => $this->faker->unique()->slug(),
            'sku' => $this->faker->unique()->ean13(),
            'price' => $this->faker->numberBetween(50000, 500000),
            'stock' => 100,
            'description' => $this->faker->paragraph(),
            'image' => null,
            'is_best_seller' => $this->faker->boolean(20),
            'weight' => 200,
        ];
    }
}
