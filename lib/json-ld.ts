const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export function generatePersonJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mori Norman",
    url: `${BASE_URL}/${locale}/about`,
    jobTitle: "Esoteric Practitioner",
    sameAs: [],
  };
}

export function generateServiceJsonLd(
  service: {
    title: string;
    shortDescription?: string;
    price?: string;
    slug: string;
  },
  categorySlug: string,
  locale: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: service.title,
    description: service.shortDescription || "",
    url: `${BASE_URL}/${locale}/${categorySlug}/${service.slug}`,
    provider: {
      "@type": "Person",
      name: "Mori Norman",
    },
    areaServed: "UA",
    ...(service.price && {
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "UAH",
      },
    }),
  };
}
