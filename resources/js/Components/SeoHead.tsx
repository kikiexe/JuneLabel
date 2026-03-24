import { Head, usePage } from '@inertiajs/react';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  /**
   * Berikan path saja (misal: "/product/hijab-pashmina")
   * SeoHead akan otomatis prefix dengan APP_URL dari server.
   * Kalau tidak diisi, akan pakai URL dari Inertia shared props.
   */
  canonicalPath?: string;
  type?: string;
  /** @deprecated Gunakan canonicalPath. Prop ini diabaikan. */
  url?: string;
}

export default function SeoHead({
  title,
  description,
  image,
  canonicalPath,
  type = 'website',
}: Props) {
  const { appUrl } = usePage<{ appUrl: string }>().props as any;

  const siteName = 'JuneLabel';
  const baseUrl: string = (appUrl as string) ?? '';

  const defaultDescription =
    'JuneLabel comes with variety of cute and sweet colors as characteristic of Muslimah who always spread kindness. Comfortable daily hijab for your everyday wear.';
  const defaultImage = `${baseUrl}/images/junelabel.webp`;

  const fullTitle = title ? `${title} - ${siteName}` : siteName;

  // Canonical URL: gunakan canonicalPath jika ada, fallback ke appUrl
  const canonicalUrl = canonicalPath
    ? `${baseUrl}${canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath}`
    : baseUrl;

  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${baseUrl}${image.startsWith('/') ? image : '/' + image}`
    : defaultImage;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Canonical URL — mencegah duplicate content */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
