export default function CopywritingSection() {
    return (
      <section 
        className="relative w-full py-40 font-inter overflow-hidden"
        style={{
          backgroundImage: "url('/images/copywriting.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
          // Efek Parallax dihapus agar simpel seperti Hero
        }}
      >
        <div 
          className="absolute inset-0"
        ></div>
  
        <div className="relative w-full max-w-[1920px] mx-auto px-6 md:px-16">
          <div className="max-w-3xl">
            <h2 
              className="text-5xl md:text-8xl font-montserrat font-semibold mb-8 leading-tight"
              style={{ 
                color: '#7C634D', 
                textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)'
              }}
            >
              Crafted with Passion,<br />Designed for You
            </h2>
            
            <p 
              className="text-lg md:text-xl leading-relaxed max-w-2xl font-light"
              style={{ color: '#7C634D', opacity: 0.95 }}
            >
              Setiap produk kami dibuat dengan perhatian terhadap detail dan kualitas terbaik. 
              Kami percaya bahwa fashion adalah bentuk ekspresi diri, dan kami berkomitmen 
              untuk menghadirkan koleksi yang tidak hanya stylish, tetapi juga nyaman dan 
              tahan lama untuk menemani setiap langkah perjalanan Anda.
            </p>
          </div>
        </div>
      </section>
    );
  }