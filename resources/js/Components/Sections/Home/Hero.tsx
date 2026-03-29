import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative w-full z-0">
      <picture>
        <source media="(max-width: 767px)" srcSet="/images/Hero/hero-mobile.webp" />
        <img
          src="/images/Hero/hero.webp"
          alt="Hero Banner"
          className="w-full h-auto xl:h-screen xl:object-cover"
          fetchPriority="high"
          loading="eager"
        />
      </picture>
    </section>
  );
}
