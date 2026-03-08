import Image from "next/image";
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
  featuredImageUrl,
  featuredImageAlt,
  categoryTitle,
}: FeaturedBlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block md:col-span-2 overflow-hidden rounded-2xl border border-cosmic-purple/15 bg-cosmic-card hover:border-cosmic-violet/40 transition-colors duration-300"
    >
      <div className="aspect-video lg:aspect-[21/9] relative overflow-hidden">
        {featuredImageUrl ? (
          <Image
            src={featuredImageUrl}
            alt={featuredImageAlt || title}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-cosmic-card to-cosmic-purple" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-cosmic-bg/90 via-cosmic-bg/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 lg:p-8">
          <span className="text-small font-body text-cosmic-gold uppercase tracking-wider">
            {categoryTitle || "Featured"}
          </span>
          <h3 className="font-heading text-card-title text-cosmic-white mt-2">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
