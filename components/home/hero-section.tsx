"use client";

import { useTranslations } from "next-intl";
import { ScrollButton } from "@/components/home/scroll-button";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative -mt-16 lg:-mt-[72px] min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-cosmic-black">
      {/* Layer 1: Aurora — animated color blobs */}
      <div className="hero-aurora" />

      {/* Layer 2: Starfield */}
      <div className="hero-stars" />

      {/* Layer 3: Gradient orbs for depth */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-mystic-purple/20 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-astral-violet/15 blur-[120px] pointer-events-none z-0" />

      {/* Layer 4: Content */}
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
            className="inline-flex items-center justify-center min-h-12 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-astral-violet/90 text-star-white font-body font-medium transition-all duration-300 hover:bg-astral-violet/80 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] active:scale-[0.97]"
          >
            {t("cta_primary")}
          </a>
          <ScrollButton
            targetId="services"
            className="inline-flex items-center justify-center min-h-12 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full border border-celestial-gold/40 text-celestial-gold bg-celestial-gold/5 font-body font-medium transition-colors duration-300 hover:bg-celestial-gold/10 active:scale-[0.97]"
          >
            {t("cta_secondary")}
          </ScrollButton>
        </div>
      </div>
    </section>
  );
}
