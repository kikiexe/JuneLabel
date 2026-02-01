<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    /**
     * Get semua categories yang punya products
     * Cache selama 24 jam (86400 detik)
     */
    public function index()
    {
        $categories = Cache::remember('categories.all', 86400, function () {
            return Category::select('id', 'name', 'slug')
                ->orderBy('name')
                ->get();
        });

        return response()->json($categories);
    }
}
