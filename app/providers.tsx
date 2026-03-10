"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { ReactLenis } from "lenis/react";

const loadFeatures = () =>
  import("../lib/motion-features").then((res) => res.default);

export function MotionProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures}>
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
          {children}
        </ReactLenis>
      </LazyMotion>
    </MotionConfig>
  );
}
