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
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-cosmic-purple/15 bg-cosmic-card hover:border-cosmic-violet/40 transition-colors duration-300"
    >
      <div className="aspect-video overflow-hidden">
        {featuredImageUrl ? (
          <Image
            src={featuredImageUrl}
            alt={featuredImageAlt || title}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-cosmic-card to-cosmic-purple" />
        )}
      </div>
      <div className="p-5 lg:p-6">
        {categoryTitle && (
          <span className="text-small font-body text-cosmic-violet">
            {categoryTitle}
          </span>
        )}
        <h3 className="font-heading text-card-title text-cosmic-white mt-2 line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="font-body text-small text-cosmic-white/60 mt-2 line-clamp-3">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
