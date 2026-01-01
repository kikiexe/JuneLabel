<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;

Route::get('/', function () {
    $newArrivals = Product::query()
        ->where('is_active', true)
        ->latest()
        ->take(4)
        ->get();

    $bestSellers = Product::query()
        ->where('is_active', true)
        ->where('is_best_seller', true)
        ->latest()
        ->take(4)
        ->get();

    return Inertia::render('Welcome', [
        'newArrivals' => $newArrivals,
        'bestSellers' => $bestSellers,
        'canLogin' => Route::has('login'),
        'laravelVersion' => Illuminate\Foundation\Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/product/{slug}', function ($slug) {
    $product = Product::where('slug', $slug)
        ->where('is_active', true)
        ->firstOrFail();

    $relatedProducts = Product::where('id', '!=', $product->id)
        ->where('is_active', true)
        ->inRandomOrder()
        ->take(4)
        ->get();

    return Inertia::render('Products/Products', [
        'product' => $product,
        'relatedProducts' => $relatedProducts
    ]);
})->name('product.detail');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
