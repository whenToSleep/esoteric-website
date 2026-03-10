import { Suspense } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { CategoryFilter } from "@/components/blog/category-filter";
import { BlogPosts } from "@/components/blog/blog-posts";
import { BlogPostsSkeleton } from "@/components/blog/blog-posts-skeleton";
import { ScrollReveal } from "@/components/animations";

// Page depends on searchParams (category filter, pagination) — must be dynamic.
// revalidate would cause ISR caching that serves stale data during filter switches.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; category?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  return {
    title: `${t("title")} — Mori Norman`,
    alternates: {
      languages: {
        ru: `/ru/blog`,
        en: `/en/blog`,
        uk: `/uk/blog`,
      },
    },
    openGraph: {
      title: `${t("title")} — Mori Norman`,
      url: `${baseUrl}/${locale}/blog`,
      siteName: "Mori Norman",
      locale,
      type: "website",
    },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { page, category: categorySlug } = await searchParams;
  setRequestLocale(locale);

  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const payload = await getPayload({ config });
  const t = await getTranslations("blog");
  const localeTyped = locale as "ru" | "en" | "uk";

  // Fetch categories for filter (fast, small dataset)
  const categoriesResult = await payload.find({
    collection: "post-categories",
    locale: localeTyped,
    sort: "order",
    limit: 50,
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const categories = categoriesResult.docs.map((cat: any) => ({
    id: String(cat.id),
    title: (cat.title as string) || "",
    slug: (cat.slug as string) || "",
  }));

  // Resolve category filter
  let categoryId: string | undefined;
  if (categorySlug) {
    const match = categoriesResult.docs.find(
      (cat) => cat.slug === categorySlug,
    );
    if (match) {
      categoryId = String(match.id);
    } else {
      notFound();
    }
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // Key forces React to unmount/remount Suspense boundary when filter or page
  // changes, showing the skeleton fallback while new data loads
  const postsKey = `${categorySlug || "all"}-${currentPage}`;

  return (
    <section className="px-4 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal direction="up">
          <h1 className="mb-8 text-center font-heading text-3xl font-semibold text-text-primary md:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-8 flex justify-center">
            <CategoryFilter
              categories={categories}
              activeCategorySlug={categorySlug}
              allLabel={t("all_categories")}
            />
          </div>
        </ScrollReveal>

        <Suspense key={postsKey} fallback={<BlogPostsSkeleton showFeatured={!categorySlug && currentPage === 1} />}>
          <BlogPosts
            locale={localeTyped}
            currentPage={currentPage}
            categorySlug={categorySlug}
            categoryId={categoryId}
          />
        </Suspense>
      </div>
    </section>
  );
}
