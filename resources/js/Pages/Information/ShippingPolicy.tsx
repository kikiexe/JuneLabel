import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

export default function ShippingPolicy() {
  return (
    <>
      <Head title="Shipping Policy - JuneLabel" />
      <Navbar />
      <main style={{ backgroundColor: '#ffffff' }} className="font-inter pt-16 xl:pt-20">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <div className="mb-12">
            <h1
              className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4"
              style={{ color: '#7C634D' }}
            >
              Shipping Policy
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              Information about delivery and handling
            </p>
          </div>

          <div className="space-y-8 text-[#7C634D] leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Waktu Pemrosesan</h2>
              <p className="text-[#7C634D]/80">
                Pesanan Anda akan diproses dalam 1-2 hari kerja setelah pembayaran terverifikasi. Pesanan yang masuk pada hari Sabtu, Minggu, atau hari libur nasional akan diproses pada hari kerja berikutnya.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Metode Pengiriman</h2>
              <p className="text-[#7C634D]/80 mb-4">
                Kami menggunakan layanan pengiriman terpercaya melalui integrasi <strong>RajaOngkir</strong> dengan pilihan kurir sebagai berikut:
              </p>
              <ul className="list-disc list-inside text-[#7C634D]/80 space-y-1 ml-4">
                <li>
                  <strong>JNE:</strong> Layanan REG (Regular) dan YES (Yakin Esok Sampai).
                </li>
                <li>
                  <strong>POS Indonesia:</strong> Layanan Pos Reguler dan Pos Nextday.
                </li>
                <li>
                  <strong>TIKI:</strong> Layanan Reguler dan ONS (Over Night Service).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Biaya Pengiriman</h2>
              <p className="text-[#7C634D]/80">
                Biaya pengiriman dihitung secara otomatis berdasarkan berat total produk dan lokasi pengiriman Anda (kecamatan & kota). Anda dapat melihat estimasi biaya pengiriman di halaman Cart dan Checkout.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Pelacakan Pesanan</h2>
              <p className="text-[#7C634D]/80">
                Setelah pesanan dikirim, nomor resi akan diinformasikan melalui email dan dapat dilihat di halaman <strong>My Orders</strong>. Anda juga bisa menggunakan fitur <strong>Track Order</strong> di website kami untuk memantau perjalanan paket Anda.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
