import { Head, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { useCart } from '@/Contexts/CartContext';
import {ArrowLeft, CheckCircle} from 'lucide-react';
import { useEffect, useState } from 'react';
import { sanitizeString, validatePhone, validateEmail } from '@/Utils/validation';

export default function Checkout() {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const [displayTotal, setDisplayTotal] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        customer_phone: '',
        shipping_address: '',
        notes: '',
        items: []
    });

    useEffect(() => {
        const itemsPayload = cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity
        }));
        
        setData('items', itemsPayload);
        setDisplayTotal(getCartTotal());
    }, [cartItems]);

    // Sanitization handlers
    const handleNameChange = (e) => {
        const sanitized = sanitizeString(e.target.value);
        setData('customer_name', sanitized);
    };

    const handlePhoneChange = (e) => {
        const sanitized = sanitizeString(e.target.value);
        setData('customer_phone', sanitized);
    };

    const handleAddressChange = (e) => {
        const sanitized = sanitizeString(e.target.value);
        setData('shipping_address', sanitized);
    };

    const handleNotesChange = (e) => {
        const sanitized = sanitizeString(e.target.value);
        setData('notes', sanitized);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('checkout.store'), {
            onSuccess: () => {
                clearCart();
            }
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    if (cartItems.length === 0 && displayTotal === 0) {
        return (
             <div className="min-h-screen flex flex-col bg-[#FFF6EC] font-inter">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center text-[#7C634D]">
                        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
                        <a href="/" className="underline">Return to Home</a>
                    </div>
                </div>
             </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#FFF6EC] font-inter">
            <Head title="Checkout - June Label" />
            <Navbar />

            <main className="flex-grow pt-24 pb-16 px-4 md:px-8 lg:px-16 container mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide uppercase text-[#7C634D]">
                        Checkout
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                    
                    {errors.error && (
                        <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">{errors.error}</span>
                        </div>
                    )}

                    <div className="w-full lg:w-3/5">
                        <div className="bg-white p-6 md:p-8 border border-[#7C634D]/10 rounded-sm shadow-sm">
                            <h2 className="text-lg font-bold text-[#7C634D] uppercase tracking-wider mb-6 pb-2 border-b border-[#7C634D]/10">
                                Shipping Information
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        value={data.customer_name}
                                        onChange={handleNameChange}
                                        className="w-full bg-[#f9f9f9] border border-gray-200 focus:border-[#7C634D] focus:ring-0 text-[#7C634D] px-4 py-3 text-sm transition-colors"
                                        placeholder="Enter your full name"
                                        required
                                        aria-required="true"
                                    />
                                    {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                                        Phone Number / WhatsApp <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        value={data.customer_phone}
                                        onChange={handlePhoneChange}
                                        className="w-full bg-[#f9f9f9] border border-gray-200 focus:border-[#7C634D] focus:ring-0 text-[#7C634D] px-4 py-3 text-sm transition-colors"
                                        placeholder="0812..."
                                        required
                                        aria-required="true"
                                    />
                                    {errors.customer_phone && <p className="text-red-500 text-xs mt-1">{errors.customer_phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                                        Shipping Address <span className="text-red-500">*</span>
                                    </label>
                                    <textarea 
                                        rows="4"
                                        value={data.shipping_address}
                                        onChange={handleAddressChange}
                                        className="w-full bg-[#f9f9f9] border border-gray-200 focus:border-[#7C634D] focus:ring-0 text-[#7C634D] px-4 py-3 text-sm transition-colors resize-none"
                                        placeholder="Full address (Street, City, District, Postal Code)"
                                        required
                                        aria-required="true"
                                    ></textarea>
                                    {errors.shipping_address && <p className="text-red-500 text-xs mt-1">{errors.shipping_address}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Order Notes (Optional)</label>
                                    <textarea 
                                        rows="2"
                                        value={data.notes}
                                        onChange={handleNotesChange}
                                        className="w-full bg-[#f9f9f9] border border-gray-200 focus:border-[#7C634D] focus:ring-0 text-[#7C634D] px-4 py-3 text-sm transition-colors resize-none"
                                        placeholder="Special instructions for delivery"
                                    ></textarea>
                                </div>

                                <div className="lg:hidden mt-8">
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full bg-[#7C634D] text-white py-4 font-bold text-sm tracking-widest uppercase hover:bg-[#65503D] transition-colors disabled:opacity-70"
                                    >
                                        {processing ? 'Processing...' : 'Place Order'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/5">
                        <div className="bg-white p-6 md:p-8 border border-[#7C634D]/10 rounded-sm shadow-sm sticky top-24">
                            <h2 className="text-lg font-bold text-[#7C634D] uppercase tracking-wider mb-6 pb-2 border-b border-[#7C634D]/10">
                                Order Summary
                            </h2>

                            <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-6 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-start">
                                        <div className="w-16 h-20 bg-[#f9f9f9] flex-shrink-0 border border-gray-100">
                                             <img 
                                                src={`/storage/${item.image}`} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-serif text-[#7C634D] text-sm leading-tight mb-1">{item.name}</h4>
                                            <div className="flex justify-between items-center text-xs text-gray-500">
                                                <span>Qty: {item.quantity}</span>
                                                <span className="font-medium text-[#7C634D]">{formatPrice(item.price * item.quantity)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-[#7C634D]/10 text-sm text-[#7C634D]">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-bold">{formatPrice(displayTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Shipping</span>
                                    <span className="italic text-xs">Calculated by Admin</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-4">
                                    <span>Total Estimation</span>
                                    <span>{formatPrice(displayTotal)}</span>
                                </div>
                            </div>

                            <div className="hidden lg:block mt-8">
                                <button 
                                    onClick={handleSubmit} 
                                    disabled={processing}
                                    className="w-full bg-[#7C634D] text-white py-4 font-bold text-sm tracking-widest uppercase hover:bg-[#65503D] transition-colors disabled:opacity-70 group relative overflow-hidden"
                                >
                                    <span className="relative z-10">{processing ? 'Processing...' : 'Place Order'}</span>
                                </button>
                            </div>
                            
                            <p className="text-[10px] text-center text-gray-400 mt-4 leading-relaxed">
                                By placing this order, you agree to our Terms and Conditions. <br/>
                                <strong>Secure Checkout:</strong> Prices are validated by our server.
                            </p>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
