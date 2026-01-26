import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Head title="Kebijakan Privasi - JuneLabel" />
      
      <Navbar />

      <main style={{ backgroundColor: '#ffffff' }} className="font-inter">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          
          {/* Header */}
          <div className="mb-12">
            <h1 
              className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4"
              style={{ 
                color: '#7C634D',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.05)'
              }}
            >
              Kebijakan Privasi
            </h1>
            <p 
              className="text-lg"
              style={{ color: '#7C634D', opacity: 0.8 }}
            >
              Terakhir Diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-10">
              <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                Kebijakan privasi ini menjelaskan bagaimana JuneLabel mengumpulkan, menggunakan, melindungi, dan menangani Informasi Pengenal Pribadi (PII) Anda saat Anda mengunjungi situs web kami. Kami berkomitmen untuk melindungi privasi Anda dan memastikan informasi pribadi Anda ditangani dengan aman.
              </p>
            </section>

            {/* Section 1 */}
            <section className="mb-10">
              <h2 
                className="text-2xl md:text-3xl font-monstserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                Informasi Pribadi Apa yang Kami Kumpulkan?
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                Saat memesan atau mendaftar di situs web atau aplikasi JuneLabel, Anda mungkin diminta untuk memberikan nama, alamat email, nomor telepon, atau detail relevan lainnya untuk membantu meningkatkan pengalaman berbelanja Anda.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <h2 
                className="text-2xl md:text-3xl font-monstserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                Kapan Kami Mengumpulkan Informasi?
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                Kami mengumpulkan informasi dari Anda ketika Anda mendaftar di situs kami, melakukan pemesanan, berlangganan newsletter, menanggapi survei, atau mengisi formulir di platform kami.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <h2 
                className="text-2xl md:text-3xl font-monstserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                Bagaimana Kami Menggunakan Informasi Anda?
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8', marginBottom: '1rem' }}>
                Kami dapat menggunakan informasi yang dikumpulkan dari Anda dengan cara-cara berikut:
              </p>
              <ul 
                className="list-disc pl-6 space-y-3"
                style={{ color: '#7C634D' }}
              >
                <li>Untuk mempersonalisasi pengalaman Anda dan memberikan konten atau penawaran produk yang paling menarik bagi Anda.</li>
                <li>Untuk meningkatkan situs web JuneLabel agar dapat melayani Anda dengan lebih baik.</li>
                <li>Untuk merespons permintaan layanan pelanggan Anda secara efisien.</li>
                <li>Untuk mengelola kontes, promosi, survei, atau fitur situs lainnya.</li>
                <li>Untuk memproses transaksi Anda dengan cepat.</li>
                <li>Untuk mengirimkan email berkala terkait pesanan Anda atau produk dan layanan lainnya.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <h2 
                className="text-2xl md:text-3xl font-monstserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                Bagaimana Kami Melindungi Informasi Pengunjung?
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8', marginBottom: '1rem' }}>
                Keamanan Anda adalah prioritas kami. Situs web kami dipindai secara rutin untuk mendeteksi celah keamanan dan kerentanan yang diketahui agar kunjungan Anda seaman mungkin.
              </p>
              <ul 
                className="list-disc pl-6 space-y-3"
                style={{ color: '#7C634D' }}
              >
                <li>Kami menggunakan pemindaian Malware secara berkala.</li>
                <li>Informasi pribadi Anda disimpan di balik jaringan yang aman dan hanya dapat diakses oleh sejumlah terbatas orang yang memiliki hak akses khusus dan diwajibkan menjaga kerahasiaan informasi tersebut.</li>
                <li>Semua informasi sensitif/kredit yang Anda berikan dienkripsi melalui teknologi Secure Socket Layer (SSL).</li>
                <li>Semua transaksi diproses melalui penyedia gateway dan tidak disimpan atau diproses di server kami.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <h2 
                className="text-2xl md:text-3xl font-monstserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                Apakah Kami Menggunakan 'Cookies'?
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                JuneLabel tidak menggunakan cookies untuk tujuan pelacakan. Anda dapat memilih agar komputer Anda memperingatkan setiap kali cookie dikirim, atau Anda dapat mematikan semua cookies melalui pengaturan browser Anda. Jika Anda menonaktifkan cookies, beberapa fitur yang membuat pengalaman situs Anda lebih efisien mungkin akan dinonaktifkan, tetapi Anda masih dapat melakukan pemesanan.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <h2 
                className="text-2xl md:text-3xl font-monstserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                Pengungkapan kepada Pihak Ketiga
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                Kami tidak menjual, memperdagangkan, atau mentransfer informasi pengenal pribadi Anda kepada pihak luar kecuali kami memberitahu Anda terlebih dahulu. Ini tidak termasuk mitra hosting situs web dan pihak lain yang membantu kami dalam mengoperasikan situs web, menjalankan bisnis, atau melayani pengguna kami, selama pihak-pihak tersebut setuju untuk menjaga kerahasiaan informasi ini. Kami juga dapat mengungkapkan informasi bila diperlukan untuk mematuhi hukum, menegakkan kebijakan situs kami, atau melindungi hak, properti, atau keamanan kami atau orang lain.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-10">
              <h2 
                className="text-2xl md:text-3xl font-monstserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                Tautan Pihak Ketiga
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                Sesekali, atas kebijaksanaan kami, JuneLabel dapat menyertakan atau menawarkan produk atau layanan pihak ketiga di situs web kami. Situs pihak ketiga ini memiliki kebijakan privasi yang terpisah dan independen. Oleh karena itu, kami tidak bertanggung jawab atau berkewajiban atas konten dan aktivitas situs-situs yang ditautkan tersebut.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-10">
              <h2 
                className="text-2xl md:text-3xl font-monstserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                Google
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                Kami belum mengaktifkan Google AdSense di situs kami tetapi kami mungkin melakukannya di masa mendatang.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-10">
              <h2 
                className="text-2xl md:text-3xl font-monstserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                COPPA (Undang-Undang Perlindungan Privasi Online Anak)
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                JuneLabel tidak secara khusus memasarkan kepada anak-anak di bawah usia 13 tahun.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-10">
              <h2 
                className="text-2xl md:text-3xl font-monstserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                Praktik Informasi yang Adil
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8', marginBottom: '1rem' }}>
                Sejalan dengan Praktik Informasi yang Adil, jika terjadi pelanggaran data, kami akan mengambil tindakan responsif berikut:
              </p>
              <ul 
                className="list-disc pl-6 space-y-3"
                style={{ color: '#7C634D' }}
              >
                <li>Kami akan memberi tahu Anda melalui email dalam waktu 1 hari kerja.</li>
                <li>Kami juga setuju dengan prinsip ganti rugi individu, yang memungkinkan individu untuk mengejar hak-hak yang dapat ditegakkan secara hukum terhadap pengumpul dan pemroses data yang gagal mematuhi hukum.</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section className="mb-10">
              <h2 
                className="text-2xl md:text-3xl font-monstserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                Undang-Undang CAN-SPAM
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8', marginBottom: '1rem' }}>
                Kami mengumpulkan alamat email Anda untuk memproses pesanan dan mengirim informasi serta pembaruan terkait pesanan.
              </p>
              <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                Jika Anda ingin berhenti berlangganan email di masa mendatang, Anda dapat mengirim email kepada kami di <a href="mailto:support@junelabel.com" className="underline hover:opacity-70">support@junelabel.com</a>, dan kami akan segera menghapus Anda dari SEMUA korespondensi.
              </p>
            </section>

            {/* Section 12 - Contact */}
            <section className="mb-10">
              <h2 
                className="text-2xl md:text-3xl font-monstserrat font-semibold mb-4"
                style={{ color: '#7C634D' }}
              >
                Menghubungi Kami
              </h2>
              <p style={{ color: '#7C634D', lineHeight: '1.8', marginBottom: '1rem' }}>
                Jika ada pertanyaan mengenai kebijakan privasi ini, Anda dapat menghubungi kami menggunakan informasi di bawah ini:
              </p>
              <div style={{ color: '#7C634D', lineHeight: '1.8' }}>
                <p className="font-semibold">JuneLabel</p>
                <p>Yogyakarta, Indonesia</p>
                <p>Email: <a href="mailto:support@junelabel.com" className="underline hover:opacity-70">support@junelabel.com</a></p>
                <p>WhatsApp: <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">+62 812-3456-7890</a></p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}