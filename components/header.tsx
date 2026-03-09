"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { TransitionLink as Link } from "@/components/ui/transition-link";
import { navItems } from "@/lib/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileMenu } from "@/components/mobile-menu";

export function Header() {
  const t = useTranslations("nav");
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    // Always show at top of page
    if (latest < 50) {
      setVisible(true);
      return;
    }
    // Hide on scroll down, show on scroll up
    setVisible(latest < prev);
  });

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-void/80 backdrop-blur-xl transition-transform duration-300"
      style={{ transform: visible ? "translateY(0)" : "translateY(-100%)" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between w-full px-4 sm:px-6 lg:px-8 lg:h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex shrink min-w-0 items-center">
          <Image
            src="/images/logo.svg"
            alt="Mori Norman"
            width={120}
            height={24}
            className="h-auto max-w-full"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="px-3 py-2 text-sm text-text-secondary transition-colors hover:text-crimson-400"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Right: CTA + Language switcher + Mobile menu */}
        <div className="flex shrink-0 items-center gap-3">
          {/* Desktop CTA */}
          <a
            href="#"
            className="hidden lg:inline-flex items-center rounded-full bg-crimson-500 px-6 py-2 text-sm font-medium text-text-primary transition-all duration-300 hover:bg-crimson-400 hover:shadow-[0_0_20px_-5px_rgba(185,28,60,0.5)] active:scale-[0.98]"
          >
            {t("cta")}
          </a>
          {/* Mobile language switcher (compact) */}
          <div className="lg:hidden">
            <LanguageSwitcher compact />
          </div>
          {/* Desktop language switcher */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
