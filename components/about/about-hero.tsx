"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface AboutHeroProps {
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  children?: ReactNode;
}

export function AboutHero({ title, imageUrl, imageAlt, children }: AboutHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-4 py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:items-center md:gap-16">
        {imageUrl && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full shrink-0 md:w-[40%]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-celestial-gold/20">
              <Image
                src={imageUrl}
                alt={imageAlt || title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
          </motion.div>
        )}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1"
        >
          <h1 className="font-heading text-3xl font-semibold text-star-white md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {children && (
            <div className="mt-6 text-silver-mist/90">
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
