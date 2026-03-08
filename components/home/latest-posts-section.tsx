import { getTranslations } from "next-intl/server";
import { BlogCard } from "@/components/home/blog-card";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/animations";
import { StaggerContainer, StaggerItem } from "@/components/animations";

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
  const [featured, ...rest] = posts;

  return (
    <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-30">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal direction="up">
          <h2 className="mb-8 text-center font-heading text-section text-cosmic-gold md:mb-12 lg:mb-16">
            {t("section_title")}
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Featured post */}
          <StaggerItem className="md:col-span-2">
            <Link
              href={`/blog/${featured.slug}`}
              className="group overflow-hidden rounded-2xl border border-cosmic-purple/15 bg-cosmic-card hover:border-cosmic-violet/40 transition-colors duration-300 block"
            >
              <div className="aspect-video lg:aspect-[21/9] relative overflow-hidden">
                {featured.featuredImageUrl ? (
                  <Image
                    src={featured.featuredImageUrl}
                    alt={featured.featuredImageAlt || featured.title}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                ) : (
                  <div className="h-full w-full bg-linear-to-br from-cosmic-card to-cosmic-purple" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-cosmic-bg/90 via-cosmic-bg/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 lg:p-8">
                  <span className="text-small font-body text-cosmic-gold uppercase tracking-wider">
                    {featured.categoryTitle || "Featured"}
                  </span>
                  <h3 className="font-heading text-card-title text-cosmic-white mt-2">
                    {featured.title}
                  </h3>
                </div>
              </div>
            </Link>
          </StaggerItem>

          {/* Regular posts */}
          {rest.map((post) => (
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
