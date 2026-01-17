import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { AlertCircle, Home, Package } from 'lucide-react';

export default function OrderError({ error }) {
    const errorMessage = error || 'An error occurred while processing your order.';
    
    return (
        <div className="min-h-screen flex flex-col bg-[#FFF6EC] font-inter">
            <Head title="Order Error - June Label" />
            <Navbar />

            <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-4">
                <div className="max-w-xl w-full bg-white p-8 md:p-12 border border-red-200 text-center shadow-sm">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertCircle size={40} className="text-red-500" />
                        </div>
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-red-600 uppercase tracking-wide mb-4">
                        Order Failed
                    </h1>
                    
                    <p className="text-gray-600 mb-2 leading-relaxed">
                        We're sorry, but your order could not be processed.
                    </p>
                    
                    <div className="bg-red-50 p-4 rounded-sm mb-8 text-left border border-red-200">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-red-700 mb-2">Error Details</h3>
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                            Please try again or contact our customer service if the problem persists.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                            <Link 
                                href="/cart" 
                                className="inline-flex items-center justify-center gap-2 bg-[#7C634D] text-white py-3 px-6 font-bold text-sm tracking-widest uppercase hover:bg-[#65503D] transition-colors"
                            >
                                <Package size={18} />
                                Back to Cart
                            </Link>
                            
                            <Link 
                                href="/" 
                                className="inline-flex items-center justify-center gap-2 border border-[#7C634D] text-[#7C634D] py-3 px-6 font-bold text-sm tracking-widest uppercase hover:bg-[#7C634D] hover:text-white transition-colors"
                            >
                                <Home size={18} />
                                Go Home
                            </Link>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-6">
                            Need help? Contact us via WhatsApp or email
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
