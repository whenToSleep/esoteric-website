"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileMenu } from "@/components/mobile-menu";

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="fixed top-0 w-full z-50 bg-midnight-navy/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.svg"
            alt="Mori Norman"
            width={32}
            height={32}
          />
          <span className="font-heading text-lg text-celestial-gold">
            Mori Norman
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="px-3 py-2 text-sm text-star-white transition-colors hover:text-celestial-gold"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Right: Language switcher (desktop) + Mobile menu */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
