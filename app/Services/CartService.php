<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;

class CartService
{
    /**
     * Get unique identifier for guest user
     */
    public function getGuestId(Request $request): ?string
    {
        if (Auth::check()) {
            return null;
        }

        // Support Header first (API friendly), then Cookie
        return $request->header('X-Guest-ID') ?? $request->cookie('guest_cart_id');
    }

    /**
     * Get base query filtered by current user/guest
     */
    protected function getBaseQuery(Request $request)
    {
        $query = Cart::query();

        if (Auth::check()) {
            $query->where('user_id', Auth::id());
        } else {
            $guestId = $this->getGuestId($request);
            if (!$guestId) {
                // Return query causing empty result if no identity
                return $query->where('id', -1);
            }
            $query->where('identifier', $guestId);
        }

        return $query;
    }

    public function getCartItems(Request $request)
    {
        $query = $this->getBaseQuery($request)->with('product');

        // Handle edge case where getBaseQuery returns "id = -1"
        // But cleaner to just check in controller or here.
        // Logic above handles it via where id=-1 if no guest ID.

        return $query->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'name' => $item->product->name,
                'price' => $item->product->price,
                'image' => $item->product->image,
                'slug' => $item->product->slug,
                'quantity' => $item->quantity,
                'stock' => $item->product->stock ?? 100,
            ];
        });
    }

    public function addToCart(Request $request, int $productId, int $quantity)
    {
        $product = Product::findOrFail($productId);
        $cookie = null;
        $guestId = null;

        if (!Auth::check()) {
            $guestId = $this->getGuestId($request);

            if (!$guestId) {
                $guestId = (string) Str::uuid();
                // 30 hari
                $cookie = Cookie::make('guest_cart_id', $guestId, 60 * 24 * 30);
            }
        }

        // Check existing item
        $query = Cart::where('product_id', $productId);

        if (Auth::check()) {
            $query->where('user_id', Auth::id());
        } else {
            $query->where('identifier', $guestId);
        }

        $existingItem = $query->first();

        // Validate Quantity
        $existingQuantity = $existingItem ? $existingItem->quantity : 0;
        $totalQuantity = $existingQuantity + $quantity;

        if ($product->stock < $totalQuantity) {
            throw new \Exception("Stok tidak mencukupi untuk {$product->name}. Tersedia: {$product->stock}" .
                ($existingQuantity > 0 ? ", Anda sudah punya {$existingQuantity} di keranjang." : "."));
        }

        if ($totalQuantity > 10) {
            throw new \Exception("Maksimal 10 item per produk. Anda sudah punya {$existingQuantity} di keranjang.");
        }

        if ($existingItem) {
            $existingItem->update(['quantity' => $totalQuantity]);
        } else {
            Cart::create([
                'user_id' => Auth::check() ? Auth::id() : null,
                'identifier' => Auth::check() ? null : $guestId,
                'product_id' => $productId,
                'quantity' => $quantity,
            ]);
        }

        return $cookie;
    }

    public function updateItem(Request $request, int $itemId, int $quantity)
    {
        $item = Cart::findOrFail($itemId);

        // Security Scope Check
        $this->verifyOwnership($request, $item);

        // Stock Validation
        $product = Product::findOrFail($item->product_id);
        if ($product->stock < $quantity) {
            throw new \Exception("Stok tidak mencukupi untuk {$product->name}. Tersedia: {$product->stock}");
        }

        $item->update(['quantity' => $quantity]);
    }

    public function removeItem(Request $request, int $itemId)
    {
        $item = Cart::findOrFail($itemId);

        // Security Scope Check
        $this->verifyOwnership($request, $item);

        $item->delete();
    }

    public function count(Request $request): int
    {
        return $this->getBaseQuery($request)->count();
    }

    protected function verifyOwnership(Request $request, Cart $item)
    {
        if (Auth::check()) {
            if ($item->user_id !== Auth::id()) {
                throw new \Illuminate\Auth\Access\AuthorizationException('Unauthorized action.');
            }
        } else {
            $guestId = $this->getGuestId($request);
            if ($item->identifier !== $guestId) {
                throw new \Illuminate\Auth\Access\AuthorizationException('Unauthorized action.');
            }
        }
    }
}
