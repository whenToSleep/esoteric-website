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
  // ☽○☾ — two circles with fill-rule="evenodd" punch out overlap → crescent
  return (
    <>
      {/* ☽ Left crescent: circle at (8,10) minus circle at (12,10) → bulge LEFT */}
      <path
        fillRule="evenodd"
        d="M2 10a6 6 0 1 0 12 0a6 6 0 1 0-12 0Z M6 10a6 6 0 1 0 12 0a6 6 0 1 0-12 0Z"
        fill="currentColor"
      />
      {/* ○ Center full moon */}
      <circle cx="24" cy="10" r="6" fill="currentColor" />
      {/* ☾ Right crescent: circle at (40,10) minus circle at (36,10) → bulge RIGHT */}
      <path
        fillRule="evenodd"
        d="M34 10a6 6 0 1 0 12 0a6 6 0 1 0-12 0Z M30 10a6 6 0 1 0 12 0a6 6 0 1 0-12 0Z"
        fill="currentColor"
      />
    </>
  );
}

export function SectionDivider({ variant = "star" }: SectionDividerProps) {
  const prefersReducedMotion = useReducedMotion();

  const isMoon = variant === "moon";
  const svgWidth = isMoon ? 48 : 20;
  const svgHeight = isMoon ? 20 : 20;
  const viewBox = isMoon ? "0 0 48 20" : "0 0 20 20";

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
