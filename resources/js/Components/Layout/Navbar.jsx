import { useState, useEffect } from "react";
import { Link } from '@inertiajs/react';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`Mencari: ${searchQuery}`);
    }
  };

  const NavLink = ({ href, children }) => (
    <Link 
      href={href} 
      className="group relative text-sm font-medium text-[#7C634D] cursor-pointer"
    >
      {children}
      <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#7C634D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
    </Link>
  );

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
          .font-inter { font-family: 'Inter', sans-serif; }
        `}
      </style>

      <nav 
        className={`font-inter py-6 px-6 md:px-16 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
        style={{ 
          backgroundColor: isScrolled ? '#FFF6EC' : 'transparent', 
          color: '#7C634D' 
        }}
      >
        <div className="w-full flex items-center justify-between relative">
            {/* Left - Menu Links */}
            <div className="hidden md:flex items-center gap-10 flex-1">
              <NavLink href="/new-arrival">NEW ARRIVAL</NavLink>
              <NavLink href="/best-seller">BEST SELLER</NavLink>
              <NavLink href="/collections">COLLECTIONS</NavLink>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden flex-shrink-0">
               <button className="hover:opacity-70 transition-opacity">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C634D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <line x1="3" y1="12" x2="21" y2="12"></line>
                   <line x1="3" y1="6" x2="21" y2="6"></line>
                   <line x1="3" y1="18" x2="21" y2="18"></line>
                 </svg>
               </button>
            </div>

            {/* Center - Logo */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <Link href="/" className="block hover:opacity-70 transition-opacity">
                <img 
                  src="/images/junelabel.png" 
                  alt="Logo Junelabel"
                  className="h-10 md:h-14 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Right - Icons */}
            <div className="flex items-center gap-5 md:gap-8 flex-1 justify-end">
              <button onClick={() => setSearchOpen(!searchOpen)} className="hover:opacity-70 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C634D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>

              <Link href="/cart" className="hover:opacity-70 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C634D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </Link>

              <Link href={route('login')} className="hover:opacity-70 transition-opacity hidden md:block">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C634D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
            </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
            <div className="mt-4 pt-4 border-t border-[#7C634D]/20">
              <div className="flex gap-2 justify-center">
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
      </nav>
    </>
  );
}