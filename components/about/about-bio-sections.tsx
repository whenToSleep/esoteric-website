"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/animations";

const bioItems = ["01", "02", "03", "04"] as const;

export function AboutBioSections() {
  const t = useTranslations("about");

  return (
    <section className="bg-obsidian px-5 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-30">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal direction="up">
          <h2 className="mb-12 text-center font-heading text-section font-semibold text-text-primary md:mb-16">
            {t("bio_section_title")}
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {bioItems.map((num, index) => (
            <div key={num}>
              <ScrollReveal direction="up" delay={index * 0.08}>
                {/* Mobile: number above text */}
                <div className="py-8 md:hidden">
                  <span className="mb-3 block font-heading text-5xl font-semibold text-gold-500 opacity-20">
                    {num}
                  </span>
                  <h3 className="font-heading text-xl font-medium text-text-primary">
                    {t(`bio_${num}_title`)}
                  </h3>
                  <p className="mt-2 font-body leading-relaxed text-text-secondary">
                    {t(`bio_${num}_text`)}
                  </p>
                </div>

                {/* Desktop: grid with fixed number column */}
                <div className="hidden py-8 md:grid md:grid-cols-[5rem_1fr] md:gap-6 lg:grid-cols-[6rem_1fr] lg:gap-8">
                  <span className="font-heading text-6xl font-semibold text-gold-500 opacity-20 lg:text-8xl">
                    {num}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-medium text-text-primary">
                      {t(`bio_${num}_title`)}
                    </h3>
                    <p className="mt-2 font-body leading-relaxed text-text-secondary">
                      {t(`bio_${num}_text`)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {index < bioItems.length - 1 && (
                <div className="h-px bg-linear-to-r from-transparent via-gold-500/20 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
