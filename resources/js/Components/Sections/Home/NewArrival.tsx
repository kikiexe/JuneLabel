import { useState } from 'react';
import { Link } from '@inertiajs/react';
import Alert from '@/Utils/Alert';
import { Product } from '@/types';

interface Props {
  products: Product[];
}

export default function NewArrivalSection({ products }: Props) {
  const productList = products || [];
  const [alertOpen, setAlertOpen] = useState(false);

  const handleDevFeature = (e: React.MouseEvent) => {
    e.preventDefault();
    setAlertOpen(true);
  };

  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-12 md:py-20 font-inter">
      <Alert isOpen={alertOpen} onClose={() => setAlertOpen(false)} />
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="text-center mb-10 md:mb-16">
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-noto-serif-hk font-semibold tracking-tight"
            style={{ color: '#7C634D' }}
          >
            New Arrival
          </h2>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-10 lg:gap-8 mb-12 md:mb-16">
          {productList.map((product) => {
            const hoverImage =
              product.gallery && product.gallery.length > 0 ? product.gallery[0] : product.image;

            const commonImgStyle: React.CSSProperties = {
              objectPosition: 'center top',
              transform: 'scale(1.1)',
            };

            return (
              <div key={product.id} className="group cursor-pointer">
                <Link href={route('product.detail', product.slug)}>
                  <div
                    className="relative overflow-hidden mb-3 md:mb-5 bg-white rounded-sm shadow-sm w-full"
                    style={{ paddingBottom: '133.33%' }}
                  >
                    <img
                      src={`/storage/${product.image}`}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0"
                      style={commonImgStyle}
                    />

                    <img
                      src={`/storage/${hoverImage}`}
                      alt={`${product.name} Hover`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
                      style={commonImgStyle}
                    />
                  </div>

                  <div className="text-center px-1">
                    <h3
                      className="text-sm md:text-lg font-medium md:font-semibold lg:font-semibold mb-1 leading-tight line-clamp-2"
                      style={{ color: '#7C634D' }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-xs md:text-base font-light mt-1"
                      style={{ color: '#7C634D', opacity: 0.7 }}
                    >
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(product.price)}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={handleDevFeature}
            className="group relative px-8 py-2 md:px-10 md:py-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border border-[#7C634D] bg-[#7C634D] overflow-hidden transition-all duration-300"
            style={{ borderRadius: '0px' }}
          >
            <span className="absolute inset-0 w-full h-full bg-[#FFFFFF] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>

            <span className="relative z-10 text-[#FFFFFF] transition-colors duration-500 group-hover:text-[#7C634D]">
              View All Products
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
