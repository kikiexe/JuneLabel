<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    // Tambahkan parameter optional untuk custom title & desc
    public function index(Request $request, $customTitle = null, $customDescription = null)
    {
        $query = Product::query()->where('is_active', true);

        // 1. Search Logic
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // 2. Filter Kategori (by Slug)
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // 3. Filter Availability (In Stock / Out of Stock)
        if ($request->has('availability')) {
            $availabilities = explode(',', $request->availability);
            $query->where(function ($q) use ($availabilities) {
                if (in_array('in_stock', $availabilities)) {
                    $q->orWhere('stock', '>', 0);
                }
                if (in_array('out_of_stock', $availabilities)) {
                    $q->orWhere('stock', '=', 0);
                }
            });
        }

        // 4. Filter Price Range
        if ($request->has('price_min')) {
            $query->where('price', '>=', $request->price_min);
        }
        if ($request->has('price_max')) {
            $query->where('price', '<=', $request->price_max);
        }

        // 5. Sorting Logic
        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'oldest':
                    $query->oldest();
                    break;
                case 'best_seller':
                    $query->where('is_best_seller', true);
                    break;
                case 'name_asc':
                    $query->orderBy('name', 'asc');
                    break;
                case 'name_desc':
                    $query->orderBy('name', 'desc');
                    break;
                default:
                    $query->latest();
                    break;
            }
        } else {
            $query->latest();
        }

        // 6. Pagination
        $products = $query->with('category')->paginate(12)->withQueryString();

        $facetQuery = Product::query()->where('is_active', true);
        if ($request->has('search')) {
            $facetQuery->where('name', 'like', '%' . $request->search . '%');
        }
        if ($request->has('category')) {
            $facetQuery->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        $inStockCount = (clone $facetQuery)->where('stock', '>', 0)->count();
        $outOfStockCount = (clone $facetQuery)->where('stock', '=', 0)->count();

        // Ambil max price untuk range slider (opsional, tapi bagus untuk UX)
        $maxPrice = (clone $facetQuery)->max('price') ?? 1000000;

        return Inertia::render('Shop/Index', [
            'products' => $products,
            'filters' => $request->only(['search', 'category', 'sort', 'availability', 'price_min', 'price_max']),
            'customTitle' => $customTitle,
            'customDescription' => $customDescription,
            'availabilityCounts' => [
                'in_stock' => $inStockCount,
                'out_of_stock' => $outOfStockCount,
            ],
            'maxPrice' => $maxPrice
        ]);
    }

    public function newArrivals(Request $request)
    {
        $request->merge(['sort' => 'latest']);
        return $this->index($request, 'New Arrivals', 'Explore our latest addition to the collection.');
    }

    public function bestSellers(Request $request)
    {
        $request->merge(['sort' => 'best_seller']);
        return $this->index($request, 'Best Sellers', 'Our most loved products by customers.');
    }

    public function collections()
    {
        $categories = \Illuminate\Support\Facades\Cache::remember('shop.collections', 86400, function () {
            return Category::has('products')
                ->with('latestProduct')
                ->withCount('products')
                ->get()
                ->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'name' => $category->name,
                        'slug' => $category->slug,
                        'image' => $category->latestProduct?->image,
                        'product_count' => $category->products_count, // Updated to use the count attribute
                    ];
                });
        });

        return Inertia::render('Shop/Collections', [
            'categories' => $categories
        ]);
    }

    public function collectionDetail(Request $request, $slug)
    {
        // Cari Kategori berdasarkan slug
        $category = Category::where('slug', $slug)->firstOrFail();

        // Set filter kategori di request
        $request->merge(['category' => $slug]);

        // Panggil index dengan Custom Title = Nama Kategori
        return $this->index($request, $category->name, "Explore our {$category->name} collection.");
    }
}
