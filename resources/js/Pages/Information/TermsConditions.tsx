import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

export default function TermsConditions() {
  return (
    <>
      <Head title="Syarat dan Ketentuan - JuneLabel" />

      <Navbar />

      <main style={{ backgroundColor: '#ffffff' }} className="font-inter">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          {/* Header */}
          <div className="mb-12">
            <h1
              className="text-4xl md:text-5xl font-montserrat font-semibold mb-4"
              style={{
                color: '#7C634D',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.05)',
              }}
            >
              Syarat dan Ketentuan
            </h1>
            <p className="text-lg font-semibold" style={{ color: '#7C634D', opacity: 0.8 }}>
              JuneLabel
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-10">
            <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
              Selamat datang di situs web JuneLabel. Harap membaca Syarat dan Ketentuan ini with
              saksama sebelum melakukan transaksi atau menggunakan layanan kami. Dengan mengakses
              atau membeli produk dari JuneLabel, Anda dianggap telah memahami and menyetujui
              seluruh isi syarat and ketentuan di bawah ini.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section className="mb-10">
              <h2
                className="text-2xl md:text-3xl font-montserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                1. Umum
              </h2>
              <ul
                className="list-disc pl-6 space-y-3"
                style={{ color: '#7C634D', lineHeight: '1.8' }}
              >
                <li>Situs and layanan ini dikelola oleh JuneLabel.</li>
                <li>
                  Kami berhak untuk mengubah, memodifikasi, menambah, atau menghapus bagian dari
                  Syarat and Ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Perubahan
                  akan berlaku efektif segera setelah diunggah di situs.
                </li>
                <li>
                  Pengguna disarankan untuk memeriksa halaman ini secara berkala untuk mengetahui
                  perubahan terbaru.
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <h2
                className="text-2xl md:text-3xl font-montserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                2. Informasi Produk and Harga
              </h2>
              <ul
                className="list-disc pl-6 space-y-3"
                style={{ color: '#7C634D', lineHeight: '1.8' }}
              >
                <li>
                  <strong>Akurasi Warna:</strong> Kami berusaha menampilkan warna produk seakurat
                  mungkin. Namun, karena perbedaan pengaturan layar monitor atau layar ponsel, kami
                  tidak dapat menjamin bahwa warna yang Anda lihat akan 100% akurat with produk
                  aslinya.
                </li>
                <li>
                  <strong>Akurasi Ukuran:</strong> Detail ukuran disediakan sebagai panduan umum.
                  Mohon toleransi perbedaan ukuran 1-2 cm akibat proses produksi.
                </li>
                <li>
                  <strong>Harga:</strong> Semua harga yang tercantum adalah dalam mata uang Rupiah
                  (IDR). Harga dapat berubah sewaktu-waktu tanpa pemberitahuan, namun harga yang
                  berlaku untuk pesanan yang telah dikonfirmasi tidak akan berubah.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <h2
                className="text-2xl md:text-3xl font-montserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                3. Pemesanan and Pembayaran
              </h2>
              <ul
                className="list-disc pl-6 space-y-3"
                style={{ color: '#7C634D', lineHeight: '1.8' }}
              >
                <li>
                  <strong>Pemesanan:</strong> Pesanan dianggap sah apabila Anda telah menyelesaikan
                  proses checkout and menerima email/notifikasi konfirmasi pesanan.
                </li>
                <li>
                  <strong>Ketersediaan Stok:</strong> Kami berusaha memastikan stok selalu tersedia.
                  Namun, jika produk yang Anda pesan ternyata habis karena alasan teknis atau
                  lainnya, kami akan segera menghubungi Anda untuk menawarkan penukaran produk atau
                  pengembalian dana (refund).
                </li>
                <li>
                  <strong>Pembayaran:</strong> Pembayaran harus dilakukan penuh dalam batas waktu
                  yang ditentukan (biasanya 1x24 jam) setelah pemesanan. Jika pembayaran tidak
                  diterima dalam batas waktu tersebut, pesanan akan dibatalkan secara otomatis oleh
                  sistem.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <h2
                className="text-2xl md:text-3xl font-montserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                4. Pengiriman
              </h2>
              <ul
                className="list-disc pl-6 space-y-3"
                style={{ color: '#7C634D', lineHeight: '1.8' }}
              >
                <li>
                  Pesanan akan diproses pada hari kerja (Senin - Jumat/Sabtu). Pesanan yang masuk
                  pada hari libur nasional akan diproses pada hari kerja berikutnya.
                </li>
                <li>
                  <strong>Tanggung Jawab:</strong> Risiko kehilangan atau kerusakan barang beralih
                  kepada pembeli setelah barang diserahkan oleh JuneLabel kepada pihak jasa
                  ekspedisi/kurir.
                </li>
                <li>
                  Keterlambatan pengiriman yang disebabkan oleh pihak jasa ekspedisi berada di luar
                  kendali and tanggung jawab JuneLabel, namun kami akan membantu melacak paket Anda
                  jika terjadi kendala.
                </li>
                <li>
                  Pastikan alamat pengiriman yang Anda masukkan lengkap and benar. JuneLabel tidak
                  bertanggung jawab atas kegagalan pengiriman akibat kesalahan penulisan alamat oleh
                  pelanggan.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <h2
                className="text-2xl md:text-3xl font-montserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                5. Kebijakan Pengembalian and Penukaran (Return & Exchange)
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8', marginBottom: '1rem' }}>
                Kami menerima pengembalian atau penukaran barang with syarat sebagai berikut:
              </p>
              <ul
                className="list-disc pl-6 space-y-3"
                style={{ color: '#7C634D', lineHeight: '1.8' }}
              >
                <li>
                  Barang yang diterima cacat produksi atau salah kirim (tidak sesuai pesanan).
                </li>
                <li>
                  Komplain harus diajukan maksimal 2x24 jam setelah barang diterima (berdasarkan
                  status pelacakan kurir).
                </li>
                <li>
                  Produk harus dalam kondisi asli, belum dipakai, belum dicuci, and label
                  harga/merek masih terpasang.
                </li>
                <li>Wajib menyertakan video unboxing tanpa terpotong sebagai bukti.</li>
                <li>
                  Biaya kirim untuk pengembalian barang cacat/salah kirim akan ditanggung oleh
                  JuneLabel.
                </li>
                <li>
                  Barang SALE atau diskon khusus tidak dapat ditukar atau dikembalikan (kecuali
                  cacat).
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <h2
                className="text-2xl md:text-3xl font-montserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                6. Hak Kekayaan Intelektual
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                Seluruh konten yang terdapat dalam situs ini, termasuk namun tidak terbatas pada
                teks, grafik, logo, ikon tombol, gambar, klip audio, unduhan digital, and data
                kompilasi adalah milik JuneLabel and dilindungi oleh undang-undang hak cipta
                Indonesia. Dilarang keras menggunakan, menyalin, atau memodifikasi konten tanpa izin
                tertulis dari kami.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-10">
              <h2
                className="text-2xl md:text-3xl font-montserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                7. Hukum yang Berlaku
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                Syarat and ketentuan ini diatur and ditafsirkan sesuai with hukum yang berlaku di
                Republik Indonesia. Segala perselisihan yang timbul dari penggunaan layanan ini akan
                diselesaikan melalui yurisdiksi pengadilan di Indonesia.
              </p>
            </section>

            {/* Section 8 - Contact */}
            <section className="mb-10">
              <h2
                className="text-2xl md:text-3xl font-montserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                8. Kontak Kami
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8', marginBottom: '1rem' }}>
                Jika Anda memiliki pertanyaan mengenai Syarat and Ketentuan ini, silakan hubungi
                kami melalui:
              </p>
              <div style={{ color: '#7C634D', lineHeight: '1.8' }}>
                <p>
                  <strong>WhatsApp:</strong>{' '}
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-70"
                  >
                    +62 812-3456-7890
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:junelabelco@gmail.com" className="underline hover:opacity-70">
                    junelabelco@gmail.com
                  </a>
                </p>
                <p>
                  <strong>Jam Operasional:</strong> Senin - Jumat, 09.00 - 17.00 WIB
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
