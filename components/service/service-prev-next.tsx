import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface ServicePrevNextProps {
  prev?: { title: string; slug: string };
  next?: { title: string; slug: string };
  categorySlug: string;
}

export async function ServicePrevNext({
  prev,
  next,
  categorySlug,
}: ServicePrevNextProps) {
  const t = await getTranslations("service");

  if (!prev && !next) return null;

  return (
    <nav className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="flex items-stretch justify-between border-t border-overlay/50 py-6 gap-4">
        {prev ? (
          <Link
            href={`/${categorySlug}/${prev.slug}`}
            className="group flex items-center gap-2 text-text-secondary transition-colors hover:text-crimson-400"
          >
            <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
            <div className="text-left">
              <p className="text-xs text-text-muted">{t("prev_service")}</p>
              <p className="text-small font-medium">{prev.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/${categorySlug}/${next.slug}`}
            className="group flex items-center gap-2 text-right text-text-secondary transition-colors hover:text-crimson-400"
          >
            <div className="text-right">
              <p className="text-xs text-text-muted">{t("next_service")}</p>
              <p className="text-small font-medium">{next.title}</p>
            </div>
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
