import { useState } from "react";

export default function Navbar() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleNavigation = (e, path) => {
      e.preventDefault();
      console.log(`Navigasi ke: ${path}`);
    };
  
    const handleSearch = () => {
      if (searchQuery.trim()) {
        console.log(`Mencari: ${searchQuery}`);
      }
    };
  
    // Komponen Link Kustom agar kodenya lebih rapi
    const NavLink = ({ href, children }) => (
      <a 
        href={href} 
        onClick={(e) => handleNavigation(e, href)}
        className="group relative text-sm font-medium text-[#7C634D] cursor-pointer"
      >
        {children}
        {/* Garis Bawah Absolute: Tidak mengganggu kesejajaran teks */}
        <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#7C634D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
      </a>
    );
  
    return (
      <>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
            .font-inter { font-family: 'Inter', sans-serif; }
          `}
        </style>
  
        {/* Padding diubah dari py-4 menjadi py-6 agar lebih lega */}
        <nav 
          style={{ backgroundColor: '#FFF6EC', color: '#7C634D' }} 
          className="font-inter py-6 px-8 shadow-sm sticky top-0 z-50 transition-all"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              {/* Left - Menu Links */}
              {/* Gap diperlebar sedikit (gap-10) supaya makin lega */}
              <div className="hidden md:flex items-center gap-10">
                <NavLink href="/new-arrival">NEW ARRIVAL</NavLink>
                <NavLink href="/best-seller">BEST SELLER</NavLink>
                <NavLink href="/collections">COLLECTIONS</NavLink>
              </div>
  
              {/* Menu Icon untuk Mobile */}
              <div className="md:hidden">
                 <button className="hover:opacity-70 transition-opacity">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C634D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <line x1="3" y1="12" x2="21" y2="12"></line>
                     <line x1="3" y1="6" x2="21" y2="6"></line>
                     <line x1="3" y1="18" x2="21" y2="18"></line>
                   </svg>
                 </button>
              </div>
  
              {/* Center - Logo */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <a 
                  href="/" 
                  onClick={(e) => handleNavigation(e, '/')}
                  className="text-2xl font-bold hover:opacity-70 transition-opacity cursor-pointer whitespace-nowrap tracking-tight"
                  style={{ color: '#7C634D' }}
                >
                  LOGO TOKO
                </a>
              </div>
  
              {/* Right - Icons */}
              <div className="flex items-center gap-5 md:gap-8">
                {/* Search Icon */}
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Search"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C634D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
  
                {/* Cart Icon */}
                <a 
                  href="/cart" 
                  onClick={(e) => handleNavigation(e, '/cart')}
                  className="hover:opacity-70 transition-opacity relative"
                  aria-label="Cart"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C634D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </a>
  
                {/* Profile Icon */}
                <a 
                  href="/profile" 
                  onClick={(e) => handleNavigation(e, '/profile')}
                  className="hover:opacity-70 transition-opacity hidden md:block"
                  aria-label="Profile"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C634D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </a>
              </div>
            </div>
  
            {/* Search Bar */}
            {searchOpen && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#7C634D' }}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 px-4 py-2 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-opacity-50 font-inter"
                    style={{ 
                      backgroundColor: '#ffffff',
                      color: '#7C634D',
                      borderRadius: '4px'
                    }}
                  />
                  <button
                    onClick={handleSearch}
                    className="px-6 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity font-inter"
                    style={{ 
                      backgroundColor: '#7C634D',
                      borderRadius: '4px'
                    }}
                  >
                    Cari
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </>
    );
  }