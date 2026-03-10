"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { InfiniteMovingCards } from "@/components/ui/aceternity/infinite-moving-cards";
import { TestimonialCard } from "@/components/ui/aceternity/infinite-moving-cards";
import { ScrollReveal, TextReveal } from "@/components/animations";

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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-obsidian py-16 md:py-20 lg:py-30">
      <div className="mb-8 text-center md:mb-12 lg:mb-16 px-4 sm:px-6">
        <ScrollReveal direction="fade">
          <span className="font-body text-sm uppercase tracking-widest text-gold-500">
            {t("section_title")}
          </span>
        </ScrollReveal>
        <TextReveal
          text={t("section_title")}
          type="words"
          as="h2"
          className="mt-3 font-heading text-section font-semibold text-text-primary"
          delay={0.1}
        />
      </div>

      {/* Desktop: Infinite Moving Cards */}
      <div className="hidden md:block">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
          pauseOnHover={true}
          className="py-4"
        />
      </div>

      {/* Mobile: Embla Carousel */}
      <div className="md:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 pl-4">
            {testimonials.map((item, idx) => (
              <div key={idx} className="w-[85vw] shrink-0">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        {testimonials.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === selectedIndex
                    ? "w-6 bg-gold-500"
                    : "w-2 bg-overlay"
                }`}
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
