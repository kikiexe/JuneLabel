import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative w-full z-0">
      <img 
        src="/images/Hero/hero-banner.png" 
        alt="Hero Banner"
        className="w-full h-auto xl:h-screen xl:object-cover"
      />
    </section>
  );
}