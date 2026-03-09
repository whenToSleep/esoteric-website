import { getTranslations } from "next-intl/server";
import { Music2, Instagram, Send, Youtube } from "lucide-react";
import { TransitionLink as Link } from "@/components/ui/transition-link";
import { navItems, socialLinks } from "@/lib/navigation";

const socialIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  tiktok: Music2,
  instagram: Instagram,
  telegram: Send,
  youtube: Youtube,
};

const serviceKeys = ["tarot", "rituals", "support", "education", "regress"] as const;

export async function Footer() {
  const t = await getTranslations("footer");
  const navT = await getTranslations("nav");

  return (
    <footer className="border-t border-overlay/50 bg-void">
      {/* Marquee */}
      <div className="overflow-hidden py-4 border-b border-overlay/30">
        <div className="animate-scroll flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 font-heading text-lg text-text-muted/40 tracking-widest uppercase select-none"
            >
              Mori Norman ✦
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-heading text-lg text-text-primary">Mori Norman</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {t("brand")}
            </p>
          </div>

          {/* Column 2: Navigation — hidden on mobile */}
          <div className="hidden md:block">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">
              {t("navigation")}
            </h3>
            <nav className="flex flex-col gap-2">
              {navItems
                .filter((item) => !serviceKeys.includes(item.key as typeof serviceKeys[number]))
                .map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="text-sm text-text-secondary transition-colors hover:text-crimson-400"
                  >
                    {navT(item.key)}
                  </Link>
                ))}
            </nav>
          </div>

          {/* Column 3: Services — hidden on mobile */}
          <div className="hidden md:block">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">
              {t("services")}
            </h3>
            <nav className="flex flex-col gap-2">
              {navItems
                .filter((item) => serviceKeys.includes(item.key as typeof serviceKeys[number]))
                .map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="text-sm text-text-secondary transition-colors hover:text-crimson-400"
                  >
                    {navT(item.key)}
                  </Link>
                ))}
            </nav>
          </div>

          {/* Column 4: Contacts */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">
              {t("contact")}
            </h3>
            <nav className="flex flex-col gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.key];
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-crimson-400"
                  >
                    {Icon && <Icon size={18} className="text-gold-500/70" />}
                    {t(link.key)}
                  </a>
                );
              })}
            </nav>
            <a
              href="#"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-crimson-500 px-6 py-2.5 text-sm font-medium text-text-primary transition-all duration-300 hover:bg-crimson-400 hover:shadow-[0_0_30px_-5px_rgba(185,28,60,0.5)] active:scale-[0.97]"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-overlay/50">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-12">
          <p className="text-sm text-text-muted text-center md:text-left">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
