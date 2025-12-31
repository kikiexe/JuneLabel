import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import HeroSection from '@/Components/Sections/Home/Hero';
import BestSellerSection from '@/Components/Sections/Home/BestSeller';
import CopywritingSection from '@/Components/Sections/Home/Copywriting';
import WhyChooseUsSection from '@/Components/Sections/Home/WhyUs';
import NewArrivalSection from '@/Components/Sections/Home/NewArrival';

export default function Welcome({ auth, products}) {
    return (
        <>
            <Head title="June Label - Hijab Ternyaman Unutk Kamu" />
            
            <Navbar />
            <main>
                <HeroSection />
                <BestSellerSection products={products}/>
                <CopywritingSection />
                <NewArrivalSection products={products}/>
                <WhyChooseUsSection />
            </main>
            <Footer />
        </>
    );
}