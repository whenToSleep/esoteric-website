import { getPayload } from "payload";
import config from "@payload-config";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { PostNavigation } from "@/components/blog/post-navigation";
import { RelatedPosts } from "@/components/blog/related-posts";
import { calculateReadingTime } from "@/lib/reading-time";
import { generateBlogPostingJsonLd } from "@/lib/json-ld";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const posts = await payload.find({
    collection: "posts",
    where: { status: { equals: "published" } },
    limit: 200,
  });
  const locales = ["ru", "en", "uk"];
  return locales.flatMap((locale) =>
    posts.docs.map((post) => ({
      locale,
      slug: post.slug as string,
    })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    locale: locale as "ru" | "en" | "uk",
    limit: 1,
    depth: 1,
  });

  if (!result.docs.length) return {};

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const post = result.docs[0] as any;
  const featuredImageUrl = post.featuredImage?.url;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  return {
    title: `${post.title} — Mori Norman`,
    description: (post.excerpt as string) || "",
    alternates: {
      languages: {
        ru: `/ru/blog/${slug}`,
        en: `/en/blog/${slug}`,
        uk: `/uk/blog/${slug}`,
      },
    },
    openGraph: {
      title: `${post.title} — Mori Norman`,
      description: (post.excerpt as string) || "",
      url: `${baseUrl}/${locale}/blog/${slug}`,
      siteName: "Mori Norman",
      locale,
      type: "article",
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
      ...(featuredImageUrl && { images: [{ url: featuredImageUrl }] }),
    },
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const payload = await getPayload({ config });
  const t = await getTranslations("blog");
  const localeTyped = locale as "ru" | "en" | "uk";

  // Fetch current post
  const postResult = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    locale: localeTyped,
    depth: 2,
    limit: 1,
  });

  if (!postResult.docs.length) notFound();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const post = postResult.docs[0] as any;
  const readingTime =
    (post.readingTime as number) || calculateReadingTime(post.content);
  const featuredImageUrl = post.featuredImage?.url;
  const featuredImageAlt =
    (post.featuredImage?.alt as string) || (post.title as string);
  const categoryTitle = post.category?.title || undefined;
  const categoryId = post.category?.id ? String(post.category.id) : undefined;

  // Fetch prev, next, and related posts in parallel
  const [prevResult, nextResult, relatedResult] = await Promise.all([
    post.publishedAt
      ? payload.find({
          collection: "posts",
          where: {
            status: { equals: "published" },
            publishedAt: { less_than: post.publishedAt },
          },
          sort: "-publishedAt",
          limit: 1,
          locale: localeTyped,
        })
      : Promise.resolve({ docs: [] }),
    post.publishedAt
      ? payload.find({
          collection: "posts",
          where: {
            status: { equals: "published" },
            publishedAt: { greater_than: post.publishedAt },
          },
          sort: "publishedAt",
          limit: 1,
          locale: localeTyped,
        })
      : Promise.resolve({ docs: [] }),
    categoryId
      ? payload.find({
          collection: "posts",
          where: {
            status: { equals: "published" },
            category: { equals: categoryId },
            id: { not_equals: post.id },
          },
          sort: "-publishedAt",
          limit: 3,
          locale: localeTyped,
          depth: 2,
        })
      : Promise.resolve({ docs: [] }),
  ]);

  const prevPost = prevResult.docs[0]
    ? {
        title: (prevResult.docs[0].title as string) || "",
        slug: (prevResult.docs[0].slug as string) || "",
      }
    : null;

  const nextPost = nextResult.docs[0]
    ? {
        title: (nextResult.docs[0].title as string) || "",
        slug: (nextResult.docs[0].slug as string) || "",
      }
    : null;

  const relatedPosts = (relatedResult.docs as any[]).map((p) => ({
    id: String(p.id),
    title: (p.title as string) || "",
    slug: (p.slug as string) || "",
    excerpt: (p.excerpt as string) || "",
    featuredImageUrl: p.featuredImage?.url || undefined,
    featuredImageAlt: p.featuredImage?.alt || undefined,
    categoryTitle: p.category?.title || undefined,
    publishedAt: p.publishedAt || undefined,
    readingTime: (p.readingTime as number) || calculateReadingTime(p.content),
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const jsonLd = generateBlogPostingJsonLd(
    {
      title: (post.title as string) || "",
      excerpt: (post.excerpt as string) || "",
      slug: (post.slug as string) || "",
      publishedAt: post.publishedAt || undefined,
      featuredImageUrl,
      readingTime,
    },
    locale,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="px-4 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-prose">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1 text-sm text-silver-mist transition-colors hover:text-celestial-gold"
          >
            <ChevronLeft className="h-4 w-4" />
            {t("back_to_blog")}
          </Link>

          {/* Featured image */}
          {featuredImageUrl && (
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={featuredImageUrl}
                alt={featuredImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 65ch"
                priority
              />
            </div>
          )}

          {/* Meta */}
          <div className="mb-4 flex items-center gap-3">
            {categoryTitle && (
              <span className="rounded-md bg-astral-violet/10 px-3 py-1 text-xs font-medium text-astral-violet">
                {categoryTitle}
              </span>
            )}
            {post.publishedAt && (
              <time className="text-sm text-silver-mist">
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            )}
            <span className="text-sm text-silver-mist">
              {readingTime} {t("min_read")}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-8 font-heading text-3xl font-bold text-star-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Content */}
          <RichTextRenderer content={post.content} />

          {/* Prev/Next navigation */}
          <div className="mt-12">
            <PostNavigation
              prevPost={prevPost}
              nextPost={nextPost}
              prevLabel={t("prev_post")}
              nextLabel={t("next_post")}
            />
          </div>
        </div>

        {/* Related posts — wider container */}
        {relatedPosts.length > 0 && (
          <div className="mx-auto mt-16 max-w-6xl">
            <RelatedPosts
              posts={relatedPosts}
              title={t("related_posts")}
              readMoreLabel={t("read_more")}
              minReadLabel={t("min_read")}
            />
          </div>
        )}
      </article>
    </>
  );
}
