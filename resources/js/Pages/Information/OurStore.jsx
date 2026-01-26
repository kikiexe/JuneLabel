import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

export default function OurStore() {
  return (
    <>
      <Head title="Our Store - JuneLabel" />
      <Navbar />
      <main style={{ backgroundColor: '#ffffff' }} className="font-inter">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4" style={{ color: '#7C634D' }}>
              Our Store
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              Visit us online or at our offline pop-ups
            </p>
          </div>

          <div className="prose max-w-none text-[#7C634D]">
             <div className="bg-[#FFF6EC] p-8 rounded-lg text-center mb-12">
                <h2 className="text-2xl font-semibold mb-4">Online Store Info</h2>
                <p className="mb-4">
                    JuneLabel primarily operates as an online store, serving customers throughout Indonesia. 
                    We are dedicated to providing you with the best shopping experience from the comfort of your home.
                </p>
                <div className="flex justify-center gap-4 mt-6">
                    <a href="https://shopee.co.id/junelabel" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-[#7C634D] rounded hover:bg-[#7C634D] hover:text-white transition-colors">
                        Shopee
                    </a>
                    <a href="https://tokopedia.com/junelabel" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-[#7C634D] rounded hover:bg-[#7C634D] hover:text-white transition-colors">
                        Tokopedia
                    </a>
                </div>
             </div>

             <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Offline Presence</h2>
                <p className="mb-4">
                    Currently, we do not have a permanent offline store. However, we frequently participate in bazaars and pop-up events.
                    Follow our social media to stay updated on where you can find us next!
                </p>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
