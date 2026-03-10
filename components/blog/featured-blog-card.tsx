import Image from "next/image";
import { FileText } from "lucide-react";
import { TransitionLink as Link } from "@/components/ui/transition-link";

interface FeaturedBlogCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  categoryTitle?: string;
  publishedAt?: string;
  readingTime?: number;
  readMoreLabel: string;
  minReadLabel: string;
}

export function FeaturedBlogCard({
  title,
  slug,
  excerpt,
  featuredImageUrl,
  featuredImageAlt,
  categoryTitle,
  publishedAt,
  readingTime,
  minReadLabel,
}: FeaturedBlogCardProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-overlay/50 bg-onyx
                 transition-all duration-500 hover:border-crimson-500/30 hover:-translate-y-1
                 active:scale-[0.98]
                 lg:flex-row"
    >
      {/* Image — left on desktop, top on mobile */}
      <div className="relative w-full overflow-hidden lg:w-1/2">
        <div className="relative h-[220px] sm:h-[280px] lg:h-full lg:min-h-[280px] max-h-[350px]">
          {featuredImageUrl ? (
            <Image
              src={featuredImageUrl}
              alt={featuredImageAlt || title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-crimson-950 via-onyx to-obsidian">
              <FileText className="h-16 w-16 text-crimson-400/30" strokeWidth={1} />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-void/60 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-void/40" />
        </div>
      </div>

      {/* Text — right on desktop, bottom on mobile */}
      <div className="flex flex-col justify-center p-5 sm:p-6 lg:w-1/2 lg:p-8">
        {categoryTitle && (
          <span className="mb-3 inline-block w-fit rounded-full bg-crimson-950 px-3 py-1 text-xs font-medium text-crimson-400">
            {categoryTitle}
          </span>
        )}

        <h3 className="font-heading text-card-title text-text-primary line-clamp-2">
          {title}
        </h3>

        {excerpt && (
          <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary line-clamp-3">
            {excerpt}
          </p>
        )}

        {(formattedDate || readingTime) && (
          <p className="mt-4 text-xs text-text-muted">
            {formattedDate}
            {formattedDate && readingTime && " · "}
            {readingTime && `${readingTime} ${minReadLabel}`}
          </p>
        )}
      </div>
    </Link>
  );
}
