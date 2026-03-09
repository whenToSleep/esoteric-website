import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  categorySlug?: string;
  pageLabel: string;
}

function buildHref(page: number, categorySlug?: string): string {
  const params = new URLSearchParams();
  if (categorySlug) params.set("category", categorySlug);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `/blog${qs ? `?${qs}` : ""}`;
}

export function BlogPagination({
  currentPage,
  totalPages,
  categorySlug,
  pageLabel,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-4">
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1, categorySlug)}
          className="flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-crimson-400"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 text-sm text-text-muted">
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      <span className="text-sm text-text-secondary">{pageLabel}</span>

      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1, categorySlug)}
          className="flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-crimson-400"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 text-sm text-text-muted">
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
