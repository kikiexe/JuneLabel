import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

export default function HowToOrder() {
  return (
    <>
      <Head title="How to Order - JuneLabel" />
      <Navbar />
      <main style={{ backgroundColor: '#ffffff' }} className="font-inter pt-16 xl:pt-20">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <div className="mb-12">
            <h1
              className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4"
              style={{ color: '#7C634D' }}
            >
              How to Order
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              Step by step guide to shopping with us
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                title: 'Pilih Koleksi',
                desc: 'Jelajahi berbagai koleksi kami di halaman Collections dan temukan produk favorit Anda.',
              },
              {
                title: 'Tambahkan ke Keranjang',
                desc: "Pilih detail seperti kuantitas, lalu klik 'Add to Cart' untuk memasukkan ke keranjang.",
              },
              { title: 'Checkout', desc: "Tinjau kembali pesanan Anda di halaman keranjang dan klik tombol 'Checkout'." },
              {
                title: 'Lengkapi Data',
                desc: 'Isi alamat pengiriman dengan lengkap. Ongkos kirim akan dihitung otomatis oleh sistem RajaOngkir.',
              },
              {
                title: 'Pembayaran Aman',
                desc: 'Pilih metode pembayaran (VA, QRIS, dll) melalui portal Midtrans dan selesaikan transaksi.',
              },
              {
                title: 'Konfirmasi',
                desc: 'Status pesanan Anda akan otomatis terupdate. Anda dapat memantau pesanan di halaman My Orders.',
              },
            ].map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#7C634D] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#7C634D' }}>
                    {step.title}
                  </h3>
                  <p className="text-[#7C634D]/80 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
