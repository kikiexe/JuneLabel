<?php

namespace App\Listeners;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Log;

class MergeGuestCart
{
    /**
     * Handle the event.
     */
    public function handle(Login $event): void
    {
        $user = $event->user;
        // Check header first (API/Test friendly), then cookie
        $guestId = request()->header('X-Guest-ID') ?? request()->cookie('guest_cart_id');

        if (!$guestId) {
            return; // No guest cart to merge
        }

        try {
            $guestCarts = Cart::where('identifier', $guestId)->get();

            if ($guestCarts->isEmpty()) {
                return; // No items in guest cart
            }

            foreach ($guestCarts as $guestCart) {
                // Check if user already has this product in cart
                $userCart = Cart::where('user_id', $user->id)
                    ->where('product_id', $guestCart->product_id)
                    ->first();

                if ($userCart) {
                    // Merge: Add quantities together
                    $newQuantity = $userCart->quantity + $guestCart->quantity;

                    // Respect max quantity limit (10)
                    $finalQuantity = min($newQuantity, 10);

                    // Also check stock availability
                    $product = Product::find($guestCart->product_id);
                    if ($product) {
                        $finalQuantity = min($finalQuantity, $product->stock);
                    }

                    $userCart->update(['quantity' => $finalQuantity]);

                    // Delete guest cart item
                    $guestCart->delete();

                    Log::info('Cart item merged', [
                        'user_id' => $user->id,
                        'product_id' => $guestCart->product_id,
                        'guest_qty' => $guestCart->quantity,
                        'user_qty' => $userCart->quantity,
                        'final_qty' => $finalQuantity,
                    ]);
                } else {
                    // Move: Transfer ownership to user
                    // But first check stock availability
                    $product = Product::find($guestCart->product_id);
                    $finalQuantity = $guestCart->quantity;

                    if ($product) {
                        // Ensure quantity doesn't exceed stock
                        $finalQuantity = min($guestCart->quantity, $product->stock);
                    }

                    // Ensure quantity doesn't exceed max limit
                    $finalQuantity = min($finalQuantity, 10);

                    $guestCart->update([
                        'user_id' => $user->id,
                        'identifier' => null,
                        'quantity' => $finalQuantity,
                    ]);

                    Log::info('Cart item transferred', [
                        'user_id' => $user->id,
                        'product_id' => $guestCart->product_id,
                        'quantity' => $finalQuantity,
                    ]);
                }
            }

            Log::info('Guest cart merged successfully', [
                'user_id' => $user->id,
                'guest_id' => $guestId,
                'items_processed' => $guestCarts->count(),
            ]);
        } catch (\Exception $e) {
            Log::error('Cart merge failed: ' . $e->getMessage(), [
                'user_id' => $user->id,
                'guest_id' => $guestId,
                'exception' => $e->getTraceAsString(),
            ]);

            // Don't throw exception - allow login to proceed even if merge fails
            // User can manually add items again if needed
        }
    }
}
