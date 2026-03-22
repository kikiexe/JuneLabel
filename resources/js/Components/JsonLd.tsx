import { Head } from '@inertiajs/react';

interface Props {
  /** JSON-LD schema object — bisa Product, BreadcrumbList, Organization, dll */
  schema: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * JsonLd — Inject JSON-LD structured data ke <head>
 *
 * Penggunaan:
 *   <JsonLd schema={{ "@context": "https://schema.org", "@type": "Product", ... }} />
 *
 * Mendukung single schema atau array of schemas.
 */
export default function JsonLd({ schema }: Props) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
      />
    </Head>
  );
}
