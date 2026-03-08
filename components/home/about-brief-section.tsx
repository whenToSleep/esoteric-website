"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/animations";

interface AboutBriefSectionProps {
  title?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export function AboutBriefSection({
  title,
  content,
  imageUrl,
  imageAlt,
}: AboutBriefSectionProps) {
  const t = useTranslations("home.about");

  return (
    <section className="bg-surface-1 px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-30">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal direction="up">
          <h2 className="mb-8 text-center font-heading text-section text-cosmic-gold md:mb-12 lg:mb-16">
            {t("section_title")}
          </h2>
        </ScrollReveal>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <ScrollReveal direction="left">
            {imageUrl ? (
              <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-xl">
                <Image
                  src={imageUrl}
                  alt={imageAlt || title || "About"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="mx-auto aspect-[3/4] w-full max-w-sm rounded-xl bg-gradient-to-br from-midnight-navy to-mystic-purple" />
            )}
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <div className="max-w-3xl">
              {content && (
                <p className="leading-relaxed text-cosmic-white/70">{content}</p>
              )}
              <Link
                href="/about"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-cosmic-gold/40 bg-transparent px-8 py-3 text-sm font-medium text-cosmic-gold transition-all duration-300 hover:bg-cosmic-gold/10"
              >
                {t("learn_more")}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
