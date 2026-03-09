"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { TransitionLink as Link } from "@/components/ui/transition-link";
import { navItems } from "@/lib/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileMenu } from "@/components/mobile-menu";

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between w-full px-4 sm:px-6 lg:px-8 lg:h-[72px]">
        {/* Logo — shrinks if not enough space */}
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

        {/* Right: Language switcher + Mobile menu */}
        <div className="flex shrink-0 items-center gap-2">
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
