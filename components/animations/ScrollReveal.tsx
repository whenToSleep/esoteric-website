"use client";
import { type ReactNode } from "react";
import { motion, type TargetAndTransition, useReducedMotion } from "framer-motion";

type Direction = "up" | "left" | "right" | "fade";

const hiddenVariants: Record<Direction, TargetAndTransition> = {
  fade: { opacity: 0 },
  up: { opacity: 0, y: 40 },
  left: { opacity: 0, x: -60 },
  right: { opacity: 0, x: 60 },
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={hiddenVariants[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
