"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { TransitionLink as Link } from "@/components/ui/transition-link";
import { navItems } from "@/lib/navigation";

function MenuOverlay({
  onClose,
  t,
}: {
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.17, 0.55, 0.55, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ backgroundColor: "#0B0B0F" }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-4 right-4 p-2 text-text-secondary z-10"
      >
        <X size={28} />
      </button>

      {/* Navigation items */}
      <nav className="flex flex-col gap-7 pt-24 pl-9 flex-1">
        {navItems.map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1 + i * 0.06,
              duration: 0.5,
              ease: [0.17, 0.55, 0.55, 1],
            }}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className="text-2xl font-heading text-text-primary transition-colors hover:text-crimson-400"
            >
              {t(item.key)}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* CTA button at bottom */}
      <motion.div
        className="px-9 pb-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1 + navItems.length * 0.06 + 0.1,
          duration: 0.5,
          ease: [0.17, 0.55, 0.55, 1],
        }}
      >
        <a
          href="#"
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-full bg-crimson-500 py-4 text-lg font-medium text-text-primary transition-all duration-300 hover:bg-crimson-400 active:scale-[0.98]"
        >
          {t("cta")}
        </a>
      </motion.div>
    </motion.div>
  );
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="text-text-primary p-2"
      >
        <Menu size={24} />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <MenuOverlay onClose={() => setIsOpen(false)} t={t} />
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
