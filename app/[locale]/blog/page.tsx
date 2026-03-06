import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: `${t("title")} — Mori Norman`,
    alternates: {
      languages: {
        ru: `/ru/blog`,
        en: `/en/blog`,
        uk: `/uk/blog`,
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  return (
    <section className="px-4 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-heading text-3xl font-bold text-star-white md:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-silver-mist">{t("coming_soon")}</p>
      </div>
    </section>
  );
}
