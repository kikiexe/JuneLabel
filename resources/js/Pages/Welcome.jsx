import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import HeroSection from '@/Components/Sections/Home/Hero';
import BestSellerSection from '@/Components/Sections/Home/BestSeller';
import CopywritingSection from '@/Components/Sections/Home/Copywriting';
import WhyChooseUsSection from '@/Components/Sections/Home/WhyUs';
import NewArrivalSection from '@/Components/Sections/Home/NewArrival';

export default function Welcome({ auth, newArrivals, bestSellers }) {
    return (
        <>
            <Head title="June Label - Hijab Ternyaman Unutk Kamu" />
            
            <Navbar />
            <main>
                <HeroSection />
                <BestSellerSection products={bestSellers}/>
                <CopywritingSection />
                <NewArrivalSection products={newArrivals}/>
                <WhyChooseUsSection />
            </main>
            <Footer />
        </>
    );
}