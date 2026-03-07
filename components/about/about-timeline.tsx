"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

type TimelineItem = {
  year: string;
  title: string;
  id?: string;
};

const fallbackData: Record<string, { year: string; title: Record<string, string> }[]> = {
  default: [
    { year: "2018", title: { ru: "Начало пути в эзотерике", en: "Started the esoteric journey", uk: "Початок шляху в езотериці" } },
    { year: "2019", title: { ru: "Первые клиенты и консультации", en: "First clients and consultations", uk: "Перші клієнти та консультації" } },
    { year: "2020", title: { ru: "Переход к онлайн-практике", en: "Transition to online practice", uk: "Перехід до онлайн-практики" } },
    { year: "2022", title: { ru: "Расширение направлений: ритуалистика, регресс", en: "Expanded services: rituals, regression", uk: "Розширення напрямків: ритуалістика, регрес" } },
    { year: "2024", title: { ru: "Полный спектр эзотерических услуг", en: "Full spectrum of esoteric services", uk: "Повний спектр езотеричних послуг" } },
  ],
};

export function AboutTimeline({
  locale,
  items,
}: {
  locale: string;
  items?: TimelineItem[] | null;
}) {
  const t = useTranslations("about");
  const prefersReducedMotion = useReducedMotion();
  const lang = (locale as "ru" | "en" | "uk") || "ru";

  const timelineItems: { year: string; text: string }[] =
    items && items.length > 0
      ? items.map((item) => ({ year: item.year, text: item.title }))
      : fallbackData.default.map((item) => ({ year: item.year, text: item.title[lang] || item.title.ru }));

  return (
    <section className="px-4 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center font-heading text-2xl font-semibold text-star-white md:text-3xl">
          {t("timeline_title")}
        </h2>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-celestial-gold/30 md:left-1/2 md:-translate-x-0.5" />

          {timelineItems.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={`${item.year}-${index}`}
                initial={
                  prefersReducedMotion
                    ? {}
                    : { opacity: 0, y: 20 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-8 flex items-start gap-6 pl-12 md:pl-0 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`hidden flex-1 md:block ${isEven ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block rounded-xl border border-celestial-gold/20 bg-midnight-navy p-4 ${
                      isEven ? "mr-6" : "ml-6"
                    }`}
                  >
                    <p className="text-sm font-semibold text-celestial-gold">
                      {item.year}
                    </p>
                    <p className="mt-1 text-sm text-silver-mist">{item.text}</p>
                  </div>
                </div>

                <div className="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border-celestial-gold bg-cosmic-black md:static md:mt-4 md:shrink-0" />

                <div className="flex-1 md:hidden">
                  <div className="rounded-xl border border-celestial-gold/20 bg-midnight-navy p-4">
                    <p className="text-sm font-semibold text-celestial-gold">
                      {item.year}
                    </p>
                    <p className="mt-1 text-sm text-silver-mist">{item.text}</p>
                  </div>
                </div>

                <div className="hidden flex-1 md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
