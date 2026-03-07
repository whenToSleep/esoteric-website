"use client";

import { useTranslations } from "next-intl";
import { AuroraBackground } from "@/components/ui/aceternity/aurora-background";
import { Sparkles } from "@/components/ui/aceternity/sparkles";
import { ScrollButton } from "@/components/home/scroll-button";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="-mt-16 lg:-mt-[72px]">
      <AuroraBackground className="min-h-screen px-4 pt-16 lg:pt-[72px]">
        <Sparkles className="z-0" particleCount={60} />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-semibold text-star-white md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-silver-mist md:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-celestial-gold px-8 py-3 text-base font-semibold text-cosmic-black transition-all duration-300 hover:brightness-110 hover:shadow-[0_4px_12px_rgba(212,175,55,0.3)] hover:-translate-y-0.5"
            >
              {t("cta_primary")}
            </a>
            <ScrollButton
              targetId="services"
              className="inline-flex items-center justify-center rounded-lg border border-celestial-gold bg-transparent px-8 py-3 text-base font-semibold text-celestial-gold transition-all duration-300 hover:bg-celestial-gold/10 hover:-translate-y-0.5"
            >
              {t("cta_secondary")}
            </ScrollButton>
          </div>
        </div>
      </AuroraBackground>
    </section>
  );
}
