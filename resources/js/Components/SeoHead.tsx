import { Head } from '@inertiajs/react';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SeoHead({ title, description, image, url, type = 'website' }: Props) {
  const siteName = 'JuneLabel';
  const defaultDescription =
    'JuneLabel comes with variety of cute and sweet colors as characteristic of Muslimah who always spread kindness. Comfortable daily hijab for your everyday wear.';
  const defaultImage = '/images/junelabel.webp';
  const fullTitle = title ? `${title} - ${siteName}` : siteName;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image || defaultImage} />
      {url && <meta property="og:url" content={url} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Head>
  );
}
