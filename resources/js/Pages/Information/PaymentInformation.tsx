import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

export default function PaymentInformation() {
  return (
    <>
      <Head title="Payment Information - JuneLabel" />
      <Navbar />
      <main style={{ backgroundColor: '#ffffff' }} className="font-inter pt-16 xl:pt-20">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <div className="mb-12">
            <h1
              className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4"
              style={{ color: '#7C634D' }}
            >
              Payment Information
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              Secure and convenient payment methods
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#7C634D' }}>
                Metode Pembayaran
              </h2>
              <p className="text-[#7C634D]/80 mb-6 leading-relaxed">
                Kami bekerja sama dengan <strong>Midtrans</strong> untuk menyediakan berbagai metode pembayaran yang aman dan terverifikasi secara otomatis.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Virtual Account', 'QRIS / GoPay', 'ShopeePay', 'Kartu Kredit'].map((method) => (
                  <div
                    key={method}
                    className="bg-[#FFF6EC] p-4 rounded text-center text-[#7C634D] font-medium border border-[#7C634D]/10"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#7C634D' }}>
                Virtual Account (VA)
              </h2>
              <p className="text-[#7C634D]/80 mb-4 leading-relaxed">
                Anda dapat melakukan pembayaran melalui Virtual Account bank ternama seperti <strong>BCA, Mandiri, BNI, BRI, dan Permata</strong>. Keuntungan menggunakan VA adalah konfirmasi pembayaran dilakukan secara otomatis dalam hitungan detik.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#7C634D' }}>
                QRIS & E-Wallet
              </h2>
              <p className="text-[#7C634D]/80 mb-4 leading-relaxed">
                Kami juga mendukung pembayaran via QRIS yang dapat dipindai menggunakan aplikasi m-Banking atau E-Wallet favorit Anda seperti <strong>GoPay, OVO, Dana, dan LinkAja</strong>. Pembayaran melalui ShopeePay juga tersedia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#7C634D' }}>
                Bantuan Pembayaran
              </h2>
              <p className="text-[#7C634D]/80 leading-relaxed">
                Jika Anda mengalami kendala saat melakukan pembayaran atau ingin menanyakan status transaksi, silakan hubungi tim Customer Service kami melalui WhatsApp di 
                <a href="https://wa.me/6282123456789" className="font-bold ml-1 hover:underline">+62 821-2345-6789</a>. 
                Kami tidak pernah meminta Anda untuk mengirimkan dana ke rekening pribadi atas nama perorangan.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
