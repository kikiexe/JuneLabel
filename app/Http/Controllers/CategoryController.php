<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    /**
     * Get semua parent categories dengan children (subkategori)
     * Cache selama 24 jam (86400 detik)
     */
    public function index()
    {
        $categories = Cache::remember('categories.with_children', 86400, function () {
            return Category::select('id', 'name', 'slug', 'parent_id')
                ->whereNull('parent_id') // Hanya parent categories
                ->with(['children:id,name,slug,parent_id']) // Eager load children
                ->orderBy('name')
                ->get();
        });

        return response()->json($categories);
    }

    /**
     * Get semua categories (flat, tanpa hierarki)
     * Untuk keperluan filter, dll
     */
    public function all()
    {
        $categories = Cache::remember('categories.all', 86400, function () {
            return Category::select('id', 'name', 'slug', 'parent_id')
                ->orderBy('name')
                ->get();
        });

        return response()->json($categories);
    }
}
