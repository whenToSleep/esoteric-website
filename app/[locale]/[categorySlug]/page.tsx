import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { CategoryHero } from "@/components/category/category-hero";
import { ServiceCard } from "@/components/category/service-card";
import { extractPlainText } from "@/lib/rich-text-utils";

type Props = {
  params: Promise<{ locale: string; categorySlug: string }>;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const categories = await payload.find({
    collection: "service-categories",
    limit: 100,
  });
  const locales = ["ru", "en", "uk"];
  return locales.flatMap((locale) =>
    categories.docs.map((cat) => ({
      locale,
      categorySlug: cat.slug as string,
    })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, categorySlug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "service-categories",
    where: { slug: { equals: categorySlug } },
    locale: locale as "ru" | "en" | "uk",
    limit: 1,
  });

  if (!result.docs.length) return {};

  const category = result.docs[0];
  const description = (category.shortDescription as string) || "";

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  return {
    title: `${category.title} — Mori Norman`,
    description,
    alternates: {
      languages: {
        ru: `/ru/${categorySlug}`,
        en: `/en/${categorySlug}`,
        uk: `/uk/${categorySlug}`,
      },
    },
    openGraph: {
      title: `${category.title} — Mori Norman`,
      description,
      url: `${baseUrl}/${locale}/${categorySlug}`,
      siteName: "Mori Norman",
      locale,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, categorySlug } = await params;
  setRequestLocale(locale);

  const payload = await getPayload({ config });
  const t = await getTranslations("category");

  const categoryResult = await payload.find({
    collection: "service-categories",
    where: { slug: { equals: categorySlug } },
    locale: locale as "ru" | "en" | "uk",
    depth: 2,
    limit: 1,
  });

  if (!categoryResult.docs.length) notFound();

  const category = categoryResult.docs[0];

  const servicesResult = await payload.find({
    collection: "services",
    where: {
      category: { equals: category.id },
      isActive: { equals: true },
    },
    locale: locale as "ru" | "en" | "uk",
    sort: "order",
    limit: 50,
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const services = servicesResult.docs.map((svc: any) => ({
    id: String(svc.id),
    title: (svc.title as string) || "",
    slug: (svc.slug as string) || "",
    shortDescription: (svc.shortDescription as string) || "",
    price: (svc.price as string) || undefined,
    duration: (svc.duration as string) || undefined,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const descriptionText = extractPlainText(category.description, 500);

  return (
    <>
      <CategoryHero
        title={(category.title as string) || ""}
        description={descriptionText}
        locale={locale}
        heroImage={
          category.heroImage &&
          typeof category.heroImage === "object" &&
          "url" in category.heroImage
            ? {
                url: category.heroImage.url as string,
                alt: (category.heroImage.alt as string) || undefined,
              }
            : null
        }
      />

      {/* Gradient divider: hero → services */}
      <div
        className="h-16 md:h-20"
        style={{ background: "linear-gradient(to bottom, #0A0A0F, #0E0E14)" }}
      />

      {/* Services grid */}
      <section className="bg-surface-1 py-16 md:py-20 lg:py-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-section text-cosmic-gold md:mb-12 lg:mb-16">
            {t("services_title")}
          </h2>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
              {services.map((svc) => (
                <ServiceCard
                  key={svc.id}
                  title={svc.title}
                  slug={svc.slug}
                  categorySlug={categorySlug}
                  shortDescription={svc.shortDescription}
                  price={svc.price}
                  duration={svc.duration}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-cosmic-white/60">
              {t("coming_soon") || ""}
            </p>
          )}
        </div>
      </section>

      {/* Celestial divider: services → CTA */}
      <div className="flex justify-center bg-surface-1 py-8 md:py-10">
        <div className="h-px w-20 bg-linear-to-r from-transparent via-cosmic-gold/50 to-transparent" />
      </div>

      {/* CTA section */}
      <section className="relative overflow-hidden py-16 md:py-20 lg:py-28">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-bg via-cosmic-purple/20 to-cosmic-bg" />
        {/* Decorative glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cosmic-violet/10 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-heading text-section text-cosmic-white mb-4">
            {t("cta_title")}
          </h2>
          <p className="font-body text-body text-cosmic-white/60 mb-10">
            {t("cta_subtitle")}
          </p>
          <a
            href="#"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-cosmic-violet/90 px-8 py-3 font-body font-medium text-base text-cosmic-white transition-all duration-300 hover:bg-cosmic-violet hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] active:scale-[0.97] sm:px-10 sm:py-3.5"
          >
            {t("cta_button")}
          </a>
        </div>
      </section>
    </>
  );
}
