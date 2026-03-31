export default function CopywritingSection() {
  return (
    <section className="relative w-full z-0">
      <picture>
        <source media="(max-width: 767px)" srcSet="/images/Hero/copywriting-mobile.webp" />
        <img
          src="/images/Hero/copywriting.webp"
          alt="Copywriting"
          className="w-full h-auto xl:h-screen xl:object-cover"
        />
      </picture>
    </section>
  );
}
