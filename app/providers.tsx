"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

const loadFeatures = () =>
  import("../lib/motion-features").then((res) => res.default);

export function MotionProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
