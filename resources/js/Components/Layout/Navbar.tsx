import { useState, useEffect, MouseEvent, KeyboardEvent } from 'react';
import { Link, router } from '@inertiajs/react';
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  Facebook,
  Mail,
  Instagram,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Alert from '@/Utils/Alert';
import { useCart } from '@/Contexts/CartContext';
import Cookies from 'js-cookie';
import { CONTACT_INFO } from '@/Constants/contact';
import { Category } from '@/types';

export default function Navbar() {
  const { getCartCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories dari API
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Failed to fetch categories:', err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Encode search query untuk handle special characters
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      router.visit(route('shop.index', { search: encodedQuery }));
      setSearchOpen(false);
    }
  };

  const handleDevFeature = (e: MouseEvent) => {
    // Fungsi ini tidak lagi digunakan untuk blokir link, tapi bisa untuk debug/tracking
    setMobileMenuOpen(false);
  };

  interface NavbarLinkProps {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }

  const NavbarLink = ({ href, children, onClick, className = '' }: NavbarLinkProps) => (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative text-sm font-medium text-[#7C634D] cursor-pointer ${className}`}
    >
      {children}
      <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#7C634D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out hidden xl:block"></span>
    </Link>
  );

  return (
    <>
      <Alert isOpen={alertOpen} onClose={() => setAlertOpen(false)} />

      <nav
        className={`font-inter py-3 px-6 xl:px-16 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
        style={{
          backgroundColor: isScrolled ? '#FFF6EC' : 'transparent',
          color: '#7C634D',
        }}
      >
        <div className="w-full flex items-center justify-between relative">
          <div className="hidden xl:flex items-center gap-10 flex-1">
            <NavbarLink href={route('shop.index', { sort: 'latest' })}>NEW ARRIVAL</NavbarLink>
            <NavbarLink href={route('shop.index', { sort: 'price_desc' })}>BEST SELLER</NavbarLink>

            <div className="group relative">
              <div className="py-4">
                <NavbarLink
                  href={route('shop.index', {}) /* empty params */}
                  className="group-hover:text-[#7C634D]"
                >
                  COLLECTIONS
                </NavbarLink>
              </div>

              <div className="absolute top-full left-0 w-64 bg-[#7C634D] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                <div className="flex flex-col py-4 px-6 space-y-4">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={route('shop.index', { category: category.slug })}
                      className="text-white hover:text-[#FFF6EC] font-medium text-sm transition-colors text-left"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="xl:hidden flex-shrink-0 flex-1 flex justify-start">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="hover:opacity-70 transition-opacity p-1"
            >
              <Menu size={24} color="#7C634D" strokeWidth={2} />
            </button>
          </div>

          <div className="hidden xl:block flex-shrink-0 mx-auto">
            <Link href="/" className="block">
              <img
                src="/images/junelabel.png"
                alt="Logo Junelabel"
                className="h-9 xl:h-10 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center gap-5 xl:gap-8 flex-1 justify-end">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:opacity-70 transition-opacity"
              aria-label="Open search"
              title="Search products"
            >
              <Search size={20} color="#7C634D" strokeWidth={2} />
            </button>

            <Link href="/cart" className="hover:opacity-70 transition-opacity relative">
              <ShoppingBag size={20} color="#7C634D" strokeWidth={2} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#7C634D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <Link
              href={Cookies.get('token') ? '/dashboard' : '/login'}
              className="hover:opacity-70 transition-opacity hidden xl:block"
            >
              <User size={20} color="#7C634D" strokeWidth={2} />
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="mt-4 pt-4 border-t border-[#7C634D]/20">
            <div className="flex gap-2 justify-center">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="w-full max-w-md px-4 py-2 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-[#7C634D] rounded bg-white/90 text-[#7C634D]"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity rounded bg-[#7C634D]"
              >
                Cari
              </button>
            </div>
          </div>
        )}

        <div
          className={`fixed inset-0 z-[60] xl:hidden transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          <div
            className={`absolute top-0 left-0 h-full w-[85%] max-w-sm bg-[#FFF6EC] shadow-xl transform transition-transform duration-300 ease-out flex flex-col ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="px-6 py-4 flex items-center justify-between border-b border-[#7C634D]/10">
              <button onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70">
                <X size={20} color="#7C634D" strokeWidth={1.5} />
              </button>

              <Link href="/" className="block" onClick={() => setMobileMenuOpen(false)}>
                <img src="/images/junelabel.png" alt="June Label" className="h-6 w-auto" />
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col">
                <Link
                  href={route('shop.index', { sort: 'latest' })}
                  className="px-6 py-4 text-sm font-medium text-[#7C634D] border-b border-[#7C634D]/5 hover:bg-[#7C634D]/5 transition-colors uppercase tracking-wide"
                >
                  New Arrival
                </Link>
                <Link
                  href={route('shop.index', { sort: 'price_desc' })}
                  className="px-6 py-4 text-sm font-medium text-[#7C634D] border-b border-[#7C634D]/5 hover:bg-[#7C634D]/5 transition-colors uppercase tracking-wide"
                >
                  Best Seller
                </Link>
                <button
                  onClick={() => setCollectionsOpen(!collectionsOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-[#7C634D] border-b border-[#7C634D]/5 hover:bg-[#7C634D]/5 transition-colors uppercase tracking-wide"
                >
                  <span>Collections</span>
                  {collectionsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#F8F1EB] ${
                    collectionsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex flex-col py-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={route('shop.index', { category: category.slug })}
                        className="pl-10 pr-6 py-3 text-sm text-[#7C634D]/80 hover:text-[#7C634D] hover:bg-[#7C634D]/5 transition-colors text-left"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#7C634D]/10">
              <Link
                href={Cookies.get('token') ? '/dashboard' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="block mb-6 text-sm font-medium text-[#7C634D] hover:opacity-70 uppercase tracking-wide"
              >
                {Cookies.get('token') ? 'Dashboard' : 'Log In'}
              </Link>

              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/junelabel.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#7C634D] flex items-center justify-center text-[#FFF6EC] hover:opacity-80 transition-opacity"
                >
                  <Facebook size={16} color="#FFF6EC" fill="currentColor" strokeWidth={0} />
                </a>
                <a
                  href="mailto:junelabelco@gmail.com"
                  className="w-8 h-8 rounded-full bg-[#7C634D] flex items-center justify-center text-[#FFF6EC] hover:opacity-80 transition-opacity"
                >
                  <Mail size={16} color="#FFF6EC" strokeWidth={2} />
                </a>
                <a
                  href="https://www.instagram.com/junelabel.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#7C634D] flex items-center justify-center text-[#FFF6EC] hover:opacity-80 transition-opacity"
                >
                  <Instagram size={16} color="#FFF6EC" strokeWidth={2} />
                </a>
                <a
                  href="#"
                  onClick={handleDevFeature}
                  className="w-8 h-8 rounded-full bg-[#7C634D] flex items-center justify-center text-[#FFF6EC] hover:opacity-80 transition-opacity"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
