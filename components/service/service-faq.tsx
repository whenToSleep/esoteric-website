"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
    <div
      className="overflow-hidden rounded-xl border border-white/[0.06]"
      style={{
        background: "linear-gradient(180deg, #1C1C22 0%, #131316 100%)",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-white/[0.03]"
      >
        <span className="font-medium text-text-primary">{question}</span>
        <span
          className={`ml-4 text-xl font-light text-gold-500 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={
              prefersReducedMotion
                ? { height: "auto" }
                : { height: 0, opacity: 0 }
            }
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-small leading-relaxed text-text-primary/70">
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
      <h2 className="mb-8 text-center font-heading text-section text-gold-500">
        {t("faq_title")}
      </h2>
      <div className="space-y-3">
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
