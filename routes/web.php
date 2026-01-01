<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;

Route::get('/', function () {
    $products = Product::query()
        ->where('is_active', true)
        ->latest()
        ->take(4)
        ->get();

    return Inertia::render('Welcome', [
        'products' => $products,
        'canLogin' => Route::has('login'),
        'laravelVersion' => Illuminate\Foundation\Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/product/{slug}', function ($slug) {
    $product = Product::where('slug', $slug)
        ->where('is_active', true)
        ->firstOrFail();

    return Inertia::render('Products/Products', [
        'product' => $product
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

Route::get('/privacy-policy', function () {
    return inertia('Information/PrivacyPolicy');
})->name('privacy.policy');

Route::get('/terms-conditions', function () {
    return inertia('Information/TermsConditions');
})->name('terms.conditions');

Route::get('/about-us', function () {
    return inertia('Information/AboutUs');
})->name('about.us');

require __DIR__.'/auth.php';
