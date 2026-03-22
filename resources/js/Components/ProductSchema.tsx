import { usePage } from '@inertiajs/react';
import JsonLd from '@/Components/JsonLd';
import { Product } from '@/types';

interface Props {
  product: Product;
}

/**
 * ProductSchema — Inject JSON-LD Product + BreadcrumbList schema
 *
 * Menghasilkan rich snippets di Google:
 * - Harga produk
 * - Status ketersediaan (in stock / out of stock)
 * - Gambar produk
 * - Breadcrumb navigasi
 * - Brand & kategori
 */
export default function ProductSchema({ product }: Props) {
  const { appUrl } = usePage<{ appUrl: string }>().props as any;
  const baseUrl: string = (appUrl as string) ?? '';

  const productUrl = `${baseUrl}/product/${product.slug}`;
  const imageUrl = product.image
    ? `${baseUrl}/storage/${product.image}`
    : `${baseUrl}/images/junelabel.webp`;

  // Availability: in_stock jika is_active=true dan stock>0, otherwise out_of_stock
  const isAvailable =
    (product.is_active === true || product.is_active === 1) && product.stock > 0;
  const availability = isAvailable
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';

  // --- Schema 1: Product ---
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description:
      product.description ||
      `Beli ${product.name} di JuneLabel. Hijab ternyaman untuk aktivitas harianmu.`,
    image: [imageUrl],
    url: productUrl,
    sku: `JL-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'JuneLabel',
    },
    ...(product.category && {
      category: product.category.name,
    }),
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'IDR',
      price: product.price,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split('T')[0],
      availability,
      seller: {
        '@type': 'Organization',
        name: 'JuneLabel',
        url: baseUrl,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'ID',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 5,
            unitCode: 'DAY',
          },
        },
      },
    },
  };

  // --- Schema 2: BreadcrumbList ---
  const breadcrumbItems: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Collections',
      item: `${baseUrl}/collections`,
    },
  ];

  // Tambahkan kategori ke breadcrumb jika ada
  if (product.category) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: product.category.name,
      item: `${baseUrl}/collections/${product.category.slug}`,
    });
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 4,
      name: product.name,
      item: productUrl,
    });
  } else {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: product.name,
      item: productUrl,
    });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  // Inject keduanya sekaligus sebagai array
  return <JsonLd schema={[productSchema, breadcrumbSchema]} />;
}
