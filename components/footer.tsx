import { getTranslations } from "next-intl/server";
import { Music2, Instagram, Send, Youtube } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { navItems, socialLinks } from "@/lib/navigation";

const socialIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  tiktok: Music2,
  instagram: Instagram,
  telegram: Send,
  youtube: Youtube,
};

export async function Footer() {
  const t = await getTranslations("footer");
  const navT = await getTranslations("nav");

  return (
    <footer className="bg-surface-1 border-t border-celestial-gold/20">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1: Navigation */}
          <div>
            <h3 className="font-heading text-celestial-gold text-sm font-semibold uppercase tracking-wider mb-4">
              {t("navigation")}
            </h3>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-sm text-star-white transition-colors hover:text-celestial-gold"
                >
                  {navT(item.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: Social */}
          <div>
            <h3 className="font-heading text-celestial-gold text-sm font-semibold uppercase tracking-wider mb-4">
              {t("social")}
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
                    className="flex items-center gap-2 text-sm text-star-white transition-colors hover:text-celestial-gold"
                  >
                    {Icon && <Icon size={20} className="text-celestial-gold" />}
                    {t(link.key)}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Column 3: CTA */}
          <div>
            <h3 className="font-heading text-celestial-gold text-sm font-semibold uppercase tracking-wider mb-4">
              {t("contact")}
            </h3>
            <a
              href="#"
              className="inline-block rounded-lg bg-celestial-gold px-6 py-3 text-sm font-semibold text-cosmic-black transition-all hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(212,175,55,0.3)]"
            >
              {t("cta")}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-celestial-gold/10 pt-8 text-center">
          <p className="text-silver-mist text-xs">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
