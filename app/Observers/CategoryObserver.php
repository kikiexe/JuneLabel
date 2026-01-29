<?php

namespace App\Observers;

use App\Models\Category;
use Illuminate\Support\Facades\Cache;

/**
 * Observer untuk auto-clear cache saat category berubah
 */
class CategoryObserver
{
    /**
     * Clear cache saat category dibuat
     */
    public function created(Category $category): void
    {
        Cache::forget('categories.all');
    }

    /**
     * Clear cache saat category diupdate
     */
    public function updated(Category $category): void
    {
        Cache::forget('categories.all');
    }

    /**
     * Clear cache saat category dihapus
     */
    public function deleted(Category $category): void
    {
        Cache::forget('categories.all');
    }
}
