<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Enum\PaymentStatus;
use App\Enum\OrderStatus;

class CheckoutController extends Controller
{
    public function index()
    {
        return Inertia::render('Shop/Checkout');
    }

    public function store(Request $request)
    {
        // 1. Validasi Input dari User
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            // Gunakan Transaction agar data konsisten (Rollback jika error)
            return DB::transaction(function () use ($validated, $request) {
                
                // 2. Keamanan: Ambil Harga dari Database (Server Side)
                // Kita TIDAK BOLEH percaya harga yang dikirim dari React/Frontend
                $itemIds = collect($validated['items'])->pluck('id');
                $products = Product::whereIn('id', $itemIds)->get()->keyBy('id');

                $subtotal = 0;
                $orderItemsData = [];

                foreach ($validated['items'] as $item) {
                    $product = $products[$item['id']];
                    
                    // Ambil harga asli dari database
                    $price = $product->price;
                    $lineTotal = $price * $item['quantity'];
                    
                    $subtotal += $lineTotal;

                    // Siapkan data item untuk disimpan snapshot harganya
                    $orderItemsData[] = [
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'unit_price' => $price, // Harga saat transaksi terjadi
                        'quantity' => $item['quantity'],
                        'subtotal' => $lineTotal,
                    ];
                }

                $shippingCost = 0; // Logika ongkir bisa ditambahkan di sini
                $totalPrice = $subtotal + $shippingCost;

                // 3. Buat Data Order Utama
                $orderCode = 'ORD-' . strtoupper(Str::random(4)) . '-' . now()->timestamp;

                $order = Order::create([
                    'user_id' => auth()->id(), // null jika user belum login (Guest)
                    'order_code' => $orderCode,
                    'subtotal' => $subtotal,
                    'shipping_cost' => $shippingCost,
                    'total_price' => $totalPrice,
                    'payment_status' => PaymentStatus::Pending,
                    'customer_name' => $validated['customer_name'],
                    'customer_phone' => $validated['customer_phone'],
                    'shipping_address' => $validated['shipping_address'],
                    'notes' => $validated['notes'] ?? null,
                ]);

                // 4. Masukkan Item-item ke dalam Order tersebut
                foreach ($orderItemsData as $data) {
                    $order->orderItems()->create($data);
                }

                // Redirect ke halaman sukses
                return redirect()->route('order.complete', ['order' => $order->order_code])
                    ->with('success', 'Order created successfully. Please proceed to payment.');
            });

        } catch (\Exception $e) {
            // Log error untuk debugging
            \Log::error('Checkout Error: ' . $e->getMessage(), [
                'user_id' => auth()->id(),
                'items' => $validated['items'] ?? [],
                'exception' => $e
            ]);
            
            // Return custom error page dengan Inertia
            return inertia('Shop/OrderError', [
                'error' => 'Unable to process your order. Please check your information and try again.'
            ]);
        }
    }

    public function complete($orderCode)
    {
        // 5. Tampilkan Halaman Sukses
        // Pastikan load relasi orderItems untuk ditampilkan
        $order = Order::with('orderItems')->where('order_code', $orderCode)->firstOrFail();
        
        // Cek Keamanan: Pastikan user yang login hanya bisa lihat order miliknya sendiri
        if (auth()->check() && $order->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Shop/OrderComplete', [
            'order' => $order
        ]);
    }
}
