import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactUs() {
  return (
    <>
      <Head title="Contact Us - JuneLabel" />
      <Navbar />
      <main style={{ backgroundColor: '#ffffff' }} className="font-inter">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4" style={{ color: '#7C634D' }}>
              Contact Us
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              We'd love to hear from you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#7C634D' }}>Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#FFF6EC] rounded-lg">
                    <Mail className="w-6 h-6 text-[#7C634D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#7C634D] mb-1">Email</h3>
                    <p className="text-[#7C634D]/80">junelabelco@gmail.com</p>
                    <p className="text-[#7C634D]/80 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#FFF6EC] rounded-lg">
                    <Phone className="w-6 h-6 text-[#7C634D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#7C634D] mb-1">WhatsApp</h3>
                     <a href="https://wa.me/6282282577216" target="_blank" rel="noopener noreferrer" className="text-[#7C634D]/80 hover:underline">
                      +62 822-8257-7216
                    </a>
                    <p className="text-[#7C634D]/80 text-sm mt-1">Mon - Sun: 8.30 AM - 9.00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#FFF6EC] rounded-lg">
                    <MapPin className="w-6 h-6 text-[#7C634D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#7C634D] mb-1">Office</h3>
                    <p className="text-[#7C634D]/80">Currently Online Store Only</p>
                    <p className="text-[#7C634D]/80">Shipping from Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF6EC] p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#7C634D' }}>Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#7C634D] mb-1">Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-[#7C634D]/20 rounded focus:outline-none focus:border-[#7C634D] bg-white text-[#7C634D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#7C634D] mb-1">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-[#7C634D]/20 rounded focus:outline-none focus:border-[#7C634D] bg-white text-[#7C634D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#7C634D] mb-1">Message</label>
                  <textarea rows="4" className="w-full px-4 py-2 border border-[#7C634D]/20 rounded focus:outline-none focus:border-[#7C634D] bg-white text-[#7C634D]"></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-[#7C634D] text-white font-semibold rounded hover:bg-[#6a5441] transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
