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
      >
        {page.content && <RichTextRenderer content={page.content} />}
      </AboutHero>

      <AboutTimeline locale={locale} items={page.timeline} />

      <section className="relative overflow-hidden px-4 py-16 md:py-20 lg:py-30">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0A0A0F, rgba(45,27,105,0.2) 50%, #0A0A0F)",
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-astral-violet/15 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 h-px w-24 bg-linear-to-r from-transparent via-celestial-gold/50 to-transparent" />
          <h2 className="font-heading text-section text-star-white">
            {t("cta_title")}
          </h2>
          <p className="mt-4 font-body text-body text-star-white/60">
            {t("cta_subtitle")}
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center justify-center min-h-12 px-10 py-3.5 rounded-full bg-astral-violet text-star-white font-body font-medium text-base transition-all duration-300 hover:bg-astral-violet/80 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] active:scale-[0.97]"
          >
            {t("cta_button")}
          </a>
        </div>
      </section>
    </>
  );
}
