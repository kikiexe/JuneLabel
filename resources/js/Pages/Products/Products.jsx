import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import DetailSection from '@/Components/Sections/Product/Detail';

export default function ProductPage({ auth, product }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#FFF6EC]">
            <Head title={`${product.name} - June Label`} />
            
            <Navbar user={auth.user} />

            <main className="flex-grow">
                <DetailSection product={product} auth={auth} />
            </main>

            <Footer />
        </div>
    );
}