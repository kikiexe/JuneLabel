<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\AuthorizationException;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    /**
     * Get cart items
     */
    public function index(Request $request)
    {
        $items = $this->cartService->getCartItems($request);
        return response()->json($items);
    }

    /**
     * Add item to cart
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        try {
            $cookie = $this->cartService->addToCart(
                $request,
                $request->product_id,
                $request->quantity
            );

            $response = response()->json([
                'success' => true,
                'message' => 'Produk berhasil ditambahkan ke keranjang',
            ]);

            if ($cookie) {
                return $response->withCookie($cookie);
            }

            return $response;
        } catch (\Exception $e) {
            // Check if it's a validation/logic error (like stock)
            $statusCode = 400;
            if (str_contains($e->getMessage(), 'Stok') || str_contains($e->getMessage(), 'Maksimal')) {
                $statusCode = 422;
            }

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $statusCode);
        }
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        try {
            $this->cartService->updateItem($request, $id, $request->quantity);
            return response()->json(['success' => true]);
        } catch (AuthorizationException $e) {
            abort(403);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Remove item from cart
     */
    public function destroy(Request $request, $id)
    {
        try {
            $this->cartService->removeItem($request, $id);
            return response()->json(['success' => true]);
        } catch (AuthorizationException $e) {
            abort(403);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get item count
     */
    public function count(Request $request)
    {
        $count = $this->cartService->count($request);
        return response()->json(['count' => $count]);
    }
}
