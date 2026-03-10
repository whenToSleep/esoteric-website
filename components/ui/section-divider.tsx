"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionDividerProps {
  variant?: "star" | "moon";
}

const ease = [0.17, 0.55, 0.55, 1] as const;

function StarSVG() {
  return (
    <path
      d="M10 0L12.35 7.65L20 10L12.35 12.35L10 20L7.65 12.35L0 10L7.65 7.65L10 0Z"
      fill="currentColor"
    />
  );
}

function MoonSVG() {
  return (
    <>
      {/* Left crescent (waning) */}
      <path
        d="M8 2C5.8 3.6 4.5 6.1 4.5 9s1.3 5.4 3.5 7c-4.2-0.5-7.5-4-7.5-8.5S3.8 2.5 8 2z"
        fill="currentColor"
      />
      {/* Center full moon */}
      <circle cx="18" cy="9" r="5" fill="currentColor" />
      {/* Right crescent (waxing) */}
      <path
        d="M28 2c2.2 1.6 3.5 4.1 3.5 7s-1.3 5.4-3.5 7c4.2-0.5 7.5-4 7.5-8.5S32.2 2.5 28 2z"
        fill="currentColor"
      />
    </>
  );
}

export function SectionDivider({ variant = "star" }: SectionDividerProps) {
  const prefersReducedMotion = useReducedMotion();

  const isMoon = variant === "moon";
  const svgWidth = isMoon ? 36 : 20;
  const svgHeight = isMoon ? 18 : 20;
  const viewBox = isMoon ? "0 0 36 18" : "0 0 20 20";

  if (prefersReducedMotion) {
    return (
      <div className="flex items-center justify-center gap-4 py-8 md:py-12">
        <div className="h-px w-16 bg-linear-to-r from-transparent via-gold-500/30 to-transparent md:w-24" />
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={viewBox}
          fill="none"
          className="shrink-0 text-gold-500/50"
        >
          {isMoon ? <MoonSVG /> : <StarSVG />}
        </svg>
        <div className="h-px w-16 bg-linear-to-r from-transparent via-gold-500/30 to-transparent md:w-24" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 py-8 md:py-12">
      <motion.div
        className="h-px w-16 bg-linear-to-r from-transparent via-gold-500/30 to-transparent md:w-24"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      />
      <motion.svg
        width={svgWidth}
        height={svgHeight}
        viewBox={viewBox}
        fill="none"
        className="shrink-0 text-gold-500/50"
        initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
        whileInView={{ rotate: isMoon ? 0 : 180, scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      >
        {isMoon ? <MoonSVG /> : <StarSVG />}
      </motion.svg>
      <motion.div
        className="h-px w-16 bg-linear-to-r from-transparent via-gold-500/30 to-transparent md:w-24"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      />
    </div>
  );
}
