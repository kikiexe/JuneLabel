import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

export default function HowToOrder() {
  return (
    <>
      <Head title="How to Order - JuneLabel" />
      <Navbar />
      <main style={{ backgroundColor: '#ffffff' }} className="font-inter">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4" style={{ color: '#7C634D' }}>
              How to Order
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              Step by step guide to shopping with us
            </p>
          </div>

          <div className="space-y-8">
            {[ 
                { title: "Browse Products", desc: "Explore our collection of hijabs. Click on the product you like to see more details." },
                { title: "Add to Cart", desc: "Choose your preferred color and quantity, then click 'Add to Cart'." },
                { title: "Checkout", desc: "Review your cart and click 'Checkout'." },
                { title: "Details", desc: "Fill in your shipping details accurately to ensuring smooth delivery." },
                { title: "Payment", desc: "Select your preferred payment method and complete the payment." },
                { title: "Confirmation", desc: "You will receive an order confirmation email. Sit back and relax while we prepare your package!" }
            ].map((step, index) => (
                <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#7C634D] text-white flex items-center justify-center font-bold text-xl">
                        {index + 1}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2" style={{ color: '#7C634D' }}>{step.title}</h3>
                        <p className="text-[#7C634D]/80 leading-relaxed">{step.desc}</p>
                    </div>
                </div>
            ))}
          </div>

             <div className="mt-12 bg-[#FFF6EC] p-6 rounded-lg text-[#7C634D]">
                <p>Need help? Contact our Customer Service via WhatsApp if you encounter any issues.</p>
             </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
