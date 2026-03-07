import Image from "next/image";
import { Link } from "@/i18n/navigation";

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
  readMoreLabel,
  minReadLabel,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden rounded-xl border border-celestial-gold/20 bg-midnight-navy transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
    >
      <div className="relative aspect-video w-full">
        {featuredImageUrl ? (
          <Image
            src={featuredImageUrl}
            alt={featuredImageAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-midnight-navy to-mystic-purple" />
        )}
      </div>
      <div className="p-5 md:p-6 lg:p-8">
        <div className="flex items-center gap-3">
          {categoryTitle && (
            <span className="rounded-md bg-astral-violet/10 px-3 py-1 text-xs font-medium text-astral-violet">
              {categoryTitle}
            </span>
          )}
          {publishedAt && (
            <time className="text-sm text-silver-mist">
              {new Date(publishedAt).toLocaleDateString()}
            </time>
          )}
          {readingTime && (
            <span className="text-sm text-silver-mist">
              {readingTime} {minReadLabel}
            </span>
          )}
        </div>
        <h3 className="mt-3 font-heading text-lg text-star-white line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-silver-mist line-clamp-3">
            {excerpt}
          </p>
        )}
        <span className="mt-4 inline-block text-sm font-medium text-celestial-gold">
          {readMoreLabel}
        </span>
      </div>
    </Link>
  );
}
