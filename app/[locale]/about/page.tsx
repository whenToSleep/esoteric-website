import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { AboutHero } from "@/components/about/about-hero";
import { AboutTimeline } from "@/components/about/about-timeline";
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
      />

      {page.content && (
        <section className="px-4 py-8 md:py-12">
          <div className="mx-auto max-w-3xl">
            <RichTextRenderer content={page.content} />
          </div>
        </section>
      )}

      <AboutTimeline locale={locale} />

      <section
        className="px-4 py-16 md:py-20 lg:py-24"
        style={{
          background: "linear-gradient(135deg, #2D1B69 0%, #0D1137 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-semibold text-star-white md:text-3xl lg:text-4xl">
            {t("cta_title")}
          </h2>
          <a
            href="#"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-celestial-gold px-8 py-3 text-base font-semibold text-cosmic-black transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_4px_12px_rgba(212,175,55,0.3)]"
          >
            {t("cta_button")}
          </a>
        </div>
      </section>
    </>
  );
}
