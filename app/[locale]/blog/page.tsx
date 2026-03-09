import { getPayload } from "payload";
import config from "@payload-config";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { CategoryFilter } from "@/components/blog/category-filter";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { FeaturedBlogCard } from "@/components/blog/featured-blog-card";
import { BlogCard } from "@/components/home/blog-card";
import { ScrollReveal } from "@/components/animations";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { calculateReadingTime } from "@/lib/reading-time";

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

  // Fetch categories for filter
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

  // Pagination limits:
  // - "All" filter (no category): limit 5 → page 1 shows 1 featured + 4 grid, page 2+ shows 5 grid
  // - Category filter: limit 6 → all posts in uniform grid, no featured card
  const isFiltered = !!categoryId;
  const pageLimit = isFiltered ? 6 : 5;

  // Fetch posts
  const postsResult = await payload.find({
    collection: "posts",
    locale: localeTyped,
    where: {
      status: { equals: "published" },
      ...(categoryId && { category: { equals: categoryId } }),
    },
    sort: "-publishedAt",
    page: currentPage,
    limit: pageLimit,
    depth: 2,
  });

  const posts = postsResult.docs.map((post: any) => ({
    id: String(post.id),
    title: (post.title as string) || "",
    slug: (post.slug as string) || "",
    excerpt: (post.excerpt as string) || "",
    featuredImageUrl: post.featuredImage?.url || undefined,
    featuredImageAlt: post.featuredImage?.alt || undefined,
    categoryTitle: post.category?.title || undefined,
    publishedAt: post.publishedAt || undefined,
    readingTime:
      (post.readingTime as number) || calculateReadingTime(post.content),
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const pageLabel = t("page_of", {
    current: String(currentPage),
    total: String(postsResult.totalPages),
  });

  // Featured card only on page 1 when showing all posts (no category filter)
  const showFeatured = !isFiltered && currentPage === 1 && posts.length > 0;
  const featuredPost = showFeatured ? posts[0] : null;
  const gridPosts = showFeatured ? posts.slice(1) : posts;

  // Key forces React to re-mount the posts section (and animation components
  // inside it) when the filter or page changes, resetting viewport: once state
  const postsKey = `${categorySlug || "all"}-${currentPage}`;

  // Debug: uncomment to trace filtering in server logs
  // console.log("[blog]", { categorySlug, categoryId, isFiltered, postsKey, total: posts.length, featured: !!featuredPost, grid: gridPosts.length });

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

        {posts.length === 0 ? (
          <p className="py-20 text-center text-lg text-text-secondary">
            {t("no_posts")}
          </p>
        ) : (
          <div key={postsKey}>
            {featuredPost && (
              <ScrollReveal delay={0.15}>
                <div className="mb-8">
                  <FeaturedBlogCard
                    {...featuredPost}
                    readMoreLabel={t("read_more")}
                    minReadLabel={t("min_read")}
                  />
                </div>
              </ScrollReveal>
            )}

            {gridPosts.length > 0 && (
              <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <StaggerItem key={post.id}>
                    <BlogCard
                      {...post}
                      readMoreLabel={t("read_more")}
                      minReadLabel={t("min_read")}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        )}

        <div className="mt-10">
          <BlogPagination
            currentPage={currentPage}
            totalPages={postsResult.totalPages}
            categorySlug={categorySlug}
            pageLabel={pageLabel}
          />
        </div>
      </div>
    </section>
  );
}
