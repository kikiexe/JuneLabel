import { Link, router } from '@inertiajs/react';
import SeoHead from '@/Components/SeoHead';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import BackToTop from '@/Components/UI/BackToTop';
import { Product, Category } from '@/types';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedData<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: PaginationLink[];
  from: number;
  to: number;
}

interface ShopFilters {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  availability?: string;
  price_min?: string;
  price_max?: string;
}

interface Props {
  products: PaginatedData<Product>;
  filters: ShopFilters;
  customTitle?: string;
  customDescription?: string;
  availabilityCounts: { in_stock: number; out_of_stock: number };
  maxPrice: number;
}

export default function ShopIndex({
  products,
  filters = {}, // Default empty object to prevent crash
  customTitle,
  customDescription,
  availabilityCounts,
  maxPrice,
}: Props) {
  const [search, setSearch] = useState(filters?.search || '');
  const [selectedCategory, setSelectedCategory] = useState(filters?.category || '');
  const [sort, setSort] = useState(filters?.sort || 'latest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // New Filters
  const [availability, setAvailability] = useState<string[]>(
    filters?.availability ? filters.availability.split(',') : []
  );
  const [priceMin, setPriceMin] = useState(filters?.price_min || '');
  const [priceMax, setPriceMax] = useState(filters?.price_max || '');

  // Helper function to format slug to title case
  const formatSlug = (slug: string) => {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Determine Title Logic
  const displayTitle = customTitle
    ? customTitle
    : filters.category
      ? formatSlug(filters.category)
      : 'All Collections';

  const displayDescription =
    customDescription ||
    (filters.category
      ? `Discover our premium ${formatSlug(filters.category)} collection.`
      : 'Discover our premium hijab collection, designed for comfort and elegance.');

  // SEO
  const pageTitle = displayTitle;
  const pageDescription = `Discover our premium ${filters.category || 'hijab'} collection. ${products.total} products available.`;

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
    // @ts-ignore - router typing might be incomplete for 'on'
    const removeListener = router.on('navigate', handleRouteChange);

    return () => {
      // @ts-ignore
      removeListener && removeListener();
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

  const handleFilterChange = (key: keyof ShopFilters, value: any) => {
    router.get(
      window.location.pathname,
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

  const handleAvailabilityChange = (value: string) => {
    const newAvailability = availability.includes(value)
      ? availability.filter((a) => a !== value)
      : [...availability, value];

    setAvailability(newAvailability);
    handleFilterChange('availability', newAvailability.join(','));
  };

  const handlePriceApply = () => {
    const params: any = { ...filters };
    if (priceMin) params.price_min = priceMin;
    else delete params.price_min;

    if (priceMax) params.price_max = priceMax;
    else delete params.price_max;

    params.page = 1;

    // Use current URL to preserve category/collection context
    router.get(window.location.pathname, params, {
      preserveState: true,
      replace: true,
      preserveScroll: true,
    });
  };

  const resetFilters = () => {
    setAvailability([]);
    setPriceMin('');
    setPriceMax('');

    const { category, search, sort } = filters;
    router.get(route('collections.all'), { category, search, sort }, { preserveState: true });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter text-[#7C634D]">
      <SeoHead title={pageTitle} description={pageDescription} url={window.location.href} />
      <Navbar />

      <div className="pt-28 pb-12 px-4 md:px-8 lg:px-16 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-widest mb-4">
          {displayTitle}
        </h1>
        <p className="max-w-xl mx-auto text-sm md:text-base font-light opacity-80">
          {displayDescription}
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
                        fixed inset-0 z-50 bg-white lg:static lg:bg-transparent lg:w-1/5 lg:block
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

            {/* Availability Filter */}
            <div className="mb-8 border-b border-[#7C634D]/10 pb-6">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider mb-4">
                Availability
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-4 h-4 border border-[#7C634D] flex items-center justify-center transition-colors ${availability.includes('in_stock') ? 'bg-[#7C634D]' : 'bg-white'}`}
                  >
                    {availability.includes('in_stock') && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={availability.includes('in_stock')}
                    onChange={() => handleAvailabilityChange('in_stock')}
                  />
                  <span className="text-sm group-hover:opacity-70 transition-opacity">
                    In Stock ({availabilityCounts.in_stock})
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-4 h-4 border border-[#7C634D] flex items-center justify-center transition-colors ${availability.includes('out_of_stock') ? 'bg-[#7C634D]' : 'bg-white'}`}
                  >
                    {availability.includes('out_of_stock') && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={availability.includes('out_of_stock')}
                    onChange={() => handleAvailabilityChange('out_of_stock')}
                  />
                  <span className="text-sm group-hover:opacity-70 transition-opacity">
                    Out of Stock ({availabilityCounts.out_of_stock})
                  </span>
                </label>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8 border-b border-[#7C634D]/10 pb-6">
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider">
                  Price (IDR)
                </h3>
              </div>

              {/* Dual Range Slider */}
              <div className="relative h-1 bg-gray-200 rounded mt-4 mb-6">
                <div
                  className="absolute top-0 bottom-0 bg-[#7C634D] rounded"
                  style={{
                    left: `${(Number(priceMin || 0) / maxPrice) * 100}%`,
                    right: `${100 - (Number(priceMax || maxPrice) / maxPrice) * 100}%`,
                  }}
                ></div>

                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="1000"
                  value={priceMin || 0}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    const currentMax = Number(priceMax || maxPrice);
                    if (val < currentMax) setPriceMin(val.toString());
                  }}
                  className="absolute -top-1.5 w-full h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7C634D] [&::-webkit-slider-thumb]:appearance-none cursor-pointer z-20"
                />

                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="1000"
                  value={priceMax || maxPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    const currentMin = Number(priceMin || 0);
                    if (val > currentMin) setPriceMax(val.toString());
                  }}
                  className="absolute -top-1.5 w-full h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7C634D] [&::-webkit-slider-thumb]:appearance-none cursor-pointer z-30"
                />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full bg-[#f9f9f9] border border-gray-200 px-3 py-2 text-xs focus:border-[#7C634D] focus:ring-0 outline-none"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full bg-[#f9f9f9] border border-gray-200 px-3 py-2 text-xs focus:border-[#7C634D] focus:ring-0 outline-none"
                />
              </div>
              <button
                onClick={handlePriceApply}
                className="w-full bg-[#7C634D] text-white py-2 text-xs uppercase font-bold tracking-wider hover:bg-[#65503D] transition-colors"
              >
                Apply Price
              </button>
            </div>

            {/* Reset Filter */}
            {(filters.availability || filters.price_min || filters.price_max) && (
              <button
                onClick={resetFilters}
                className="w-full border border-[#7C634D] text-[#7C634D] py-2 text-xs uppercase font-bold tracking-wider hover:bg-[#7C634D] hover:text-white transition-colors"
              >
                Reset Filters
              </button>
            )}
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
                    <option value="price_asc">Price: Low - High</option>
                    <option value="price_desc">Price: High - Low</option>
                    <option value="name_asc">Alphabet: A - Z</option>
                    <option value="name_desc">Alphabet: Z - A</option>
                    <option value="oldest">Date: Oldest - Newest</option>
                    <option value="latest">Date: Newest - Oldest</option>
                    <option value="best_seller">Best Seller</option>
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
                    Category: {formatSlug(filters.category)}
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
                  onClick={() => router.get(route('collections.all'))}
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
                          loading="lazy"
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
                      const decodeLabel = (label: string) => {
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
                  onClick={() => router.get(route('collections.index'))}
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
