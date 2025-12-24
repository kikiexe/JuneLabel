import React from 'react';

export default function HeroSection() {
  return (
    <section className="w-full relative" style={{ zIndex: 0 }}>
      <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        <img 
          src="/images/hero-banner.png" 
          alt="Hero Banner"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ minWidth: '100%', minHeight: '100%' }}
        />
        
        {/* Optional: Overlay untuk text jika diperlukan nanti */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>
            <p className="text-xl">Discover Amazing Products</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}