"use client";

import { useTranslations } from "next-intl";
import { AuroraBackground } from "@/components/ui/aceternity/aurora-background";
import { ScrollButton } from "@/components/home/scroll-button";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative -mt-16 lg:-mt-[72px] min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-cosmic-black">
      {/* Aurora Background */}
      <AuroraBackground className="-z-10" />

      {/* CSS Starfield */}
      <div className="starfield absolute inset-0 pointer-events-none" />

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-mystic-purple/15 blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-astral-violet/10 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center pt-16 lg:pt-[72px]">
        <p className="font-body text-small tracking-[0.3em] uppercase text-celestial-gold mb-6">
          {t("tagline")}
        </p>
        <h1 className="font-heading text-hero text-star-white">
          {t("title")}
        </h1>
        <p className="font-body text-body text-star-white/80 mt-6 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center min-h-12 px-8 py-3 rounded-full bg-astral-violet text-star-white font-body font-medium transition-all duration-300 hover:bg-astral-violet/80 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] active:scale-[0.97]"
          >
            {t("cta_primary")}
          </a>
          <ScrollButton
            targetId="services"
            className="inline-flex items-center justify-center min-h-12 px-8 py-3 rounded-full border border-celestial-gold/40 text-celestial-gold font-body font-medium transition-colors duration-300 hover:bg-celestial-gold/10 active:scale-[0.97]"
          >
            {t("cta_secondary")}
          </ScrollButton>
        </div>
      </div>
    </section>
  );
}
