import SeoHead from '@/Components/SeoHead';
import ProductSchema from '@/Components/ProductSchema';
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
        canonicalPath={`/product/${product.slug}`}
        type="product"
      />
      <ProductSchema product={product} />

      <Navbar />

      <main className="flex-grow pt-16 xl:pt-20">
        <DetailSection product={product} />
        <RelatedProducts products={relatedProducts} />
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
}
