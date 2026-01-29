import { Link } from '@inertiajs/react';
import { useState } from 'react';
import Alert from '@/Utils/Alert';
import { Product } from '@/types';

interface Props {
  products: Product[];
}

export default function RelatedProducts({ products }: Props) {
  const [alertOpen, setAlertOpen] = useState(false);

  const handleDevFeature = (e: React.MouseEvent) => {
    e.preventDefault();
    setAlertOpen(true);
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 px-6 max-w-[1920px] mx-auto w-full border-t bg-[#FFFFFF]">
      <Alert isOpen={alertOpen} onClose={() => setAlertOpen(false)} />

      <div className="text-center mb-12">
        <h3 className="text-xl font-bold tracking-[0.2em] font-inter text-[#7C634D] uppercase">
          Related Products
        </h3>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible no-scrollbar pb-6 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
        {products.map((product) => {
          const hoverImage =
            product.gallery && product.gallery.length > 0 ? product.gallery[0] : product.image;

          return (
            <div
              key={product.id}
              className="group cursor-pointer min-w-[200px] w-[75%] md:w-[45%] lg:w-auto flex-shrink-0 snap-center lg:snap-align-none"
            >
              <Link href={route('product.detail', product.slug)}>
                <div
                  className="relative overflow-hidden mb-4 bg-[#F5F5F5] w-full"
                  style={{ paddingBottom: '133.33%' }}
                >
                  <img
                    src={`/storage/${product.image}`}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#7C634D] line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#7C634D]/80">
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
    </section>
  );
}
