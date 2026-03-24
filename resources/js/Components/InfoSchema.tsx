import { usePage } from '@inertiajs/react';
import JsonLd from '@/Components/JsonLd';
import { CONTACT_INFO } from '@/Constants/contact';

export function OrganizationSchema() {
  const { appUrl } = usePage<{ appUrl: string }>().props as any;
  const baseUrl: string = (appUrl as string) ?? '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'JuneLabel',
    url: baseUrl,
    logo: `${baseUrl}/images/junelabel.webp`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO?.whatsapp?.replace(/[^0-9]/g, '+'),
        contactType: 'customer service',
        availableLanguage: ['Indonesian', 'English'],
      },
    ],
    sameAs: [
      // Jika punya link sosmed, taruh di bawah nanti
      // "https://www.instagram.com/junelabel.id",
    ],
  };

  return <JsonLd schema={schema} />;
}

interface WebPageSchemaProps {
  name: string;
  description: string;
  urlPath: string;
}

export function WebPageSchema({ name, description, urlPath }: WebPageSchemaProps) {
  const { appUrl } = usePage<{ appUrl: string }>().props as any;
  const baseUrl: string = (appUrl as string) ?? '';
  const fullUrl = `${baseUrl}${urlPath}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: name,
    description: description,
    url: fullUrl,
    publisher: {
      '@type': 'Organization',
      name: 'JuneLabel',
    },
  };

  return <JsonLd schema={schema} />;
}
