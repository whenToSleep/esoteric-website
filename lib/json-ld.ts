const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export function generateWebSiteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mori Norman",
    url: `${BASE_URL}/${locale}`,
    inLanguage: locale,
    publisher: {
      "@type": "Person",
      name: "Mori Norman",
    },
  };
}

export function generateBlogPostingJsonLd(
  post: {
    title: string;
    excerpt?: string;
    slug: string;
    publishedAt?: string;
    featuredImageUrl?: string;
    readingTime?: number;
  },
  locale: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    url: `${BASE_URL}/${locale}/blog/${post.slug}`,
    datePublished: post.publishedAt || undefined,
    image: post.featuredImageUrl || undefined,
    author: {
      "@type": "Person",
      name: "Mori Norman",
    },
    publisher: {
      "@type": "Person",
      name: "Mori Norman",
    },
    inLanguage: locale,
    ...(post.readingTime && {
      timeRequired: `PT${post.readingTime}M`,
    }),
  };
}

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
