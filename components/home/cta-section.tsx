import { getTranslations } from "next-intl/server";

export async function CTASection() {
  const t = await getTranslations("home.cta");

  return (
    <section
      className="px-4 py-20 sm:px-6 md:py-25 lg:px-8 lg:py-40"
      style={{
        background:
          "linear-gradient(135deg, #2D1B69 0%, #0D1137 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-2xl font-semibold gold-shimmer md:text-3xl lg:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-silver-mist">
          {t("subtitle")}
        </p>
        <a
          href="#"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-celestial-gold px-8 py-3 text-base font-semibold text-cosmic-black transition-all duration-300 hover:brightness-110 hover:shadow-[0_4px_12px_rgba(212,175,55,0.3)] hover:-translate-y-0.5"
        >
          {t("button")}
        </a>
      </div>
    </section>
  );
}
