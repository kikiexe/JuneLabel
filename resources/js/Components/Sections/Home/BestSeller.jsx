import { Link } from '@inertiajs/react';

export default function BestSellerSection({ products }) {
  // Pastikan data ada, kalau null/undefined kasih array kosong biar gak error
  const productList = products || [];

  return (
    <section style={{ backgroundColor: '#E6CBC0' }} className="py-16 font-inter">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-5xl md:text-6xl font-noto-serif-hk font-semibold tracking-tight"
            style={{ color: '#7C634D' }}
          >
            Best Seller
          </h2>
          <p className="text-xl mt-4 font-noto-serif-hk">
            "Your Everyday Comfort. Discover Our Signature Tencel Pashmina."
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
          {productList.map((product) => {
            
            // --- LOGIC HOVER IMAGE ---
            // Cek: Punya gallery gak? Kalau punya, ambil foto pertama buat hover.
            // Kalau gak punya, ya pake foto utama lagi (jadi gak berubah pas hover).
            const hoverImage = (product.gallery && product.gallery.length > 0) 
                ? product.gallery[0] 
                : product.image;

            return (
              <div key={product.id} className="group cursor-pointer px-2 md:px-4">
                
                {/* Link ke Halaman Detail */}
                <Link href={route('product.detail', product.slug)}>
                  
                  {/* Image Container (Hover Effect) */}
                  <div className="relative overflow-hidden mb-5 bg-white rounded-sm shadow-sm" style={{ paddingBottom: '115%' }}>
                    
                    {/* 1. GAMBAR UTAMA (IDLE) */}
                    {/* Opacity 100 -> 0 saat hover */}
                    <img 
                      src={`/storage/${product.image}`}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0"
                    />

                    {/* 2. GAMBAR KEDUA (HOVER) */}
                    {/* Opacity 0 -> 100 saat hover */}
                    <img 
                      src={`/storage/${hoverImage}`}
                      alt={`${product.name} Hover`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
                    />

                  </div>
                  
                  {/* Product Info */}
                  <div className="text-center">
                    <h3 
                      className="text-base md:text-lg font-semibold mb-1"
                      style={{ color: '#7C634D' }}
                    >
                      {product.name}
                    </h3>
                    <p 
                      className="text-sm md:text-base font-light"
                      style={{ color: '#7C634D', opacity: 0.7 }}
                    >
                      {new Intl.NumberFormat('id-ID', { 
                        style: 'currency', 
                        currency: 'IDR', 
                        minimumFractionDigits: 0 
                      }).format(product.price)}
                    </p>
                  </div>

                </Link>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            className="group relative px-10 py-3 text-xs font-bold uppercase tracking-[0.2em] border border-[#7C634D] overflow-hidden transition-all duration-300 hover:shadow-lg"
            style={{ borderRadius: '0px' }}
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