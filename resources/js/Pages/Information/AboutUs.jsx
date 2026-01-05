import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';

export default function AboutUs() {
  return (
    <>
      <Head title="Tentang Kami - JuneLabel" />
      
      <Navbar />

      <main style={{ backgroundColor: '#ffffff' }} className="font-inter">
        {/* Content Section */}
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
              Tentang Kami
            </h1>
            <p 
              className="text-xl font-monstserrat"
              style={{ color: '#7C634D', opacity: 0.8 }}
            >
              Sentuhan Elegan untuk Muslimah Indonesia
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-16">
            <p 
              className="text-lg leading-relaxed"
              style={{ color: '#7C634D', lineHeight: '2' }}
            >
              Selamat datang di <strong>JuneLabel</strong>, awal baru dari sebuah perjalanan untuk menghadirkan keindahan dalam kesederhanaan. Sebagai jenama (brand) lokal yang baru tumbuh, kami hadir dengan satu fokus utama: mempersembahkan koleksi hijab terbaik yang nyaman, anggun, dan mencerminkan kepribadian Anda.
            </p>
          </section>

          {/* Philosophy Section */}
          <section className="mb-16">
            <h2 
              className="text-3xl md:text-4xl font-monstserrat font-semibold mb-6"
              style={{ 
                color: '#7C634D',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              Filosofi Kami: Kesederhanaan yang Memikat
            </h2>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: '#7C634D', lineHeight: '2' }}
            >
              Di JuneLabel, kami percaya bahwa hijab bukan sekadar penutup, melainkan mahkota bagi setiap Muslimah. Kami ingin menemani keseharian Anda—baik saat bekerja, bersantai, maupun di acara istimewa—dengan produk yang memadukan nilai syariat dan estetika modern.
            </p>
          </section>

          {/* Specialization Section */}
          <section className="mb-16">
            <h2 
              className="text-3xl md:text-4xl font-monstserrat font-semibold mb-6"
              style={{ 
                color: '#7C634D',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              Spesialisasi Kami: Fokus pada Kenyamanan
            </h2>
            <p 
              className="text-lg leading-relaxed mb-6"
              style={{ color: '#7C634D', lineHeight: '2' }}
            >
              Sebagai langkah awal kami di industri fashion muslim, JuneLabel mendedikasikan diri sepenuhnya pada produk Hijab. Kami mengerti bahwa kenyamanan adalah kunci. Oleh karena itu, kami menyeleksi material kain terbaik yang:
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div 
                className="p-6 rounded-lg"
                style={{ backgroundColor: '#FFF6EC' }}
              >
                <div className="mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7C634D" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: '#7C634D' }}
                >
                  Adem dan Menyerap Keringat
                </h3>
                <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                  Cocok untuk iklim tropis Indonesia.
                </p>
              </div>

              <div 
                className="p-6 rounded-lg"
                style={{ backgroundColor: '#FFF6EC' }}
              >
                <div className="mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7C634D" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: '#7C634D' }}
                >
                  Mudah Dibentuk
                </h3>
                <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                  Tegak di dahi dan tidak mudah lecek, membuat Anda tampil rapi sepanjang hari.
                </p>
              </div>

              <div 
                className="p-6 rounded-lg"
                style={{ backgroundColor: '#FFF6EC' }}
              >
                <div className="mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7C634D" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: '#7C634D' }}
                >
                  Warna yang Cantik
                </h3>
                <p style={{ color: '#7C634D', lineHeight: '1.8' }}>
                  Pilihan warna-warna earth tone, pastel, dan bold yang mudah dipadupadankan dengan pakaian favorit Anda.
                </p>
              </div>
            </div>

            <p 
              className="text-lg leading-relaxed"
              style={{ color: '#7C634D', lineHeight: '2' }}
            >
              Setiap helai hijab JuneLabel dibuat dengan ketelitian dan cinta khas UMKM Indonesia. Kami memastikan setiap jahitan rapi dan setiap produk yang sampai ke tangan Anda telah melalui proses pengecekan kualitas yang ketat.
            </p>
          </section>

          {/* Growing Together Section */}
          <section className="mb-16">
            <h2 
              className="text-3xl md:text-4xl font-monstserrat font-semibold mb-6"
              style={{ 
                color: '#7C634D',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              Tumbuh Bersama Anda
            </h2>
            <p 
              className="text-lg leading-relaxed mb-6"
              style={{ color: '#7C634D', lineHeight: '2' }}
            >
              JuneLabel bangga menjadi bagian dari UMKM Indonesia yang sedang berkembang. Dukungan Anda sangat berarti bagi kami. Saat ini, kami memulai dengan hijab, namun kami memiliki mimpi besar untuk terus berinovasi dan melengkapi kebutuhan fashion muslimah Anda di masa depan.
            </p>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: '#7C634D', lineHeight: '2' }}
            >
              Kami mengundang Anda untuk mencoba koleksi perdana kami. Rasakan kelembutan bahannya dan temukan warna yang paling mewakili diri Anda.
            </p>
          </section>

          {/* Closing Section */}
          <section 
            className="text-center py-12 px-8 rounded-lg"
            style={{ backgroundColor: '#FFF6EC' }}
          >
            <p 
              className="text-2xl font-monstserrat font-semibold mb-4"
              style={{ color: '#7C634D' }}
            >
              Terima kasih telah mendukung produk lokal.
            </p>
            <p 
              className="text-xl font-monstserrat"
              style={{ color: '#7C634D', opacity: 0.9 }}
            >
              Mari melangkah lebih anggun bersama JuneLabel.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}