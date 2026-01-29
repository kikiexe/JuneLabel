import { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import { router } from '@inertiajs/react';
import Alert from '@/Utils/Alert';
import { useCart } from '@/Contexts/CartContext';
import { Product } from '@/types';

interface Props {
  product: Product;
}

export default function DetailSection({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  // Handle potentially missing image/gallery safely
  const allImages = [product.image, ...(product.gallery || [])].filter(
    (img): img is string => !!img
  );

  const maxStock = product.stock || 0;
  const increment = () => setQuantity((q) => (q < maxStock ? q + 1 : q));
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (allImages.length === 0) return;
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allImages.length]);

  return (
    <div className="bg-[#FFFFFF] pt-24 md:pt-32 pb-16 px-4 md:px-8 lg:px-12">
      <Alert isOpen={alertOpen} onClose={() => setAlertOpen(false)} />
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* BAGIAN KIRI: IMAGE GALLERY */}
          <div className="w-full lg:w-[60%] relative group">
            {/* Keyboard navigation hint */}
            <div className="absolute top-4 right-4 z-10 bg-black/50 text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              ← → to navigate
            </div>

            <div
              className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-0 lg:gap-4 no-scrollbar scroll-smooth"
              onScroll={(e) => {
                const target = e.target as HTMLElement;
                const scrollLeft = target.scrollLeft;
                const width = target.offsetWidth;
                const index = Math.round(scrollLeft / width);
                // Avoid unnecessary updates
                if (Math.abs(scrollLeft - index * width) < 10) {
                  // Approximate check to debounce
                }
                setCurrentImageIndex(index);
              }}
              role="region"
              aria-label="Product images gallery"
            >
              {allImages.map((img, index) => (
                <div key={index} className="w-full flex-shrink-0 snap-center bg-[#f9f9f9] relative">
                  <img
                    src={`/storage/${img}`}
                    alt={`${product.name} - Image ${index + 1} of ${allImages.length}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Mobile Carousel Indicators (Dots) */}
            <div className="absolute bottom-4 left-0 right-0 flex lg:hidden justify-center gap-2 z-10">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${
                    index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`View image ${index + 1}`}
                  aria-current={index === currentImageIndex}
                />
              ))}
            </div>

            {/* Screen reader announcement */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              Image {currentImageIndex + 1} of {allImages.length}
            </div>
          </div>

          {/* BAGIAN KANAN: INFO PRODUK (Sticky) */}
          <div className="w-full lg:w-[40%] flex flex-col lg:sticky lg:top-24 h-fit pt-2">
            {/* Brand */}
            <p className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
              {product.category?.name || 'JUNE LABEL'}
            </p>

            {/* Nama Produk */}
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-serif text-[#7C634D] leading-tight tracking-wide mb-3 uppercase">
              {product.name}
            </h1>

            {/* Harga */}
            <p className="text-xl md:text-2xl font-medium text-[#c45e5e] mb-6">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(product.price)}
            </p>

            {/* Stock Availability */}
            <div className="mb-6">
              {maxStock > 0 ? (
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      maxStock < 5 ? 'text-orange-600' : 'text-green-600'
                    }`}
                  >
                    {maxStock < 5 ? '⚠️' : '✓'} {maxStock} items available
                  </span>
                  {maxStock < 5 && maxStock > 0 && (
                    <span className="text-xs text-orange-600 font-medium">
                      Only {maxStock} left in stock!
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-sm font-medium text-red-600">❌ Out of stock</span>
              )}
            </div>

            {/* Deskripsi Singkat */}
            <div className="text-xs md:text-sm text-gray-600 font-light leading-relaxed mb-8 space-y-4">
              <p>
                <strong>Detail Produk:</strong>
                <br />
                Material yang lembut, adem, dan flowy. Cocok untuk daily wear maupun formal event.
                Desain eksklusif yang timeless.
              </p>
              {product.description && (
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              )}
            </div>

            {/* Size Chart Image Placeholder */}
            <div className="mb-8 p-4 bg-[#FFF6EC] rounded-sm border border-[#7C634D]/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#7C634D] mb-3 text-center">
                Size Chart
              </h4>
              <div className="w-full grid grid-cols-4 gap-px bg-[#7C634D]/20 border border-[#7C634D]/20 text-[10px] text-center">
                {/* Header */}
                <div className="bg-[#FFF6EC] py-2 font-bold text-[#7C634D]">Size</div>
                <div className="bg-[#FFF6EC] py-2 font-bold text-[#7C634D]">Bust</div>
                <div className="bg-[#FFF6EC] py-2 font-bold text-[#7C634D]">Length</div>
                <div className="bg-[#FFF6EC] py-2 font-bold text-[#7C634D]">Sleeve</div>
                {/* Row */}
                <div className="bg-white py-2 text-gray-600">All Size</div>
                <div className="bg-white py-2 text-gray-600">110cm</div>
                <div className="bg-white py-2 text-gray-600">138cm</div>
                <div className="bg-white py-2 text-gray-600">56cm</div>
              </div>
            </div>

            <div className="space-y-6 text-xs text-gray-500 font-light mb-8 border-t border-b border-gray-100 py-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Petunjuk Perawatan</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Cuci dengan tangan (Hand wash recommended)</li>
                  <li>Hindari penggunaan pemutih</li>
                  <li>Setrika dengan suhu rendah</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Note</h4>
                <p>
                  Warna produk pada model memiliki tone warna yang mungkin sedikit berbeda karena
                  faktor pencahayaan saat pemotretan.
                </p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7C634D]">
                Quantity
              </span>
              <div className="flex items-center border border-[#7C634D]/30">
                <button
                  onClick={decrement}
                  className="p-2 hover:bg-[#7C634D]/10 transition focus-visible:ring-2 focus-visible:ring-[#7C634D] focus-visible:ring-inset"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} color="#7C634D" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setQuantity(Math.max(1, Math.min(maxStock, val)));
                  }}
                  onBlur={(e) => {
                    const val = parseInt(e.target.value);
                    if (!e.target.value || isNaN(val) || val < 1) {
                      setQuantity(1);
                    } else if (val > maxStock) {
                      setQuantity(maxStock);
                    }
                  }}
                  min="1"
                  max={maxStock}
                  className="w-12 text-center text-sm border-none focus:ring-0 p-1 text-[#7C634D] font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={increment}
                  className="p-2 hover:bg-[#7C634D]/10 transition focus-visible:ring-2 focus-visible:ring-[#7C634D] focus-visible:ring-inset"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} color="#7C634D" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={maxStock === 0}
                className={`group relative w-full py-4 border font-bold text-xs tracking-[0.2em] uppercase overflow-hidden transition-opacity ${
                  maxStock === 0
                    ? 'opacity-50 cursor-not-allowed border-gray-300 text-gray-400'
                    : 'border-[#7C634D] text-[#7C634D]'
                }`}
              >
                {maxStock > 0 && (
                  <span className="absolute inset-0 w-full h-full bg-[#7C634D] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                )}
                <span
                  className={`relative z-10 transition-colors duration-500 ${
                    maxStock > 0 ? 'group-hover:text-white' : ''
                  }`}
                >
                  {maxStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </span>
              </button>
              <button
                onClick={() => {
                  addToCart(product, quantity);
                  router.visit('/cart');
                }}
                disabled={maxStock === 0}
                className={`group relative w-full py-4 border font-bold text-xs tracking-[0.2em] uppercase overflow-hidden shadow-md transition-opacity ${
                  maxStock === 0
                    ? 'opacity-50 cursor-not-allowed bg-gray-300 border-gray-300 text-gray-500'
                    : 'bg-[#7C634D] border-[#7C634D] text-white'
                }`}
              >
                {maxStock > 0 && (
                  <span className="absolute inset-0 w-full h-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                )}
                <span
                  className={`relative z-10 transition-colors duration-500 ${
                    maxStock > 0 ? 'group-hover:text-[#7C634D]' : ''
                  }`}
                >
                  {maxStock === 0 ? 'Out of Stock' : 'Buy It Now'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
