"use client";

import { useTranslations } from "next-intl";
import { InfiniteMovingCards } from "@/components/ui/aceternity/infinite-moving-cards";

interface Testimonial {
  clientName: string;
  text: string;
}

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const t = useTranslations("home.testimonials");

  if (testimonials.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <h2 className="mb-8 text-center font-heading text-2xl font-semibold text-celestial-gold md:mb-12 md:text-3xl lg:text-4xl">
        {t("section_title")}
      </h2>
      <InfiniteMovingCards items={testimonials} speed="slow" />
    </section>
  );
}
