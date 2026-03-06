"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/config";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  onNavigate?: () => void;
};

export function LanguageSwitcher({ className, onNavigate }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleSwitch(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
    onNavigate?.();
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && (
            <span className="mx-1 text-silver-mist/50 text-sm">/</span>
          )}
          <button
            onClick={() => handleSwitch(loc)}
            className={cn(
              "text-sm font-medium transition-colors",
              loc === locale
                ? "text-celestial-gold"
                : "text-silver-mist hover:text-star-white"
            )}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
