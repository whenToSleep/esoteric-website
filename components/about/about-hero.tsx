"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/animations";

interface AboutHeroProps {
  name: string;
  imageUrl?: string;
  imageAlt?: string;
  children?: ReactNode;
}

const easeOut = [0.17, 0.55, 0.55, 1] as const;

export function AboutHero({
  name,
  imageUrl,
  imageAlt,
  children,
}: AboutHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("about");

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-void px-5 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
      {/* Ambient radial glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-950/20 blur-[150px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
        {/* Text column */}
        <div className="order-1 lg:order-1">
          <motion.span
            className="mb-4 block font-body text-sm uppercase tracking-widest text-gold-500"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            {t("label")}
          </motion.span>

          <TextReveal
            text={name}
            as="h1"
            className="font-heading text-hero font-semibold leading-[1.1] text-text-primary"
            delay={0.15}
          />

          {children && (
            <motion.div
              className="mt-6 font-body text-lg leading-relaxed text-text-secondary"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
            >
              {children}
            </motion.div>
          )}

          <motion.div
            className="mt-8 h-px w-24 bg-linear-to-r from-gold-500/50 to-transparent"
            initial={prefersReducedMotion ? {} : { opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: easeOut }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* Photo column */}
        <div className="order-2 lg:order-2">
          {imageUrl ? (
            <motion.div
              className="relative"
              initial={
                prefersReducedMotion ? {} : { opacity: 0, scale: 1.05 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
            >
              {/* Aura glow behind photo */}
              <div className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-crimson-950/30 blur-[80px]" />

              {/* Desktop photo with left-edge mask */}
              <div
                className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl lg:block"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 20%), linear-gradient(to top, transparent 0%, black 15%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 20%), linear-gradient(to top, transparent 0%, black 15%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "destination-in",
                }}
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt || name}
                  fill
                  className="object-cover object-center"
                  sizes="45vw"
                  priority
                />
              </div>

              {/* Mobile photo with top-edge mask */}
              <div
                className="relative mx-auto max-h-[50vh] overflow-hidden rounded-2xl lg:hidden"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                }}
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt || name}
                  width={600}
                  height={800}
                  className="h-auto w-full object-cover object-center"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>
          ) : (
            <div
              className="aspect-[3/4] rounded-2xl bg-linear-to-br from-obsidian to-amethyst-900"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 70%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 70%, transparent 100%)",
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
