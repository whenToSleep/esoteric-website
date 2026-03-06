"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CategoryIcon } from "@/components/home/icon-map";

interface CategoryHeroProps {
  title: string;
  description: string;
  icon: string;
}

export function CategoryHero({ title, description, icon }: CategoryHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[40vh] items-center justify-center px-4 py-16 md:py-20 lg:py-24"
      style={{
        background: "linear-gradient(135deg, #2D1B69 0%, #0D1137 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex justify-center"
        >
          <CategoryIcon name={icon} size={56} className="text-celestial-gold" />
        </motion.div>
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-3xl font-bold text-star-white md:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-silver-mist"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
