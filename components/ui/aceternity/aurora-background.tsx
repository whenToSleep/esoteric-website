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
      className={cn("absolute inset-0", className)}
      style={{
        background:
          "linear-gradient(180deg, #0B0B0F 0%, #131316 40%, #2D1B4E 70%, #131316 100%)",
      }}
      {...props}
    >
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(185, 28, 60, 0.3), transparent),
              radial-gradient(ellipse 60% 40% at 70% 50%, rgba(42, 10, 15, 0.4), transparent),
              radial-gradient(ellipse 50% 30% at 30% 70%, rgba(201, 168, 76, 0.08), transparent)
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
              "radial-gradient(ellipse at 50% 50%, transparent 20%, #0B0B0F 80%)",
          }}
        />
      )}
      {children}
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
