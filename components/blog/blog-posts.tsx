import { getPayload } from "payload";
import config from "@payload-config";
import { getTranslations } from "next-intl/server";
import { FeaturedBlogCard } from "@/components/blog/featured-blog-card";
import { BlogCard } from "@/components/home/blog-card";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { ScrollReveal } from "@/components/animations";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { calculateReadingTime } from "@/lib/reading-time";

interface BlogPostsProps {
  locale: "ru" | "en" | "uk";
  currentPage: number;
  categorySlug?: string;
  categoryId?: string;
}

export async function BlogPosts({
  locale,
  currentPage,
  categorySlug,
  categoryId,
}: BlogPostsProps) {
  const payload = await getPayload({ config });
  const t = await getTranslations("blog");

  const isFiltered = !!categoryId;
  const pageLimit = isFiltered ? 6 : 5;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const postsResult = await payload.find({
    collection: "posts",
    locale,
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

  const showFeatured = !isFiltered && currentPage === 1 && posts.length > 0;
  const featuredPost = showFeatured ? posts[0] : null;
  const gridPosts = showFeatured ? posts.slice(1) : posts;

  if (posts.length === 0) {
    return (
      <p className="py-20 text-center text-lg text-text-secondary">
        {t("no_posts")}
      </p>
    );
  }

  return (
    <>
      {featuredPost && (
        <ScrollReveal direction="up" duration={0.6} delay={0.15}>
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

      <div className="mt-10">
        <BlogPagination
          currentPage={currentPage}
          totalPages={postsResult.totalPages}
          categorySlug={categorySlug}
          pageLabel={pageLabel}
        />
      </div>
    </>
  );
}
