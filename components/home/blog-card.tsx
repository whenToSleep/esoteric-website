import Image from "next/image";
import { FileText } from "lucide-react";
import { TransitionLink as Link } from "@/components/ui/transition-link";

interface BlogCardProps {
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

export function BlogCard({
  title,
  slug,
  excerpt,
  featuredImageUrl,
  featuredImageAlt,
  categoryTitle,
  publishedAt,
  readingTime,
  minReadLabel,
}: BlogCardProps) {
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
      className="group flex h-full flex-col overflow-hidden rounded-3xl
                 border border-overlay/50 bg-onyx
                 transition-all duration-500
                 hover:border-crimson-500/30
                 hover:-translate-y-1
                 active:scale-[0.98]"
    >
      {/* Image block */}
      <div className="relative aspect-video w-full overflow-hidden">
        {featuredImageUrl ? (
          <Image
            src={featuredImageUrl}
            alt={featuredImageAlt || title}
            width={600}
            height={340}
            className="h-full w-full object-cover transition-transform duration-500
                       group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-crimson-950 via-onyx to-obsidian">
            <FileText className="h-12 w-12 text-crimson-400/30" strokeWidth={1} />
          </div>
        )}

        {categoryTitle && (
          <span className="absolute bottom-3 left-3 rounded-full bg-crimson-950 px-3 py-1 text-xs font-medium text-crimson-400">
            {categoryTitle}
          </span>
        )}
      </div>

      {/* Text block */}
      <div className="flex flex-grow flex-col p-5">
        {(formattedDate || readingTime) && (
          <p className="text-xs text-text-muted">
            {formattedDate}
            {formattedDate && readingTime && " · "}
            {readingTime && `${readingTime} ${minReadLabel}`}
          </p>
        )}

        <h3 className="mt-2 font-heading text-lg text-text-primary line-clamp-2">
          {title}
        </h3>

        {excerpt && (
          <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary line-clamp-2">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
