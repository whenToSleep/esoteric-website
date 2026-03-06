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
    icon: (svc.icon as string) || (category.icon as string) || "cards",
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const descriptionText = extractPlainText(category.description, 500);

  return (
    <>
      <CategoryHero
        title={(category.title as string) || ""}
        description={descriptionText}
        icon={(category.icon as string) || "cards"}
      />

      <section className="px-4 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 font-heading text-2xl font-semibold text-star-white md:text-3xl">
            {t("services_title")}
          </h2>

          {services.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((svc) => (
                <ServiceCard
                  key={svc.id}
                  title={svc.title}
                  slug={svc.slug}
                  categorySlug={categorySlug}
                  shortDescription={svc.shortDescription}
                  price={svc.price}
                  duration={svc.duration}
                  icon={svc.icon}
                />
              ))}
            </div>
          ) : (
            <p className="text-silver-mist">{t("coming_soon") || ""}</p>
          )}
        </div>
      </section>

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
          <p className="mx-auto mt-4 max-w-xl text-silver-mist">
            {t("cta_subtitle")}
          </p>
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
