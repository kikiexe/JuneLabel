import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function OrderComplete({ order }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FFF6EC] font-inter">
            <Head title="Order Complete - June Label" />
            <Navbar />

            <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-4">
                <div className="max-w-xl w-full bg-white p-8 md:p-12 border border-[#7C634D]/10 text-center shadow-sm">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-[#7C634D]/10 rounded-full flex items-center justify-center">
                            <CheckCircle size={40} className="text-[#7C634D]" />
                        </div>
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#7C634D] uppercase tracking-wide mb-4">
                        Thank You!
                    </h1>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Your order has been placed successfully.<br/>
                        Order Code: <span className="font-bold text-[#7C634D]">{order.order_code}</span>
                    </p>

                    <div className="bg-[#FFF6EC] p-6 rounded-sm mb-8 text-left">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#7C634D] mb-4 border-b border-[#7C634D]/10 pb-2">Order Details</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Customer</span>
                                <span className="font-medium text-[#7C634D]">{order.customer_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Payment Status</span>
                                <span className="font-medium uppercase bg-yellow-100 text-yellow-800 px-2 py-0.5 text-xs rounded-full">
                                    {order.payment_status}
                                </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-[#7C634D]/10 font-bold text-[#7C634D]">
                                <span>Total Amount</span>
                                <span>{formatPrice(order.total_price)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                         <a 
                            href={`https://wa.me/6281234567890?text=Halo%20June%20Label,%20saya%20sudah%20melakukan%20pemesanan%20dengan%20kode%20${order.order_code}.%20Mohon%20info%20pembayarannya.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] text-white py-3 font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            Confirm via WhatsApp <ArrowRight size={16} />
                        </a>

                        <Link 
                            href="/" 
                            className="w-full border border-[#7C634D] text-[#7C634D] py-3 font-bold text-sm tracking-widest uppercase hover:bg-[#7C634D] hover:text-white transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
