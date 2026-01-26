import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import BackToTop from '@/Components/UI/BackToTop';

export default function ShopIndex({ products, categories, filters }) {
  const [search, setSearch] = useState(filters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
  const [sort, setSort] = useState(filters.sort || 'latest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
  ];

  // Close mobile filter on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileFilterOpen(false);
    };

    // Listen for Inertia navigation events
    router.on('navigate', handleRouteChange);

    return () => {
      router.off('navigate', handleRouteChange);
    };
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (filters.search || '')) {
        handleFilterChange('search', search);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleFilterChange = (key, value) => {
    router.get(
      route('shop.index'),
      {
        ...filters,
        [key]: value,
        // Reset page to 1 on new filter
        page: 1,
      },
      {
        preserveState: true,
        replace: true,
        preserveScroll: true,
      }
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter text-[#7C634D]">
      <Head title="Shop Collection - June Label" />
      <Navbar />

      <div className="bg-[#FFF6EC] pt-28 pb-12 px-4 md:px-8 lg:px-16 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-widest mb-4">
          All Collections
        </h1>
        <p className="max-w-xl mx-auto text-sm md:text-base font-light opacity-80">
          Discover our premium hijab collection, designed for comfort and elegance.
        </p>
      </div>

      <main className="flex-grow container mx-auto px-4 md:px-8 lg:px-16 py-12">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-[#7C634D]/10">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
          >
            <SlidersHorizontal size={18} /> Filters
          </button>
          <span className="text-xs text-gray-400">{products.total} Products</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          {/* Sidebar Filters (Desktop) */}
          <aside
            className={`
                        fixed inset-0 z-50 bg-white lg:static lg:bg-transparent lg:w-1/4 lg:block
                        transform transition-transform duration-300 ease-in-out p-6 lg:p-0
                        ${mobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    `}
          >
            <div className="flex justify-between items-center lg:hidden mb-8">
              <span className="font-serif text-xl font-bold uppercase">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Search in Sidebar */}
            <div className="mb-8 block lg:hidden">
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block opacity-70">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-[#f9f9f9] border border-gray-200 pl-10 pr-4 py-2 text-sm focus:border-[#7C634D] focus:ring-0"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-serif text-lg font-bold border-b border-[#7C634D]/20 pb-2 mb-4">
                Categories
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      handleFilterChange('category', '');
                      setMobileFilterOpen(false);
                    }}
                    className={`hover:underline underline-offset-4 transition-all ${
                      !filters.category
                        ? 'font-bold pl-2 border-l-2 border-[#7C634D]'
                        : 'opacity-70'
                    }`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        handleFilterChange('category', cat.slug);
                        setMobileFilterOpen(false);
                      }}
                      className={`text-left hover:underline underline-offset-4 transition-all ${
                        filters.category === cat.slug
                          ? 'font-bold pl-2 border-l-2 border-[#7C634D]'
                          : 'opacity-70'
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="w-full lg:w-3/4">
            {/* Top Toolbar (Sort & Desktop Search) */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              {/* Desktop Search */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-white border border-[#7C634D]/20 pl-10 pr-4 py-2 text-sm focus:border-[#7C634D] focus:ring-0 placeholder:text-[#7C634D]/40 text-[#7C634D]"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C634D]/50"
                  size={16}
                />
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-xs uppercase tracking-wider opacity-60 hidden sm:inline">
                  Sort By:
                </span>
                <div className="relative w-full sm:w-auto">
                  <select
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value);
                      handleFilterChange('sort', e.target.value);
                    }}
                    className="w-full sm:w-48 appearance-none bg-white border border-[#7C634D]/20 py-2 pl-4 pr-10 text-sm focus:border-[#7C634D] focus:ring-0 text-[#7C634D] cursor-pointer"
                  >
                    <option value="latest">Latest Arrival</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="oldest">Oldest</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"
                    size={16}
                  />
                </div>
              </div>
            </div>

            {/* Active Filters display */}
            {(filters.search || filters.category) && (
              <div className="mb-6 flex gap-2 flex-wrap text-xs">
                {filters.search && (
                  <span className="bg-[#7C634D] text-[#FFF6EC] px-3 py-1 rounded-full flex items-center gap-2">
                    Search: "{filters.search}"
                    <button
                      onClick={() => {
                        setSearch('');
                        handleFilterChange('search', '');
                      }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {filters.category && (
                  <span className="bg-[#7C634D] text-[#FFF6EC] px-3 py-1 rounded-full flex items-center gap-2">
                    Category:{' '}
                    {categories.find((c) => c.slug === filters.category)?.name || filters.category}
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        handleFilterChange('category', '');
                      }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => router.get(route('shop.index'))}
                  className="text-[#7C634D] underline underline-offset-2 hover:opacity-70 px-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid */}
            {products.data.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-12">
                  {products.data.map((product) => (
                    <Link
                      key={product.id}
                      href={route('product.detail', product.slug)}
                      className="group block"
                    >
                      <div className="relative overflow-hidden mb-4 bg-[#f9f9f9] aspect-[3/4]">
                        <img
                          src={`/storage/${product.image}`}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Badge Overlay can go here (e.g. Sale, New) */}
                        {!product.is_active && (
                          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                            <span className="bg-gray-800 text-white px-3 py-1 text-xs uppercase font-bold">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-1 text-center sm:text-left">
                        <p className="text-[10px] md:text-xs font-bold tracking-widest text-gray-400 uppercase">
                          {product.category?.name || 'Collection'}
                        </p>
                        <h3 className="font-serif text-base md:text-lg text-[#7C634D] group-hover:underline underline-offset-2 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm md:text-base font-medium text-[#c45e5e]">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {products.links && products.links.length > 3 && (
                  <div className="mt-16 flex justify-center gap-2">
                    {products.links.map((link, index) => {
                      const decodeLabel = (label) => {
                        if (label === '&laquo; Previous') return '← Previous';
                        if (label === 'Next &raquo;') return 'Next →';
                        return label;
                      };

                      return (
                        <Link
                          key={index}
                          href={link.url || '#'}
                          preserveState
                          preserveScroll
                          className={`px-4 py-2 text-sm border transition-colors ${
                            link.active
                              ? 'bg-[#7C634D] text-white border-[#7C634D]'
                              : !link.url
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                              : 'bg-white text-[#7C634D] border-[#7C634D]/30 hover:bg-[#7C634D]/10'
                          }`}
                        >
                          {decodeLabel(link.label)}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              // Empty State
              <div className="py-20 text-center border border-dashed border-[#7C634D]/20 bg-[#f9f9f9]">
                <h3 className="text-lg font-bold text-[#7C634D] mb-2">No products found</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => router.get(route('shop.index'))}
                  className="bg-[#7C634D] text-white px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-[#65503D] transition-colors"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
}
