import { getTranslations } from "next-intl/server";

export async function CTASection() {
  const t = await getTranslations("home.cta");

  return (
    <section className="relative py-16 md:py-20 lg:py-28 overflow-hidden">
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

      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <h2 className="font-heading text-section text-star-white mb-4">
          {t("title")}
        </h2>
        <p className="font-body text-body text-star-white/60 mb-10">
          {t("subtitle")}
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
          {t("button")}
        </a>
      </div>
    </section>
  );
}
