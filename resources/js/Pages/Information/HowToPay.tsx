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
            <h1
              className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4"
              style={{ color: '#7C634D' }}
            >
              How to Pay
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              Instructions for completing your payment
            </p>
          </div>

          <div className="space-y-12 text-[#7C634D]">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Portal Pembayaran Midtrans</h2>
              <p className="text-[#7C634D]/80 mb-6 leading-relaxed">
                Kami menggunakan portal pembayaran <strong>Midtrans</strong> untuk memastikan setiap transaksi Anda aman, cepat, dan otomatis terverifikasi. Anda tidak perlu melakukan konfirmasi manual setelah membayar.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-3">1. Virtual Account (VA)</h3>
                  <ol className="list-decimal list-inside space-y-2 text-[#7C634D]/80 ml-4">
                    <li>Pilih <strong>Virtual Account</strong> pada halaman pembayaran Midtrans.</li>
                    <li>Pilih bank Anda (BCA, Mandiri, BNI, BRI, dll).</li>
                    <li>Salin nomor Virtual Account yang muncul.</li>
                    <li>Gunakan m-Banking atau ATM untuk melakukan transfer ke nomor tersebut.</li>
                    <li>Verifikasi akan dilakukan otomatis dalam hitungan detik.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">2. QRIS (GoPay, OVO, Dana, dll)</h3>
                  <ol className="list-decimal list-inside space-y-2 text-[#7C634D]/80 ml-4">
                    <li>Pilih <strong>QRIS</strong> sebagai metode pembayaran.</li>
                    <li>Scan kode QR yang muncul di layar menggunakan aplikasi e-wallet Anda.</li>
                    <li>Konfirmasi pembayaran di aplikasi e-wallet.</li>
                    <li>Sistem akan mendeteksi pembayaran secara instan.</li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="bg-blue-50/50 p-6 rounded-lg border border-blue-100 flex items-start gap-4">
              <span className="text-2xl">💡</span>
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>Penting:</strong> Selalu periksa kembali nominal pembayaran Anda. Kami tidak pernah meminta pembayaran ke nomor rekening selain yang tertera di halaman resmi Midtrans.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
