import { setRequestLocale } from "next-intl/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { HeroSection } from "@/components/home/hero-section";
import { ServiceCategoriesSection } from "@/components/home/service-categories-section";
import { AboutBriefSection } from "@/components/home/about-brief-section";
import { LatestPostsSection } from "@/components/home/latest-posts-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";
import { extractPlainText } from "@/lib/rich-text-utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const payload = await getPayload({ config });

  const [categoriesResult, postsResult, testimonialsResult, aboutResult] =
    await Promise.all([
      payload.find({
        collection: "service-categories",
        locale: locale as "ru" | "en" | "uk",
        sort: "order",
        limit: 10,
      }),
      payload.find({
        collection: "posts",
        locale: locale as "ru" | "en" | "uk",
        where: { status: { equals: "published" } },
        sort: "-publishedAt",
        limit: 3,
        depth: 2,
      }),
      payload.find({
        collection: "testimonials",
        locale: locale as "ru" | "en" | "uk",
        where: { isActive: { equals: true } },
        sort: "order",
        limit: 20,
      }),
      payload.find({
        collection: "pages",
        locale: locale as "ru" | "en" | "uk",
        where: { slug: { equals: "about" } },
        depth: 2,
        limit: 1,
      }),
    ]);

  const categories = categoriesResult.docs.map((cat) => ({
    id: String(cat.id),
    title: (cat.title as string) || "",
    slug: (cat.slug as string) || "",
    shortDescription: (cat.shortDescription as string) || "",
    icon: (cat.icon as string) || "cards",
  }));

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const posts = postsResult.docs.map((post: any) => ({
    id: String(post.id),
    title: (post.title as string) || "",
    slug: (post.slug as string) || "",
    excerpt: (post.excerpt as string) || "",
    featuredImageUrl: post.featuredImage?.url || null,
    featuredImageAlt: post.featuredImage?.alt || null,
    categoryTitle: post.category?.title || null,
    publishedAt: post.publishedAt || null,
    readingTime: post.readingTime || null,
  }));

  const testimonials = testimonialsResult.docs.map((t: any) => ({
    clientName: (t.clientName as string) || "",
    text: (t.text as string) || "",
  }));

  const aboutPage = aboutResult.docs[0] as any;
  const aboutData = aboutPage
    ? {
        title: (aboutPage.title as string) || undefined,
        content: extractPlainText(aboutPage.content, 300) || undefined,
        imageUrl: aboutPage.featuredImage?.url || undefined,
        imageAlt: aboutPage.featuredImage?.alt || undefined,
      }
    : {};
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <>
      <HeroSection />
      <ServiceCategoriesSection categories={categories} />
      <AboutBriefSection {...aboutData} />
      <LatestPostsSection posts={posts} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  );
}
