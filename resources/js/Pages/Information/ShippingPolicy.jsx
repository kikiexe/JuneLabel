import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

export default function ShippingPolicy() {
  return (
    <>
      <Head title="Shipping Policy - JuneLabel" />
      <Navbar />
      <main style={{ backgroundColor: '#ffffff' }} className="font-inter">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4" style={{ color: '#7C634D' }}>
              Shipping Policy
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              Information about delivery and handling
            </p>
          </div>

          <div className="space-y-8 text-[#7C634D] leading-relaxed">
            <section>
                <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
                <p className="text-[#7C634D]/80">
                    Orders are processed within 1-2 business days after payment confirmation. 
                    Orders placed on weekends or public holidays will be processed on the next business day.
                </p>
            </section>

             <section>
                <h2 className="text-2xl font-semibold mb-4">Shipping Methods</h2>
                <p className="text-[#7C634D]/80 mb-4">
                    We partner with reliable logistics providers including JNE, J&T, Sicepat, and GoSend/GrabExpress for same-day delivery (Jakarta area only).
                </p>
                <ul className="list-disc list-inside text-[#7C634D]/80 space-y-1 ml-4">
                    <li><strong>Regular:</strong> 2-4 business days (Java), 3-7 business days (Outside Java).</li>
                    <li><strong>Express/Next Day:</strong> 1-2 business days.</li>
                    <li><strong>Same Day:</strong> Order before 12:00 PM for same-day delivery.</li>
                </ul>
            </section>

             <section>
                <h2 className="text-2xl font-semibold mb-4">Shipping Rates</h2>
                <p className="text-[#7C634D]/80">
                    Shipping rates are calculated based on the weight of your order and your delivery location. The final shipping cost will be displayed at checkout.
                </p>
            </section>

             <section>
                <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
                <p className="text-[#7C634D]/80">
                    Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our "Track Order" page or the courier's website.
                </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
