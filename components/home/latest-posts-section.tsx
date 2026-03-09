import { getTranslations } from "next-intl/server";
import { BlogCard } from "@/components/home/blog-card";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { ScrollReveal } from "@/components/animations";

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
        <ScrollReveal direction="up">
          <div className="mb-8 text-center md:mb-12 lg:mb-16">
            <span className="font-body text-sm uppercase tracking-widest text-gold-500">
              {t("label")}
            </span>
            <h2 className="mt-3 font-heading text-section font-semibold text-text-primary">
              {t("section_title")}
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {posts.map((post, index) => (
            <StaggerItem
              key={post.id}
              className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
            >
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
                featured={index === 0}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
