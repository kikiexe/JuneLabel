import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    // Placeholder for tracking logic
    alert('This feature is currently under development. Please check your email for the tracking link from the courier.');
  };

  return (
    <>
      <Head title="Track Order - JuneLabel" />
      <Navbar />
      <main style={{ backgroundColor: '#ffffff' }} className="font-inter">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4" style={{ color: '#7C634D' }}>
              Track Order
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              Know where your package is
            </p>
          </div>

          <div className="max-w-xl">
             <div className="bg-[#FFF6EC] p-8 rounded-lg shadow-sm">
                <p className="text-[#7C634D] mb-6">Enter your Order ID or Receipt Number to check the status of your shipment.</p>
                <form onSubmit={handleTrack} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#7C634D] mb-1">Order ID / Tracking Number</label>
                        <input 
                            type="text" 
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="w-full px-4 py-2 border border-[#7C634D]/20 rounded focus:outline-none focus:border-[#7C634D] bg-white text-[#7C634D]" 
                            placeholder="e.g., JUNE-123456"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#7C634D] text-white font-semibold rounded hover:bg-[#6a5441] transition-colors">
                        Check Status
                    </button>
                </form>
             </div>
             
             <div className="mt-8 text-sm text-[#7C634D]/60 text-center">
                <p>Having trouble? Contact our <a href="/contact-us" className="underline hover:text-[#7C634D]">Customer Support</a>.</p>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
