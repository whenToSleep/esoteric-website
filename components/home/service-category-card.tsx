"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TransitionLink as Link } from "@/components/ui/transition-link";
import { CategoryIcon, getAccentConfig } from "@/components/home/icon-map";
import { Meteors } from "@/components/ui/aceternity/meteors";
import { cn } from "@/lib/utils";

interface ServiceCategoryCardProps {
  title: string;
  shortDescription: string;
  icon: string;
  slug: string;
  learnMoreText: string;
}

export function ServiceCategoryCard({
  title,
  shortDescription,
  icon,
  slug,
  learnMoreText,
}: ServiceCategoryCardProps) {
  const accent = getAccentConfig(icon);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link
        href={`/${slug}`}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border p-6 transition-colors duration-500 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-500 lg:p-8"
        style={{
          background: `linear-gradient(180deg, ${isHovered ? accent.bgTint : "transparent"} 0%, transparent 100%), linear-gradient(180deg, #1C1C22 0%, #131316 100%)`,
          borderColor: isHovered ? accent.borderGlow : "rgba(255,255,255,0.08)",
          boxShadow: isHovered ? accent.shadowGlow : "none",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/[0.06] to-transparent" />

        <div
          className={cn(
            "mb-5 flex h-12 w-12 items-center justify-center rounded-xl border",
            accent.iconBg,
            accent.iconBorder,
            accent.iconColor
          )}
        >
          <CategoryIcon name={icon} size={24} />
        </div>
        <h3 className="mb-3 font-heading text-card-title text-text-primary">
          {title}
        </h3>
        <p className="flex-1 text-small leading-relaxed text-text-secondary line-clamp-3">
          {shortDescription}
        </p>
        <span
          className={cn(
            "mt-auto inline-flex items-center pt-4 text-small font-medium transition-transform group-hover:translate-x-1",
            accent.linkColor
          )}
        >
          {learnMoreText} →
        </span>
        <Meteors number={8} />
      </Link>
    </motion.div>
  );
}
