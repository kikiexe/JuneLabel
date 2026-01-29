import SeoHead from '@/Components/SeoHead';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import DetailSection from '@/Components/Sections/Product/Detail';
import RelatedProducts from '@/Components/Sections/Product/Related';
import BackToTop from '@/Components/UI/BackToTop';
import { Product, PageProps } from '@/types';

interface Props extends PageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductPage({ auth, product, relatedProducts }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF6EC]">
      <SeoHead
        title={product.name}
        description={
          product.description ||
          `Beli ${product.name} di JuneLabel. Hijab ternyaman untuk aktivitas harianmu.`
        }
        image={`/storage/${product.image}`}
        url={window.location.href}
        type="product"
      />

      <Navbar />

      <main className="flex-grow">
        <DetailSection product={product} />
        <RelatedProducts products={relatedProducts} />
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
}
