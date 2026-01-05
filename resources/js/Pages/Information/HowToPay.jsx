import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

export default function HowToPay() {
  return (
    <>
      <Head title="How to Pay - JuneLabel" />
      <Navbar />
      <main style={{ backgroundColor: '#ffffff' }} className="font-inter">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
           <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4" style={{ color: '#7C634D' }}>
              How to Pay
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              Instructions for completing your payment
            </p>
          </div>

          <div className="space-y-12 text-[#7C634D]">
            <section>
                <h2 className="text-2xl font-semibold mb-4">Virtual Account (Bank Transfer)</h2>
                <ol className="list-decimal list-inside space-y-2 text-[#7C634D]/80 ml-4">
                    <li>Select <strong>Virtual Account</strong> as your payment method during checkout.</li>
                    <li>Choose your bank (BCA, Mandiri, BNI, BRI, etc.).</li>
                    <li>You will receive a unique Virtual Account number.</li>
                    <li>Open your mobile banking app or go to an ATM.</li>
                    <li>Select "Transfer" or "Payment" menu, then input the VA number.</li>
                    <li>Verify the amount and merchant name (JuneLabel).</li>
                    <li>Complete the transaction. Your order will be verified automatically.</li>
                </ol>
            </section>

             <section>
                <h2 className="text-2xl font-semibold mb-4">E-Wallet (GoPay, OVO, ShopeePay)</h2>
                <ol className="list-decimal list-inside space-y-2 text-[#7C634D]/80 ml-4">
                    <li>Select your preferred E-Wallet at checkout.</li>
                    <li>You will be redirected to the app or shown a QR code.</li>
                    <li>Scan the QR Code or confirm payment in the app.</li>
                    <li>Enter your PIN to authorize the payment.</li>
                    <li>Payment success will be detected automatically.</li>
                </ol>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
