<?php

namespace App\Observers;

use App\Models\Order;
use Illuminate\Support\Facades\Cache;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        $this->clearCache($order);
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        $this->clearCache($order);
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        $this->clearCache($order);
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        $this->clearCache($order);
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        $this->clearCache($order);
    }

    protected function clearCache(Order $order): void
    {
        Cache::forget('user.orders.' . $order->user_id);
    }
}
