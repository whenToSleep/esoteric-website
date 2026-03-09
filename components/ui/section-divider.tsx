"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SectionDivider() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex items-center justify-center gap-4 py-8 md:py-12">
      <div className="h-px w-16 bg-linear-to-r from-transparent via-gold-500/30 to-transparent md:w-24" />
      {prefersReducedMotion ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="shrink-0 text-gold-500/50"
        >
          <path
            d="M10 0L12.35 7.65L20 10L12.35 12.35L10 20L7.65 12.35L0 10L7.65 7.65L10 0Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="shrink-0 text-gold-500/50"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <path
            d="M10 0L12.35 7.65L20 10L12.35 12.35L10 20L7.65 12.35L0 10L7.65 7.65L10 0Z"
            fill="currentColor"
          />
        </motion.svg>
      )}
      <div className="h-px w-16 bg-linear-to-r from-transparent via-gold-500/30 to-transparent md:w-24" />
    </div>
  );
}
