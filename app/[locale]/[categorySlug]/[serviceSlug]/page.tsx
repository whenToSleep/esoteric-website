import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { Link } from "@/i18n/navigation";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { ServiceInfoBlock } from "@/components/service/service-info-block";
import { ServiceFaq } from "@/components/service/service-faq";
import { generateServiceJsonLd } from "@/lib/json-ld";

type Props = {
  params: Promise<{ locale: string; categorySlug: string; serviceSlug: string }>;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const services = await payload.find({
    collection: "services",
    limit: 200,
    depth: 1,
    where: { isActive: { equals: true } },
  });
  const locales = ["ru", "en", "uk"];

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return locales.flatMap((locale) =>
    services.docs
      .filter((svc: any) => svc.category?.slug)
      .map((svc: any) => ({
        locale,
        categorySlug: svc.category.slug as string,
        serviceSlug: svc.slug as string,
      })),
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export async function generateMetadata({ params }: Props) {
  const { locale, serviceSlug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "services",
    where: { slug: { equals: serviceSlug } },
    locale: locale as "ru" | "en" | "uk",
    limit: 1,
    depth: 1,
  });

  if (!result.docs.length) return {};

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const service = result.docs[0] as any;
  const categorySlug = service.category?.slug || "";
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  return {
    title: `${service.title} — Mori Norman`,
    description: (service.shortDescription as string) || "",
    alternates: {
      languages: {
        ru: `/ru/${categorySlug}/${serviceSlug}`,
        en: `/en/${categorySlug}/${serviceSlug}`,
        uk: `/uk/${categorySlug}/${serviceSlug}`,
      },
    },
    openGraph: {
      title: `${service.title} — Mori Norman`,
      description: (service.shortDescription as string) || "",
      url: `${baseUrl}/${locale}/${categorySlug}/${serviceSlug}`,
      siteName: "Mori Norman",
      locale,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, categorySlug, serviceSlug } = await params;
  setRequestLocale(locale);

  const payload = await getPayload({ config });
  const t = await getTranslations("service");
  const tNav = await getTranslations("nav");

  const serviceResult = await payload.find({
    collection: "services",
    where: { slug: { equals: serviceSlug } },
    locale: locale as "ru" | "en" | "uk",
    depth: 2,
    limit: 1,
  });

  if (!serviceResult.docs.length) notFound();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const service = serviceResult.docs[0] as any;
  const categoryTitle = service.category?.title || "";
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const faqItems = (service.faq || [])
    .filter(
      (item: { question?: string; answer?: string }) =>
        item.question && item.answer,
    )
    .map((item: { question: string; answer: string }) => ({
      question: item.question,
      answer: item.answer,
    }));

  const jsonLd = generateServiceJsonLd(
    {
      title: (service.title as string) || "",
      shortDescription: (service.shortDescription as string) || "",
      price: (service.price as string) || undefined,
      slug: (service.slug as string) || "",
    },
    categorySlug,
    locale,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-cosmic-bg py-16 md:py-24 lg:py-32">
        <div className="pointer-events-none absolute right-1/4 top-0 h-[350px] w-[350px] rounded-full bg-cosmic-purple/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 text-small text-cosmic-white/40">
            <Link
              href="/"
              className="transition-colors hover:text-cosmic-white/70"
            >
              {tNav("home")}
            </Link>
            <span className="mx-2">&rarr;</span>
            <Link
              href={`/${categorySlug}`}
              className="transition-colors hover:text-cosmic-white/70"
            >
              {categoryTitle}
            </Link>
            <span className="mx-2">&rarr;</span>
            <span className="text-cosmic-white/70">
              {service.title as string}
            </span>
          </nav>

          {/* Title */}
          <h1 className="font-heading text-hero text-cosmic-white">
            {service.title as string}
          </h1>

          {/* Short description */}
          {service.shortDescription && (
            <p className="mt-4 max-w-2xl font-body text-body text-cosmic-white/70">
              {service.shortDescription as string}
            </p>
          )}

          {/* Info cards */}
          <div className="mt-10">
            <ServiceInfoBlock
              price={service.price as string}
              duration={service.duration as string}
              format={service.format as string}
            />
          </div>
        </div>
      </section>

      {/* ===== Full Description ===== */}
      {service.fullDescription && (
        <>
          {/* Gradient divider: cosmic-bg -> surface-1 */}
          <div
            className="h-16 md:h-20"
            style={{
              background: "linear-gradient(to bottom, #0A0A0F, #0E0E14)",
            }}
          />

          <section className="bg-surface-1 py-16 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <h2 className="mb-8 font-heading text-section text-cosmic-gold">
                {t("description_title")}
              </h2>
              <RichTextRenderer content={service.fullDescription} />
            </div>
          </section>
        </>
      )}

      {/* ===== FAQ ===== */}
      {faqItems.length > 0 && (
        <>
          {/* Celestial divider */}
          <div className="flex justify-center bg-cosmic-bg py-8 md:py-10">
            <div className="h-px w-20 bg-linear-to-r from-transparent via-cosmic-gold/50 to-transparent" />
          </div>

          <section className="bg-cosmic-bg py-16 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <ServiceFaq items={faqItems} />
            </div>
          </section>
        </>
      )}

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden py-16 md:py-20 lg:py-28">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0A0A0F, rgba(45,27,105,0.2) 50%, #0A0A0F)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[500px] h-[300px] rounded-full blur-[100px] pointer-events-none
                      bg-astral-violet/15"
        />

        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-heading text-section text-star-white mb-4">
            {t("book_title", { title: service.title as string })}
          </h2>
          <p className="font-body text-body text-star-white/60 mb-10">
            {t("book_subtitle")}
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center min-h-12
                       px-10 py-3.5 rounded-full
                       bg-astral-violet text-star-white
                       font-body font-medium text-base
                       transition-all duration-300
                       hover:bg-astral-violet/80
                       hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)]
                       active:scale-[0.97]"
          >
            {t("book_button")}
          </a>
        </div>
      </section>
    </>
  );
}
