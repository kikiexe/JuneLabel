<?php

namespace App\Observers;

use App\Models\Product;
use Illuminate\Support\Facades\Cache;

/**
 * Observer untuk auto-clear cache saat product berubah
 * Cache yang di-clear: homepage new arrivals & best sellers
 */
class ProductObserver
{
    /**
     * Clear cache saat product dibuat
     */
    public function created(Product $product): void
    {
        $this->clearCache();
    }

    /**
     * Clear cache saat product diupdate
     */
    public function updated(Product $product): void
    {
        $this->clearCache();
    }

    /**
     * Clear cache saat product dihapus
     */
    public function deleted(Product $product): void
    {
        $this->clearCache();
    }

    /**
     * Helper untuk clear semua cache product
     */
    protected function clearCache(): void
    {
        Cache::forget('homepage.new_arrivals');
        Cache::forget('homepage.best_sellers');
    }
}
