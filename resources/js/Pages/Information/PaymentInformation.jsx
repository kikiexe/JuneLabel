import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

export default function PaymentInformation() {
  return (
    <>
      <Head title="Payment Information - JuneLabel" />
      <Navbar />
      <main style={{ backgroundColor: '#ffffff' }} className="font-inter">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4" style={{ color: '#7C634D' }}>
              Payment Information
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              Secure and convenient payment methods
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#7C634D' }}>Accepted Payment Methods</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Bank Transfer', 'Credit Card', 'E-Wallet', 'QRIS'].map((method) => (
                    <div key={method} className="bg-[#FFF6EC] p-4 rounded text-center text-[#7C634D] font-medium">
                        {method}
                    </div>
                ))}
              </div>
            </section>

             <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#7C634D' }}>Bank Transfer</h2>
              <p className="text-[#7C634D]/80 mb-4 leading-relaxed">
                You can make payments via bank transfer to our official accounts. Please ensure you transfer the exact amount including the unique code if applicable.
              </p>
               <div className="bg-white border border-[#7C634D]/20 p-6 rounded-lg space-y-4">
                  <div className="flex justify-between items-center border-b border-[#7C634D]/10 pb-2">
                    <span className="font-semibold text-[#7C634D]">BCA</span>
                    <span className="text-[#7C634D]/80">123 456 7890 (June Label)</span>
                  </div>
                   <div className="flex justify-between items-center border-b border-[#7C634D]/10 pb-2">
                    <span className="font-semibold text-[#7C634D]">Mandiri</span>
                    <span className="text-[#7C634D]/80">123 000 456 789 (June Label)</span>
                  </div>
               </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#7C634D' }}>Payment Confirmation</h2>
              <p className="text-[#7C634D]/80 leading-relaxed">
                  After making a manual bank transfer, please confirm your payment through the "Confirm Payment" page or send the proof of transaction to our WhatsApp admin at +62 822-8257-7216. Automatic payments (Midtrans, VA, E-Wallet) do not require manual confirmation.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
