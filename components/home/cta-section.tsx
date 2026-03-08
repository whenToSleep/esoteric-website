import { getTranslations } from "next-intl/server";

export async function CTASection() {
  const t = await getTranslations("home.cta");

  return (
    <section className="relative py-16 md:py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0
                      bg-linear-to-b from-cosmic-bg via-cosmic-purple/20 to-cosmic-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[500px] h-[300px] rounded-full
                      bg-cosmic-violet/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <h2 className="font-heading text-section text-cosmic-white mb-4">
          {t("title")}
        </h2>
        <p className="font-body text-body text-cosmic-white/60 mb-10">
          {t("subtitle")}
        </p>
        <a
          href="#"
          className="inline-flex items-center justify-center min-h-12
                     px-8 py-3 sm:px-10 sm:py-3.5
                     rounded-full bg-cosmic-violet/90 text-cosmic-white
                     font-body font-medium text-base transition-all duration-300
                     hover:bg-cosmic-violet
                     hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)]
                     active:scale-[0.97]"
        >
          {t("button")}
        </a>
      </div>
    </section>
  );
}
