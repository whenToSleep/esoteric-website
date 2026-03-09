"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/animations";
import { getAccentConfig } from "@/components/home/icon-map";

interface CategoryHeroProps {
  title: string;
  description: string;
  locale: string;
  icon?: string;
  heroImage?: { url: string; alt?: string } | null;
}

export function CategoryHero({
  title,
  description,
  icon,
  heroImage,
}: CategoryHeroProps) {
  const tNav = useTranslations("nav");
  const accent = getAccentConfig(icon || "cards");

  // Extract raw RGBA base from accent.borderGlow (e.g. "rgba(185,28,60,0.3)")
  // and create lower-opacity versions for atmospheric orbs
  const glowBase = accent.borderGlow.replace(/[\d.]+\)$/, "");

  return (
    <section className="relative flex min-h-[40vh] items-end overflow-hidden bg-onyx md:min-h-[50vh]">
      {heroImage?.url ? (
        <>
          <Image
            src={heroImage.url}
            alt={heroImage.alt || title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/70 to-onyx/30" />
          {/* Subtle accent glow behind content */}
          <div
            className="pointer-events-none absolute left-1/4 bottom-0 h-[300px] w-[400px] rounded-full blur-[120px]"
            style={{ background: `${glowBase}0.08)` }}
          />
        </>
      ) : (
        <>
          {/* Fallback: atmospheric gradient + accent orbs */}
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 to-onyx" />
          <div
            className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full blur-[120px]"
            style={{ background: `${glowBase}0.1)` }}
          />
          <div
            className="pointer-events-none absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full blur-[100px]"
            style={{ background: `${glowBase}0.06)` }}
          />
        </>
      )}

      {/* Content — pinned to bottom via items-end on section */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 md:pb-16 md:pt-40 lg:px-8">
        <ScrollReveal direction="up">
          {/* Breadcrumb */}
          <nav className="mb-4 text-small text-text-muted">
            <Link
              href="/"
              className="transition-colors hover:text-text-primary"
            >
              {tNav("home")}
            </Link>
            <span className="mx-2">&rarr;</span>
            <span className="text-gold-500">{title}</span>
          </nav>

          {/* Title */}
          <h1 className="font-heading text-hero text-text-primary">{title}</h1>

          {/* Description */}
          {description && (
            <p className="mt-4 max-w-2xl font-body text-body text-text-secondary">
              {description}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
