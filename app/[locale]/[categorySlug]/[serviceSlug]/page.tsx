import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { Link } from "@/i18n/navigation";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { ServiceInfoBlock } from "@/components/service/service-info-block";
import { ServiceFaq } from "@/components/service/service-faq";
import { ServiceCta } from "@/components/service/service-cta";
import { generateServiceJsonLd } from "@/lib/json-ld";
import { ChevronLeft } from "lucide-react";

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

      <section className="px-4 pt-8 md:pt-12">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/${categorySlug}`}
            className="inline-flex items-center gap-1 text-sm text-astral-violet transition-colors hover:text-celestial-gold"
          >
            <ChevronLeft className="h-4 w-4" />
            {t("back_to_category", { category: categoryTitle })}
          </Link>
        </div>
      </section>

      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-heading text-3xl font-semibold text-star-white md:text-4xl lg:text-5xl">
            {service.title as string}
          </h1>

          {service.shortDescription && (
            <p className="mt-4 text-lg text-silver-mist">
              {service.shortDescription as string}
            </p>
          )}
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="mx-auto max-w-4xl">
          <ServiceInfoBlock
            price={service.price as string}
            duration={service.duration as string}
            format={service.format as string}
          />
        </div>
      </section>

      {service.fullDescription && (
        <section className="px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 font-heading text-2xl font-semibold text-star-white">
              {t("description_title")}
            </h2>
            <RichTextRenderer content={service.fullDescription} />
          </div>
        </section>
      )}

      {faqItems.length > 0 && (
        <section className="px-4 py-8 md:py-12">
          <div className="mx-auto max-w-4xl">
            <ServiceFaq items={faqItems} />
          </div>
        </section>
      )}

      <ServiceCta serviceTitle={(service.title as string) || ""} />
    </>
  );
}
