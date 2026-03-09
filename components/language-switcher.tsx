"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/config";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  compact?: boolean;
  onNavigate?: () => void;
};

export function LanguageSwitcher({ className, compact, onNavigate }: Props) {
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
            <span className={cn("mx-1 text-text-muted", compact ? "text-xs" : "text-sm")}>/</span>
          )}
          <button
            onClick={() => handleSwitch(loc)}
            className={cn(
              compact ? "text-xs font-medium transition-colors" : "text-sm font-medium transition-colors",
              loc === locale
                ? "text-gold-500"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
