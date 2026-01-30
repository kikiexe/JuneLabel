<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Category;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        
        // Ambil semua category ID yang valid
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->command->info('No categories found. Please run CategorySeeder first.');
            return;
        }

        // Variasi nama warna untuk membuat nama produk terlihat real
        $colors = ['Black', 'White', 'Nude', 'Mocha', 'Olive', 'Sage', 'Navy', 'Maroon', 'Dusty Pink', 'Grey', 'Charcoal', 'Espresso', 'Taupe', 'Lilac', 'Cream'];

        foreach ($categories as $category) {
            // Buat 5-8 produk per kategori
            $amount = rand(5, 8);

            for ($i = 0; $i < $amount; $i++) {
                $color = $colors[array_rand($colors)];
                $name = $category->name . ' - ' . $color;
                
                // Cek agar nama unik
                if (DB::table('products')->where('name', $name)->exists()) {
                    continue;
                }

                DB::table('products')->insert([
                    'category_id' => $category->id,
                    'sku' => strtoupper(Str::slug($category->name)) . '-' . strtoupper(substr($color, 0, 3)) . '-' . rand(100, 999),
                    'name' => $name,
                    'slug' => Str::slug($name),
                    'image' => 'products/placeholder.webp', // Pastikan file ini ada di storage/app/public/products
                    'description' => $faker->paragraph(3),
                    'price' => rand(45000, 125000), // Random price 45k - 125k
                    'stock' => rand(0, 50), // Ada yang 0 untuk tes Out of Stock
                    'weight' => 150,
                    'is_active' => true,
                    'is_best_seller' => (rand(1, 10) > 8), // 20% chance jadi best seller
                    'created_at' => now()->subDays(rand(0, 30)), // Random tanggal biar sorting date kelihatan
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
