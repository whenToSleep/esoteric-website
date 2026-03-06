import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PostNavigationProps {
  prevPost?: { title: string; slug: string } | null;
  nextPost?: { title: string; slug: string } | null;
  prevLabel: string;
  nextLabel: string;
}

export function PostNavigation({
  prevPost,
  nextPost,
  prevLabel,
  nextLabel,
}: PostNavigationProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <nav className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className="group flex items-center gap-3 rounded-xl border border-celestial-gold/20 bg-midnight-navy p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        >
          <ChevronLeft className="h-5 w-5 shrink-0 text-celestial-gold" />
          <div className="min-w-0">
            <span className="text-xs text-silver-mist">{prevLabel}</span>
            <p className="truncate font-heading text-sm text-star-white">
              {prevPost.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="group flex items-center justify-end gap-3 rounded-xl border border-celestial-gold/20 bg-midnight-navy p-4 text-right transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        >
          <div className="min-w-0">
            <span className="text-xs text-silver-mist">{nextLabel}</span>
            <p className="truncate font-heading text-sm text-star-white">
              {nextPost.title}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-celestial-gold" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
