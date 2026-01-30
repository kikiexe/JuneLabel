import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import SeoHead from '@/Components/SeoHead';

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  product_count: number;
}

interface Props {
  categories: Category[];
}

export default function Collections({ categories }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white font-inter text-[#7C634D]">
      <SeoHead title="Collections" description="Browse all our collections." />
      <Navbar />

      <div className="bg-[#FFF6EC] pt-28 pb-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-widest mb-4">
          Our Collections
        </h1>
        <p className="max-w-xl mx-auto text-sm opacity-80">
          Explore our carefully curated categories.
        </p>
      </div>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={route('collections.detail', category.slug)}
              className="group relative block overflow-hidden bg-gray-100 aspect-[4/5]"
            >
              {category.image ? (
                <img
                  src={`/storage/${category.image}`}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#f0eadd] text-[#7C634D]/30">
                  <span className="text-4xl font-serif">JL</span>
                </div>
              )}

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center text-white p-4">
                <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-wider mb-2 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0 text-shadow">
                  {category.name}
                </h2>
                <span className="text-xs uppercase tracking-widest opacity-0 transform translate-y-4 transition-all duration-500 delay-75 group-hover:opacity-100 group-hover:translate-y-0 bg-white/20 px-4 py-2 backdrop-blur-sm rounded-full">
                  {category.product_count} Products
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
