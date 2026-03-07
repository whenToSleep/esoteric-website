"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TestimonialItem {
  clientName: string;
  text: string;
}

interface InfiniteMovingCardsProps {
  items: TestimonialItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

function TestimonialCard({ item, className }: { item: TestimonialItem; className?: string }) {
  return (
    <div
      className={cn("max-w-full shrink-0 rounded-2xl border border-cosmic-purple/20 px-8 py-6", className)}
      style={{ background: "linear-gradient(180deg, #0D1137, #0A0A1E)" }}
    >
      <blockquote className="font-body text-[0.9375rem] leading-relaxed text-cosmic-white/80 italic">
        &ldquo;{item.text}&rdquo;
      </blockquote>
      <footer className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cosmic-purple/40 font-heading text-sm text-cosmic-gold">
          {item.clientName[0]}
        </div>
        <div>
          <p className="text-[0.9375rem] font-medium text-cosmic-white">
            {item.clientName}
          </p>
        </div>
      </footer>
    </div>
  );
}

export { TestimonialCard };

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
          <TestimonialCard key={idx} item={item} className="w-[350px] md:w-[450px]" />
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
          "flex w-max min-w-full shrink-0 gap-4 py-4 motion-reduce:[animation-play-state:paused]",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li key={idx} className="contents">
            <TestimonialCard item={item} className="w-[350px] md:w-[450px]" />
          </li>
        ))}
      </ul>
    </div>
  );
}
