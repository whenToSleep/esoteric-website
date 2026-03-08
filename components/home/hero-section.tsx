"use client";

import { useTranslations } from "next-intl";
import { ScrollButton } from "@/components/home/scroll-button";
import { ParallaxLayer } from "@/components/animations";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="noise-overlay relative -mt-16 lg:-mt-[72px] min-h-svh md:min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-cosmic-black">
      {/* Layer 1: Aurora — animated color blobs */}
      <div className="hero-aurora" />
      <div className="hero-aurora-accent" />

      {/* Layer 2: Starfield */}
      <div className="hero-stars" />

      {/* Layer 3: Gradient orbs for depth */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-mystic-purple/20 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-astral-violet/15 blur-[120px] pointer-events-none z-0" />

      {/* Layer 4: Parallax stars — far */}
      <ParallaxLayer speed={0.2} className="absolute inset-0 z-[1] pointer-events-none hidden md:block">
        <div className="absolute top-[10%] left-[15%] w-1 h-1 rounded-full bg-cosmic-gold/60" />
        <div className="absolute top-[30%] right-[20%] w-0.5 h-0.5 rounded-full bg-cosmic-white/50" />
        <div className="absolute top-[70%] left-[60%] w-1 h-1 rounded-full bg-cosmic-gold/50" />
        <div className="absolute top-[85%] left-[25%] w-0.5 h-0.5 rounded-full bg-cosmic-white/40" />
        <div className="absolute top-[15%] right-[40%] w-0.5 h-0.5 rounded-full bg-cosmic-gold/45" />
      </ParallaxLayer>

      {/* Layer 5: Parallax stars — near */}
      <ParallaxLayer speed={0.4} className="absolute inset-0 z-[1] pointer-events-none hidden md:block">
        <div className="absolute top-[50%] right-[10%] w-1.5 h-1.5 rounded-full bg-cosmic-gold/35" />
        <div className="absolute top-[20%] left-[40%] w-1 h-1 rounded-full bg-cosmic-white/30" />
        <div className="absolute top-[75%] right-[35%] w-1 h-1 rounded-full bg-cosmic-gold/30" />
      </ParallaxLayer>

      {/* Layer 6: Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center pt-20 pb-12 md:pt-0 md:pb-0">
        <p className="font-body text-small tracking-[0.3em] uppercase text-celestial-gold mb-6">
          {t("tagline")}
        </p>
        <h1
          className="font-heading text-hero text-star-white font-semibold"
          style={{
            textShadow: '0 0 40px rgba(212,175,55,0.15), 0 0 80px rgba(212,175,55,0.08)'
          }}
        >
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
