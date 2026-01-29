import SeoHead from '@/Components/SeoHead';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import HeroSection from '@/Components/Sections/Home/Hero';
import BestSellerSection from '@/Components/Sections/Home/BestSeller';
import CopywritingSection from '@/Components/Sections/Home/Copywriting';
import WhyChooseUsSection from '@/Components/Sections/Home/WhyUs';
import NewArrivalSection from '@/Components/Sections/Home/NewArrival';

export default function Welcome({ newArrivals, bestSellers }) {
  return (
    <>
      <SeoHead
        title="Toko Hijab & Fashion Muslimah"
        description="Temukan koleksi hijab, pashmina, dan fashion muslimah ternyaman dengan warna-warna pastel yang manis. JuneLabel - Spread Kindness."
        url={window.location.origin}
      />

      <Navbar />
      <main>
        <HeroSection />
        <BestSellerSection products={bestSellers} />
        <CopywritingSection />
        <NewArrivalSection products={newArrivals} />
        <WhyChooseUsSection />
      </main>
      <Footer />
    </>
  );
}
