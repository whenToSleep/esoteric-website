import { getTranslations } from "next-intl/server";
import { BlogCard } from "@/components/home/blog-card";

interface Post {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  categoryTitle?: string;
  publishedAt?: string;
  readingTime?: number;
}

export async function LatestPostsSection({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  const t = await getTranslations("home.blog");

  return (
    <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-30">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center font-heading text-2xl font-semibold text-celestial-gold md:mb-12 md:text-3xl lg:mb-16 lg:text-4xl">
          {t("section_title")}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              featuredImageUrl={post.featuredImageUrl}
              featuredImageAlt={post.featuredImageAlt}
              categoryTitle={post.categoryTitle}
              publishedAt={post.publishedAt}
              readingTime={post.readingTime}
              readMoreLabel={t("read_more")}
              minReadLabel={t("min_read")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
