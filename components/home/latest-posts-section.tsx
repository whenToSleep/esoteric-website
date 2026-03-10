import { getTranslations } from "next-intl/server";
import { BlogCard } from "@/components/home/blog-card";
import { StaggerContainer, StaggerItem, ScrollReveal, TextReveal } from "@/components/animations";

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
    <section className="bg-void px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <ScrollReveal direction="fade">
            <span className="font-body text-sm uppercase tracking-widest text-gold-500">
              {t("label")}
            </span>
          </ScrollReveal>
          <TextReveal
            text={t("section_title")}
            type="words"
            as="h2"
            className="mt-3 font-heading text-section font-semibold text-text-primary"
            delay={0.1}
          />
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <BlogCard
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
