"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import React from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden",
        className
      )}
      style={{
        background:
          "linear-gradient(180deg, #0A0A0F 0%, #0D1137 40%, #2D1B69 70%, #0D1137 100%)",
      }}
      {...props}
    >
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 58, 237, 0.3), transparent),
              radial-gradient(ellipse 60% 40% at 70% 50%, rgba(45, 27, 105, 0.4), transparent),
              radial-gradient(ellipse 50% 30% at 30% 70%, rgba(212, 175, 55, 0.08), transparent)
            `,
            animation: "aurora 15s ease-in-out infinite alternate",
          }}
        />
      )}
      {showRadialGradient && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 20%, #0A0A0F 80%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
      <style jsx>{`
        @keyframes aurora {
          0% {
            background-position: 0% 50%;
            opacity: 0.5;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            background-position: 100% 50%;
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
