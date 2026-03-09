"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollButton } from "@/components/home/scroll-button";

const easeOut = [0.17, 0.55, 0.55, 1] as const;

export function HeroSection() {
  const t = useTranslations("home.hero");
  const reduced = useReducedMotion();

  const noMotion = { initial: undefined, animate: undefined, transition: undefined };

  const h1Motion = reduced
    ? noMotion
    : {
        initial: { opacity: 0, filter: "blur(10px)", y: "20%" },
        animate: { opacity: 1, filter: "blur(0px)", y: 0 },
        transition: { duration: 0.8, ease: easeOut },
      };

  const subtitleMotion = reduced
    ? noMotion
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: easeOut, delay: 0.3 },
      };

  const ctaMotion = reduced
    ? noMotion
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: easeOut, delay: 0.5 },
      };

  const photoMotion = reduced
    ? noMotion
    : {
        initial: { opacity: 0, scale: 1.05 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: easeOut, delay: 0.2 },
      };

  return (
    <section className="relative -mt-16 lg:-mt-[72px] min-h-svh overflow-hidden bg-void">
      {/* Ambient radial glow behind text area */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-crimson-950/20 blur-[150px]" />
      </div>

      {/* Main grid */}
      <div className="relative z-10 mx-auto grid min-h-svh lg:grid-cols-[55fr_45fr] items-center">
        {/* Left: Text content */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 lg:pt-0 pb-8 lg:pb-0">
          <motion.h1
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-text-primary leading-[1.1]"
            {...h1Motion}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            className="font-body text-lg text-text-secondary max-w-md mt-6"
            {...subtitleMotion}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            {...ctaMotion}
          >
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-12 px-8 py-4 rounded-full bg-linear-to-r from-crimson-600 to-crimson-500 text-text-primary font-body font-medium transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_30px_-5px_rgba(185,28,60,0.5)] active:scale-[0.98] w-full sm:w-auto"
            >
              {t("cta_primary")}
            </a>
            <ScrollButton
              targetId="services"
              className="inline-flex items-center justify-center min-h-12 px-8 py-4 rounded-full border border-crimson-500/40 text-crimson-400 font-body font-medium transition-colors duration-300 hover:bg-crimson-500/10 active:scale-[0.98] w-full sm:w-auto"
            >
              {t("cta_secondary")}
            </ScrollButton>
          </motion.div>
        </div>

        {/* Right: Practitioner photo */}
        <motion.div
          className="relative lg:h-svh h-[50vh] w-full"
          {...photoMotion}
        >
          {/* Radial glow behind photo — "aura" effect */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,var(--color-crimson-950)_0%,transparent_70%)] opacity-30" />
          </div>

          {/* Photo */}
          <div className="relative z-10 h-full w-full">
            <Image
              src="/images/hero-photo.webp"
              alt={t("title")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-top lg:object-center"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 20%), linear-gradient(to top, transparent 0%, black 15%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 20%), linear-gradient(to top, transparent 0%, black 15%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
            {/* Desktop: left-edge mask overlay */}
            <div
              className="absolute inset-0 z-20 hidden lg:block pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, var(--color-void) 0%, transparent 30%)",
              }}
            />
            {/* Bottom fade to void */}
            <div
              className="absolute inset-x-0 bottom-0 z-20 h-32 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, var(--color-void) 0%, transparent 100%)",
              }}
            />
            {/* Mobile: top fade to void */}
            <div
              className="absolute inset-x-0 top-0 z-20 h-24 lg:hidden pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-void) 0%, transparent 100%)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 text-text-muted">
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
