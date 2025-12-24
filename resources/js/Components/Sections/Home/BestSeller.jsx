export default function BestSellerSection() {
    const products = [
      {
        id: 1,
        name: "Classic Leather Bag",
        price: "Rp 899.000",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80"
      },
      {
        id: 2,
        name: "Vintage Canvas Tote",
        price: "Rp 650.000",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80"
      },
      {
        id: 3,
        name: "Minimalist Backpack",
        price: "Rp 1.250.000",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"
      },
      {
        id: 4,
        name: "Elegant Shoulder Bag",
        price: "Rp 799.000",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80"
      }
    ];
  
    const handleProductClick = (productName) => {
      console.log(`Navigasi ke detail produk: ${productName}`);
    };
  
    return (
      <section style={{ backgroundColor: '#E6CBC0' }} className="py-16 font-inter">
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-16">
          {/* Header - Deskripsi dihapus, judul diubah menjadi Serif */}
          <div className="text-center mb-16">
            <h2 
              className="text-5xl md:text-6xl font-noto-serif-hk font-semibold tracking-tight"
              style={{ color: '#7C634D' }}
            >
              Best Seller
            </h2>
            <p
              className="text-xl mt-4 font-noto-serif-hk"
            >
              "Your Everyday Comfort. Discover Our Signature Tencel Pashmina."
            </p>
          </div>
  
          {/* Products Grid - Gambar dikecilkan dengan px tambahan di tiap item */}
          <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16">
            {products.map((product) => (
              <div 
                key={product.id}
                className="group cursor-pointer px-2 md:px-4" // Tambah padding agar gambar mengecil secara visual
                onClick={() => handleProductClick(product.name)}
              >
                {/* Image Container - Aspect ratio sedikit diubah agar lebih pendek */}
                <div className="relative overflow-hidden mb-5 bg-white rounded-sm shadow-sm" style={{ paddingBottom: '115%' }}>
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Product Info */}
                <div className="text-center">
                  <h3 
                    className="text-base md:text-lg font-semibold mb-1 group-hover:underline underline-offset-4 decoration-[#7C634D]"
                    style={{ color: '#7C634D' }}
                  >
                    {product.name}
                  </h3>
                  <p 
                    className="text-sm md:text-base font-light"
                    style={{ color: '#7C634D', opacity: 0.7 }}
                  >
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
  
          {/* View All Button */}
          <div className="text-center">
            <button
              className="group relative px-10 py-3 text-xs font-bold uppercase tracking-[0.2em] border border-[#7C634D] overflow-hidden transition-all duration-300 hover:shadow-lg"
              style={{ 
                borderRadius: '0px'
              }}
            >
              <span className="absolute inset-0 bg-[#7C634D] transition-transform duration-500 ease-out group-hover:-translate-x-full"></span>
              <span className="relative z-10 text-[#FFF6EC] transition-colors duration-500 group-hover:text-[#7C634D]">
                View All Products
              </span>
            </button>
          </div>
        </div>
      </section>
    );
  }