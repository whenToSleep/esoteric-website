import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { locales } from "@/i18n/config";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

function localizedEntry(
  path: string,
  lastModified?: string | Date,
  priority?: number,
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"],
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}/ru${path}`,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency: changeFrequency || "weekly",
    priority: priority || 0.5,
    alternates: {
      languages: Object.fromEntries(
        locales.map((loc) => [loc, `${BASE_URL}/${loc}${path}`]),
      ),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });

  const [categories, services, posts, pages] = await Promise.all([
    payload.find({
      collection: "service-categories",
      limit: 100,
      sort: "order",
    }),
    payload.find({
      collection: "services",
      limit: 500,
      where: { isActive: { equals: true } },
      depth: 1,
    }),
    payload.find({
      collection: "posts",
      limit: 500,
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
    }),
    payload.find({
      collection: "pages",
      limit: 100,
      where: { status: { equals: "published" } },
    }),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  // Home
  entries.push(localizedEntry("", undefined, 1.0, "daily"));

  // Blog list
  entries.push(localizedEntry("/blog", undefined, 0.6, "daily"));

  // Static pages (about, etc.)
  for (const page of pages.docs) {
    entries.push(
      localizedEntry(
        `/${page.slug}`,
        page.updatedAt,
        0.5,
        "monthly",
      ),
    );
  }

  // Service categories
  for (const cat of categories.docs) {
    entries.push(
      localizedEntry(
        `/${cat.slug}`,
        cat.updatedAt,
        0.8,
        "weekly",
      ),
    );
  }

  // Services
  /* eslint-disable @typescript-eslint/no-explicit-any */
  for (const svc of services.docs) {
    const catSlug = (svc.category as any)?.slug || (svc.category as any);
    if (catSlug) {
      entries.push(
        localizedEntry(
          `/${catSlug}/${svc.slug}`,
          svc.updatedAt,
          0.7,
          "weekly",
        ),
      );
    }
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // Blog posts
  for (const post of posts.docs) {
    entries.push(
      localizedEntry(
        `/blog/${post.slug}`,
        post.updatedAt,
        0.6,
        "monthly",
      ),
    );
  }

  return entries;
}
