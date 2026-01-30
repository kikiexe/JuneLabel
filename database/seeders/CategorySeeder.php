<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Pashmina Tencel',
            'Pashmina Viscose Rayon',
            'Paris Japan Ori',
            'Paris Jadul Premium',
            'Pashmina Inner Tencel',
        ];

        foreach ($categories as $categoryName) {
            DB::table('categories')->updateOrInsert(
                ['slug' => Str::slug($categoryName)], // Cek berdasarkan slug agar tidak duplikat
                [
                    'name' => $categoryName,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
