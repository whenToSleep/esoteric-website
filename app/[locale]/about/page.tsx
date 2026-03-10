import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { AboutHero } from "@/components/about/about-hero";
import { AboutBioSections } from "@/components/about/about-bio-sections";
import { AboutTimeline } from "@/components/about/about-timeline";
import { CTASection } from "@/components/home/cta-section";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { generatePersonJsonLd } from "@/lib/json-ld";
import { extractPlainText } from "@/lib/rich-text-utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "pages",
    where: { slug: { equals: "about" } },
    locale: locale as "ru" | "en" | "uk",
    limit: 1,
  });

  const page = result.docs[0];
  const description = page ? extractPlainText(page.content, 160) : "";

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  return {
    title: `${page?.title || "About"} — Mori Norman`,
    description,
    alternates: {
      languages: {
        ru: "/ru/about",
        en: "/en/about",
        uk: "/uk/about",
      },
    },
    openGraph: {
      title: `${page?.title || "About"} — Mori Norman`,
      description,
      url: `${baseUrl}/${locale}/about`,
      siteName: "Mori Norman",
      locale,
      type: "profile",
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const payload = await getPayload({ config });
  const t = await getTranslations("about");

  const pageResult = await payload.find({
    collection: "pages",
    where: { slug: { equals: "about" } },
    locale: locale as "ru" | "en" | "uk",
    depth: 2,
    limit: 1,
  });

  if (!pageResult.docs.length) notFound();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const page = pageResult.docs[0] as any;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const jsonLd = generatePersonJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AboutHero
        title={(page.title as string) || t("title")}
        imageUrl={page.featuredImage?.url || undefined}
        imageAlt={page.featuredImage?.alt || undefined}
      >
        {page.content && <RichTextRenderer content={page.content} />}
      </AboutHero>

      <AboutBioSections />

      <AboutTimeline locale={locale} items={page.timeline} />

      <CTASection namespace="about.cta" />
    </>
  );
}
