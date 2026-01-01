import { Link } from '@inertiajs/react';

export default function NewArrivalSection({ products }) {
  // Ambil produk terakhir ditambahkan (sorted by created_at descending)
  const productList = products || [];

  return (
    <section style={{ backgroundColor: '#E6CBC0' }} className="py-16 font-inter">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-5xl md:text-6xl font-noto-serif-hk font-semibold tracking-tight mb-4"
            style={{ 
              color: '#7C634D',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            New Arrival
          </h2>
          <p className="text-xl font-noto-serif-hk" style={{ color: '#7C634D', opacity: 0.8 }}>
            "Fresh Styles Just Landed. Explore Our Latest Collection."
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
          {productList.map((product) => {
            
            // Logic hover image
            const hoverImage = (product.gallery && product.gallery.length > 0) 
                ? product.gallery[0] 
                : product.image;

            return (
              <div key={product.id} className="group cursor-pointer">
                
                {/* Link ke Halaman Detail */}
                <Link href={route('product.detail', product.slug)}>
                  
                  {/* Image Container dengan border dan shadow berbeda */}
                  <div 
                    className="relative overflow-hidden mb-5 bg-white shadow-md transition-shadow duration-300 group-hover:shadow-xl" 
                    style={{ 
                      paddingBottom: '125%',
                      border: '1px solid #7C634D20'
                    }}
                  >
                    
                    {/* Gambar Utama */}
                    <img 
                      src={`/storage/${product.image}`}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out opacity-100 group-hover:opacity-0 group-hover:scale-105"
                    />

                    {/* Gambar Hover */}
                    <img 
                      src={`/storage/${hoverImage}`}
                      alt={`${product.name} Hover`}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                    />

                    {/* Badge "NEW" di pojok kiri atas */}
                    <div 
                      className="absolute top-3 left-3 px-3 py-1 text-xs font-bold tracking-wider"
                      style={{ 
                        backgroundColor: '#7C634D',
                        color: '#FFF6EC'
                      }}
                    >
                      NEW
                    </div>

                  </div>
                  
                  {/* Product Info */}
                  <div className="text-center px-2">
                    <h3 
                      className="text-base md:text-lg font-semibold mb-2 transition-colors duration-300 group-hover:opacity-70"
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