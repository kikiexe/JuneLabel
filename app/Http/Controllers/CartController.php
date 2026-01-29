<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;

class CartController extends Controller
{
    /**
     * Get unique identifier for guest user
     */
    private function getCartIdentifier(Request $request)
    {
        if (Auth::check()) {
            return null;
        }

        return $request->cookie('guest_cart_id');
    }

    /**
     * Get cart items
     */
    public function index(Request $request)
    {
        $query = Cart::with('product');

        if (Auth::check()) {
            $query->where('user_id', Auth::id());
        } else {
            $guestId = $this->getCartIdentifier($request);
            if (!$guestId) {
                return response()->json([]);
            }
            $query->where('identifier', $guestId);
        }

        $items = $query->get()->map(function ($item) {
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

        return response()->json($items);
    }

    /**
     * Add item to cart
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $productId = $request->product_id;
        $quantity = $request->quantity;

        // Tentukan Identifier & Cookie
        $guestId = null;
        $cookie = null;

        if (!Auth::check()) {
            $guestId = $request->cookie('guest_cart_id');
            if (!$guestId) {
                $guestId = (string) Str::uuid();
                // 30 hari
                $cookie = Cookie::make('guest_cart_id', $guestId, 60 * 24 * 30);
            }
        }

        // Cek existing item
        $query = Cart::where('product_id', $productId);

        if (Auth::check()) {
            $query->where('user_id', Auth::id());
        } else {
            $query->where('identifier', $guestId);
        }

        $existingItem = $query->first();

        if ($existingItem) {
            $existingItem->increment('quantity', $quantity);
        } else {
            Cart::create([
                'user_id' => Auth::check() ? Auth::id() : null,
                'identifier' => Auth::check() ? null : $guestId,
                'product_id' => $productId,
                'quantity' => $quantity,
            ]);
        }

        $response = response()->json([
            'success' => true,
            'message' => 'Produk berhasil ditambahkan ke keranjang',
        ]);

        if ($cookie) {
            return $response->withCookie($cookie);
        }

        return $response;
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $item = Cart::findOrFail($id);

        // Security check
        if (Auth::check()) {
            if ($item->user_id !== Auth::id()) abort(403);
        } else {
            $guestId = $request->cookie('guest_cart_id');
            if ($item->identifier !== $guestId) abort(403);
        }

        $item->update(['quantity' => $request->quantity]);

        return response()->json(['success' => true]);
    }

    /**
     * Remove item from cart
     */
    public function destroy(Request $request, $id)
    {
        $item = Cart::findOrFail($id);

        // Security check
        if (Auth::check()) {
            if ($item->user_id !== Auth::id()) abort(403);
        } else {
            $guestId = $request->cookie('guest_cart_id');
            if ($item->identifier !== $guestId) abort(403);
        }

        $item->delete();

        return response()->json(['success' => true]);
    }

    /**
     * Get item count
     */
    public function count(Request $request)
    {
        $query = Cart::query();

        if (Auth::check()) {
            $query->where('user_id', Auth::id());
        } else {
            $guestId = $request->cookie('guest_cart_id');
            if (!$guestId) return response()->json(['count' => 0]);
            $query->where('identifier', $guestId);
        }

        return response()->json(['count' => $query->count()]);
    }
}
