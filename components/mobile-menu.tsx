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
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ backgroundColor: "#0B0B0F" }}
    >
      {/* Close button */}
      <motion.button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-4 right-4 p-2 text-gold-500 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <X size={28} />
      </motion.button>

      {/* Navigation items */}
      <nav className="flex flex-col gap-7 pt-24 pl-9">
        {navItems.map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className="text-[22px] font-heading text-gold-500 transition-colors hover:text-text-primary"
            >
              {t(item.key)}
            </Link>
          </motion.div>
        ))}
      </nav>
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
