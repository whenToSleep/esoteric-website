"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TypewriterEffectSmooth({
  words,
  className,
  cursorClassName,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const renderWords = () => (
    <div className="inline">
      {words.map((word, idx) => (
        <span key={`word-${idx}`} className="inline-block">
          {word.text.split("").map((char, charIdx) => (
            <span key={`char-${charIdx}`} className={cn("text-gold-500", word.className)}>
              {char}
            </span>
          ))}
          {idx < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className="overflow-hidden"
        initial={{ width: shouldReduceMotion ? "fit-content" : "0%" }}
        whileInView={{ width: "fit-content" }}
        viewport={{ once: true }}
        transition={{
          duration: shouldReduceMotion ? 0 : 2,
          ease: [0.25, 0.4, 0.25, 1],
          delay: 0.3,
        }}
      >
        <div className="whitespace-nowrap text-section font-heading" style={{ fontSize: "inherit", lineHeight: "inherit" }}>
          {renderWords()}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block h-[1.2em] w-[4px] rounded-sm bg-gold-500 ml-1",
          shouldReduceMotion && "hidden",
          cursorClassName
        )}
      />
    </div>
  );
}
