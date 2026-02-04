<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Struktur kategori: Parent => [Subkategori]
        $categories = [
            'Pashmina Series' => [
                'Pashmina Tencel',
                'Pashmina Oval Tencel',
            ],
            'Paris Series' => [
                'Paris Japan',
                'Paris June Scarves',
            ],
            'Other' => [
                'Hijab Printing',
            ],
        ];

        foreach ($categories as $parentName => $children) {
            // Buat atau update parent category
            $parent = Category::updateOrCreate(
                ['slug' => Str::slug($parentName)],
                [
                    'name' => $parentName,
                    'parent_id' => null,
                ]
            );

            // Buat subkategori
            foreach ($children as $childName) {
                Category::updateOrCreate(
                    ['slug' => Str::slug($childName)],
                    [
                        'name' => $childName,
                        'parent_id' => $parent->id,
                    ]
                );
            }
        }
    }
}
