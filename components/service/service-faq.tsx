"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

interface FaqItem {
  question: string;
  answer: string;
}

interface ServiceFaqProps {
  items: FaqItem[];
}

function FaqAccordionItem({ question, answer }: FaqItem) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border-b border-celestial-gold/20 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-mystic-purple/10"
      >
        <span className="text-base font-medium text-star-white">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-celestial-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-silver-mist">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ServiceFaq({ items }: ServiceFaqProps) {
  const t = useTranslations("service");

  if (!items || items.length === 0) return null;

  return (
    <div>
      <h2 className="mb-6 font-heading text-2xl font-semibold text-star-white">
        {t("faq_title")}
      </h2>
      <div className="overflow-hidden rounded-xl border border-celestial-gold/20 bg-midnight-navy">
        {items.map((item, index) => (
          <FaqAccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}
