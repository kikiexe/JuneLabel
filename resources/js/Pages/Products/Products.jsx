import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import DetailSection from '@/Components/Sections/Product/Detail';
import RelatedProducts from '@/Components/Sections/Product/Related';
import BackToTop from '@/Components/UI/BackToTop';

export default function ProductPage({ auth, product, relatedProducts }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#FFF6EC]">
            <Head title={`${product.name} - June Label`} />
            
            <Navbar user={auth.user} />

            <main className="flex-grow">
                <DetailSection product={product} />
                <RelatedProducts products={relatedProducts} />
            </main>

            <BackToTop />
            <Footer />
        </div>
    );
}