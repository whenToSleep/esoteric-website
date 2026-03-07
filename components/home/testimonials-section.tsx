"use client";

import { useTranslations } from "next-intl";
import { InfiniteMovingCards, TestimonialCard } from "@/components/ui/aceternity/infinite-moving-cards";
import useEmblaCarousel from "embla-carousel-react";

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
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" });

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 md:py-20 lg:py-30">
      <h2 className="mb-8 text-center font-heading text-2xl font-semibold text-celestial-gold md:mb-12 md:text-3xl lg:mb-16 lg:text-4xl">
        {t("section_title")}
      </h2>

      {/* Desktop: infinite marquee */}
      <div className="hidden lg:block">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
          pauseOnHover={true}
          className="py-4"
        />
      </div>

      {/* Mobile: Embla swipe carousel */}
      <div className="overflow-hidden lg:hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="min-w-0 flex-[0_0_85%] px-3">
              <TestimonialCard item={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
