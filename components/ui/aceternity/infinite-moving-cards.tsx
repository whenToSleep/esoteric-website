"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface InfiniteMovingCardsProps {
  items: {
    clientName: string;
    text: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--animation-direction",
          direction === "left" ? "forwards" : "reverse"
        );
        const dur =
          speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
        containerRef.current.style.setProperty("--animation-duration", dur);
      }

      setStart(true);
    }
  }, [prefersReducedMotion, direction, speed]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="w-[350px] max-w-full shrink-0 rounded-xl border border-celestial-gold/20 bg-midnight-navy p-6 md:w-[450px]"
          >
            <p className="font-heading text-base text-celestial-gold">
              {item.clientName}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-star-white">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[350px] max-w-full shrink-0 rounded-xl border border-celestial-gold/20 bg-midnight-navy p-6 md:w-[450px]"
          >
            <p className="font-heading text-base text-celestial-gold">
              {item.clientName}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-star-white">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.5rem));
          }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s)
            var(--animation-direction, forwards) linear infinite;
        }
      `}</style>
    </div>
  );
}
