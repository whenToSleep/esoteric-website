"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export function CTAHeading({ title }: { title: string }) {
  const words = title.split(" ").map((text) => ({ text }));

  return (
    <TypewriterEffectSmooth
      words={words}
      className="font-heading text-section text-cosmic-gold"
    />
  );
}
