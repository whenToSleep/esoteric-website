"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { getAccentConfig } from "@/components/home/icon-map";

interface ServiceCardProps {
  title: string;
  slug: string;
  categorySlug: string;
  shortDescription: string;
  price?: string;
  duration?: string;
  icon?: string;
}

export function ServiceCard({
  title,
  slug,
  categorySlug,
  shortDescription,
  price,
  duration,
  icon,
}: ServiceCardProps) {
  const accent = getAccentConfig(icon || "cards");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/${categorySlug}/${slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-500 ease-out hover:-translate-y-1 active:scale-[0.98] md:p-6 lg:p-8"
      style={{
        background: `linear-gradient(180deg, ${isHovered ? accent.bgTint : "transparent"} 0%, transparent 100%), linear-gradient(180deg, #1C1C22 0%, #131316 100%)`,
        borderColor: isHovered ? accent.borderGlow : "rgba(50,50,60,0.5)",
        boxShadow: isHovered ? accent.shadowGlow : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Title */}
      <h3 className="mb-3 font-heading text-card-title text-text-primary">
        {title}
      </h3>

      {/* Description */}
      <p className="flex-1 text-small leading-relaxed text-text-secondary">
        {shortDescription}
      </p>

      {/* Price + Duration */}
      {(price || duration) && (
        <div className="mt-4 flex items-center justify-between border-t border-overlay/50 pt-4">
          {price && (
            <span className="text-small font-medium text-gold-500">
              {price}
            </span>
          )}
          {duration && (
            <span className="text-small text-text-muted">
              {duration}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
