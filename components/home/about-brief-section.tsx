"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/animations";
import { StaggerContainer, StaggerItem } from "@/components/animations";

interface AboutBriefSectionProps {
  imageUrl?: string;
  imageAlt?: string;
}

const bioItems = ["01", "02", "03"] as const;

export function AboutBriefSection({
  imageUrl,
  imageAlt,
}: AboutBriefSectionProps) {
  const t = useTranslations("home.about");

  return (
    <section className="bg-obsidian px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-30">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal direction="up">
          <div className="mb-10 text-center md:mb-14 lg:mb-16">
            <span className="font-body text-sm uppercase tracking-widest text-gold-500">
              {t("label")}
            </span>
            <h2 className="mt-3 font-heading text-section font-semibold text-text-primary">
              {t("section_title")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid items-start gap-10 md:grid-cols-[2fr_3fr] md:gap-12 lg:gap-16">
          {/* Photo with gradient mask */}
          <ScrollReveal direction="left">
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl md:max-w-none">
              {imageUrl ? (
                <div
                  className="aspect-[3/4]"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 70%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 70%, transparent 100%)",
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={imageAlt || t("section_title")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              ) : (
                <div
                  className="aspect-[3/4] bg-linear-to-br from-obsidian to-amethyst-900"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 70%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 70%, transparent 100%)",
                  }}
                />
              )}
            </div>
          </ScrollReveal>

          {/* Numbered paragraphs */}
          <div>
            <StaggerContainer className="space-y-10 lg:space-y-12">
              {bioItems.map((num) => (
                <StaggerItem key={num}>
                  <div className="relative pl-14 lg:pl-18">
                    <span className="absolute left-0 top-0 font-heading text-5xl font-semibold text-gold-500/20 lg:text-7xl">
                      {num}
                    </span>
                    <h3 className="font-heading text-xl font-medium text-text-primary">
                      {t(`bio_${num}_title`)}
                    </h3>
                    <p className="mt-2 font-body leading-relaxed text-text-secondary">
                      {t(`bio_${num}_text`)}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <ScrollReveal direction="up" delay={0.3}>
              <Link
                href="/about"
                className="mt-10 inline-flex items-center justify-center rounded-full border border-crimson-500/40 bg-transparent px-8 py-3 text-sm font-medium text-crimson-400 transition-all duration-300 hover:bg-crimson-500/10"
              >
                {t("learn_more")}
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
