"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal, MagneticButton } from "@/components/animations";

export function CTASection({ namespace = "home.cta" }: { namespace?: string }) {
  const t = useTranslations(namespace);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-28">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #0B0B0F, rgba(42,10,15,0.3) 50%, #0B0B0F)",
        }}
      />

      {/* Animated radial glow */}
      {prefersReducedMotion ? (
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[500px]
                      -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-950/15 blur-[100px]"
        />
      ) : (
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[500px]
                      -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-950 blur-[100px]"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <ScrollReveal direction="up">
        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
          <span className="font-body text-sm uppercase tracking-widest text-gold-500">
            {t("label")}
          </span>
          <h2 className="mt-3 font-heading text-section text-text-primary">
            {t("title")}
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary">
            {t("subtitle")}
          </p>
          <MagneticButton className="mt-10">
            <a
              href="#"
              className="inline-flex min-h-12 items-center justify-center
                         rounded-full bg-linear-to-r from-crimson-600 to-crimson-500
                         px-10 py-3.5 font-body text-base font-medium text-text-primary
                         transition-all duration-300
                         hover:brightness-110
                         hover:shadow-[0_0_30px_-5px_rgba(185,28,60,0.5)]
                         active:scale-[0.97]"
            >
              {t("button")}
            </a>
          </MagneticButton>
        </div>
      </ScrollReveal>
    </section>
  );
}
