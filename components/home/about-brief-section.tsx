"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

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
    <section className="px-4 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center font-heading text-2xl font-semibold text-celestial-gold md:mb-12 md:text-3xl lg:text-4xl">
          {t("section_title")}
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
        >
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
          <div>
            {title && (
              <h3 className="mb-4 font-heading text-xl text-star-white md:text-2xl">
                {title}
              </h3>
            )}
            {content && (
              <p className="leading-relaxed text-silver-mist">{content}</p>
            )}
            <Link
              href="/about"
              className="mt-6 inline-flex items-center justify-center rounded-lg border border-celestial-gold bg-transparent px-6 py-2.5 text-sm font-semibold text-celestial-gold transition-all duration-300 hover:bg-celestial-gold/10"
            >
              {t("learn_more")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
