<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
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
    $user = auth()->user();

    if (!$user) {
        return redirect()->route('login');
    }

    $orders = \App\Models\Order::where('user_id', $user->id)
        ->with('orderItems')
        ->latest()
        ->get();

    $totalOrders = $orders->count();
    // Filter by enum values - pending and processing are considered "pending"
    $pendingOrders = $orders->filter(function ($order) {
        $status = $order->order_status instanceof \App\Enum\OrderStatus
            ? $order->order_status->value
            : $order->order_status;
        return in_array($status, ['pending', 'processing']);
    })->count();
    // Delivered orders are considered "completed"
    $completedOrders = $orders->filter(function ($order) {
        $status = $order->order_status instanceof \App\Enum\OrderStatus
            ? $order->order_status->value
            : $order->order_status;
        return $status === 'delivered';
    })->count();

    return Inertia::render('Dashboard', [
        'orders' => $orders,
        'stats' => [
            'total' => $totalOrders,
            'pending' => $pendingOrders,
            'completed' => $completedOrders,
        ]
    ]);
})->middleware('auth')->name('dashboard');

Route::get('/my-orders', function () {
    $user = auth()->user();

    if (!$user) {
        return redirect()->route('login');
    }

    $orders = \App\Models\Order::where('user_id', $user->id)
        ->with(['orderItems.product'])
        ->latest()
        ->get();

    return Inertia::render('MyOrders', [
        'orders' => $orders,
    ]);
})->middleware('auth')->name('my.orders');

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

Route::get('/contact-us', function () {
    return inertia('Information/ContactUs');
})->name('contact.us');

Route::get('/our-store', function () {
    return inertia('Information/OurStore');
})->name('our.store');

Route::get('/payment-information', function () {
    return inertia('Information/PaymentInformation');
})->name('payment.info');

Route::get('/how-to-order', function () {
    return inertia('Information/HowToOrder');
})->name('how.to.order');

Route::get('/how-to-pay', function () {
    return inertia('Information/HowToPay');
})->name('how.to.pay');

Route::get('/shipping-policy', function () {
    return inertia('Information/ShippingPolicy');
})->name('shipping.policy');

Route::get('/track-order', function () {
    return inertia('Information/TrackOrder');
})->name('track.order');

Route::get('/cart', function () {
    return Inertia::render('Shop/Cart');
})->name('cart');

Route::get('/shop', [App\Http\Controllers\ShopController::class, 'index'])->name('shop.index');

Route::get('/checkout', [App\Http\Controllers\CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [App\Http\Controllers\CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/order/{order}', [App\Http\Controllers\CheckoutController::class, 'complete'])->name('order.complete');
Route::post('/order/{orderId}/cancel', [App\Http\Controllers\CheckoutController::class, 'cancel'])->middleware('auth')->name('order.cancel');

// Shipping / RajaOngkir API Routes
Route::prefix('api/shipping')->group(function () {
    Route::get('/provinces', [App\Http\Controllers\ShippingController::class, 'getProvinces'])->name('shipping.provinces');
    Route::get('/cities/{provinceId}', [App\Http\Controllers\ShippingController::class, 'getCities'])->name('shipping.cities');
    Route::get('/districts/{cityId}', [App\Http\Controllers\ShippingController::class, 'getDistricts'])->name('shipping.districts');
    Route::post('/calculate-cost', [App\Http\Controllers\ShippingController::class, 'calculateCost'])->name('shipping.calculate');
    Route::post('/search-destination', [App\Http\Controllers\ShippingController::class, 'searchDestination'])->name('shipping.search');
});

// Midtrans Payment Webhook & API Routes
Route::post('/midtrans/notification', [App\Http\Controllers\MidtransWebhookController::class, 'handle'])
    ->name('midtrans.notification');

Route::get('/midtrans/check-status/{orderId}', [App\Http\Controllers\MidtransWebhookController::class, 'checkStatus'])
    ->name('midtrans.check-status');


require __DIR__ . '/auth.php';
