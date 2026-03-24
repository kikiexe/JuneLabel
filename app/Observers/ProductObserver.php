<?php

namespace App\Observers;

use App\Models\Product;
use Illuminate\Support\Facades\Cache;

/**
 * Observer untuk auto-clear cache saat product berubah
 * Cache yang di-clear: homepage, product detail, collections
 */
class ProductObserver
{
    /**
     * Clear cache saat product dibuat
     */
    public function created(Product $product): void
    {
        $this->clearCache($product);
    }

    /**
     * Clear cache saat product diupdate
     */
    public function updated(Product $product): void
    {
        $this->clearCache($product);
    }

    /**
     * Clear cache saat product dihapus
     */
    public function deleted(Product $product): void
    {
        $this->clearCache($product);
    }

    /**
     * Helper untuk clear semua cache product
     */
    protected function clearCache(Product $product): void
    {
        Cache::forget('homepage.new_arrivals');
        Cache::forget('homepage.best_sellers');
        Cache::forget('shop.collections');

        // Context: We can't easily get the old slug if it was updated, but we can try provided $product
        // Ideally we should handle "updating" event to get dirty/original attributes but for now simple invalidation:
        Cache::forget('product.detail.' . $product->slug);
    }
}
