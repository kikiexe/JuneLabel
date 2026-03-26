import SeoHead from '@/Components/SeoHead';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import HeroSection from '@/Components/Sections/Home/Hero';
import BestSellerSection from '@/Components/Sections/Home/BestSeller';
import CopywritingSection from '@/Components/Sections/Home/Copywriting';
import WhyChooseUsSection from '@/Components/Sections/Home/WhyUs';
import NewArrivalSection from '@/Components/Sections/Home/NewArrival';
import { Product } from '@/types';

interface WelcomeProps {
  newArrivals: Product[];
  bestSellers: Product[];
}

export default function Welcome({ newArrivals, bestSellers }: WelcomeProps) {

  return (
    <>
      <SeoHead
        title="Toko Hijab & Fashion Muslimah"
        addBrand={false}
        description="Temukan koleksi hijab, pashmina, dan fashion muslimah ternyaman dengan warna-warna pastel yang manis. JuneLabel - Spread Kindness."
        canonicalPath="/"
      />

      <Navbar />
      <main className="pt-16 xl:pt-20">
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
