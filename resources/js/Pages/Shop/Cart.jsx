import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { useCart } from '@/Contexts/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FFF6EC] font-inter">
            <Head title="Shopping Cart - June Label" />
            <Navbar />

            <main className="flex-grow pt-24 pb-16 px-4 md:px-8 lg:px-16 container mx-auto">
                <div className="flex items-center gap-2 mb-8 text-[#7C634D]">
                    <Link href="/" className="hover:opacity-70 transition-opacity">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide uppercase">Shopping Cart</h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-[#7C634D]/10 p-6 rounded-full mb-6">
                            <ShoppingBag size={48} color="#7C634D" />
                        </div>
                        <h2 className="text-xl font-medium text-[#7C634D] mb-4">Your cart is empty</h2>
                        <p className="text-[#7C634D]/70 mb-8 max-w-md">
                            Looks like you haven't added anything to your cart yet.
                            Explore our collections to find something you'll love.
                        </p>
                        <Link 
                            href="/" 
                            className="bg-[#7C634D] text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-[#65503D] transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                        {/* Cart Items List */}
                        <div className="w-full lg:w-2/3 space-y-6">
                            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#7C634D]/20 text-sm font-bold text-[#7C634D] uppercase tracking-wider">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-2 text-center">Price</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>

                            {cartItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 py-4 border-b border-[#7C634D]/10 items-center">
                                    {/* Product Info */}
                                    <div className="col-span-1 md:col-span-6 flex gap-4">
                                        <div className="w-20 h-24 bg-[#f9f9f9] flex-shrink-0">
                                            <img 
                                                src={`/storage/${item.image}`} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <Link href={`/product/${item.slug}`} className="font-serif text-[#7C634D] text-lg hover:underline decoration-[#7C634D]/30 underline-offset-4">
                                                {item.name}
                                            </Link>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 mt-2 w-fit transition-colors"
                                            >
                                                <Trash2 size={12} /> Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-1 md:col-span-2 md:text-center text-[#7C634D] font-medium">
                                        <span className="md:hidden text-xs text-gray-500 mr-2">Price:</span>
                                        {formatPrice(item.price)}
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-span-1 md:col-span-2 flex items-center md:justify-center gap-3">
                                        <span className="md:hidden text-xs text-gray-500 mr-2">Qty:</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:bg-[#7C634D]/10 rounded transition-colors disabled:opacity-30"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14} color="#7C634D" />
                                        </button>
                                        <span className="w-8 text-center font-medium text-[#7C634D]">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:bg-[#7C634D]/10 rounded transition-colors"
                                        >
                                            <Plus size={14} color="#7C634D" />
                                        </button>
                                    </div>

                                    {/* Total */}
                                    <div className="col-span-1 md:col-span-2 md:text-right font-bold text-[#7C634D]">
                                        <span className="md:hidden text-xs text-gray-500 mr-2">Subtotal:</span>
                                        {formatPrice(item.price * item.quantity)}
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-end pt-4">
                                <button 
                                    onClick={clearCart} 
                                    className="text-xs text-red-500 hover:text-red-700 underline underline-offset-2 transition-colors"
                                >
                                    Clear Shopping Cart
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-1/3 h-fit bg-white p-6 md:p-8 border border-[#7C634D]/10 sticky top-24">
                            <h3 className="font-serif text-xl text-[#7C634D] mb-6 border-b border-[#7C634D]/10 pb-4">Order Summary</h3>
                            
                            <div className="space-y-4 mb-8 text-sm text-[#7C634D]">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-bold">{formatPrice(getCartTotal())}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Shipping</span>
                                    <span className="italic text-xs">Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-4 border-t border-[#7C634D]/10">
                                    <span>Total</span>
                                    <span>{formatPrice(getCartTotal())}</span>
                                </div>
                            </div>

                            <Link href={route('checkout.index')} className="block text-center w-full bg-[#7C634D] text-white py-4 font-bold text-sm tracking-widest uppercase hover:bg-[#65503D] transition-colors relative overflow-hidden group">
                                <span className="relative z-10">Proceed to Checkout</span>
                            </Link>
                            
                            <p className="tex-xs text-center text-gray-400 mt-4 text-[10px]">
                                Taxes and shipping calculated at checkout
                            </p>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
