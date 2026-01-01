import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import DetailSection from '@/Components/Sections/Product/Detail';
import RelatedProducts from '@/Components/Sections/Product/Related';

/**
 * ProductPage Component
 * 
 * Halaman detail produk tunggal.
 * Menggabungkan komponen DetailSection dan RelatedProducts.
 * 
 * @param {Object} auth - Data user session
 * @param {Object} product - Data detail produk utama
 * @param {Array} relatedProducts - Daftar produk rekomendasi
 */
export default function ProductPage({ auth, product, relatedProducts }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#FFF6EC]">
            <Head title={`${product.name} - June Label`} />
            
            <Navbar user={auth.user} />

            <main className="flex-grow">
                <DetailSection product={product} auth={auth} />
                <RelatedProducts products={relatedProducts} />
            </main>

            <Footer />
        </div>
    );
}