import React, { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleNavigation = (e, path) => {
    e.preventDefault();
    window.location.href = path;
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Terima kasih! Email ${email} telah didaftarkan.`);
    setEmail('');
  };

  return (
    <footer style={{ backgroundColor: '#d9d9d9', color: '#525252' }} className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Layanan Konsumen */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#525252' }}>
              Layanan Konsumen
            </h3>
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#525252' }}>
                  June Label
                </p>
                <p className="text-sm" style={{ color: '#525252' }}>
                  Customer Service: +62 812-3456-7890
                </p>
                <p className="text-sm" style={{ color: '#525252' }}>
                  Email: junelabelco@gmail.com
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#525252' }}>
                  Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga
                </p>
                <p className="text-sm" style={{ color: '#525252' }}>
                  Kementerian Perdagangan RI
                </p>
                <p className="text-sm" style={{ color: '#525252' }}>
                  WhatsApp: +62 853 1111 1010
                </p>
              </div>
            </div>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#525252' }}>
              Informasi
            </h3>
            <ul className="space-y-2 mb-6">
              <li>
                <a 
                  href="/syarat-ketentuan" 
                  onClick={(e) => handleNavigation(e, '/syarat-ketentuan')}
                  className="text-sm hover:opacity-70 transition-opacity cursor-pointer"
                  style={{ color: '#525252' }}
                >
                  Syarat dan Ketentuan
                </a>
              </li>
              <li>
                <a 
                  href="/tentang" 
                  onClick={(e) => handleNavigation(e, '/tentang')}
                  className="text-sm hover:opacity-70 transition-opacity cursor-pointer"
                  style={{ color: '#525252' }}
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a 
                  href="/privacy-policy" 
                  onClick={(e) => handleNavigation(e, '/privacy-policy')}
                  className="text-sm hover:opacity-70 transition-opacity cursor-pointer"
                  style={{ color: '#525252' }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/lokasi" 
                  onClick={(e) => handleNavigation(e, '/lokasi')}
                  className="text-sm hover:opacity-70 transition-opacity cursor-pointer"
                  style={{ color: '#525252' }}
                >
                  Lokasi Toko
                </a>
              </li>
            </ul>
            
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a 
                href="https://www.tiktok.com/@namatoko" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="TikTok"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#525252">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/namatoko" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#525252">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/namatoko" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#525252">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#525252' }}>
              Newsletter
            </h3>
            <p className="text-sm mb-4" style={{ color: '#525252' }}>
              Dapatkan update terbaru dan penawaran spesial langsung ke email Anda.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                required
                className="w-full px-4 py-2 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ 
                  backgroundColor: '#ffffff',
                  color: '#525252',
                  borderRadius: '4px'
                }}
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ 
                  backgroundColor: '#525252',
                  borderRadius: '4px'
                }}
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6" style={{ borderColor: '#525252' }}>
          <div className="text-center">
            <p className="text-sm" style={{ color: '#525252' }}>
              &copy; {currentYear} - JUNELABEL | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}