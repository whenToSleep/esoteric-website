import Image from "next/image";
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
  featured?: boolean;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  featuredImageUrl,
  featuredImageAlt,
  categoryTitle,
  featured = false,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={`group flex overflow-hidden rounded-3xl
                 border border-overlay/50
                 transition-all duration-500
                 hover:border-crimson-500/30
                 hover:shadow-[0_0_25px_-5px_rgba(185,28,60,0.2)]
                 hover:-translate-y-1
                 active:scale-[0.98]
                 ${featured ? "flex-col md:flex-row" : "flex-col"}`}
      style={{ background: "linear-gradient(180deg, #1C1C22 0%, #131316 100%)" }}
    >
      {/* Image */}
      <div
        className={`w-full overflow-hidden ${
          featured ? "aspect-video md:aspect-auto md:w-1/2" : "aspect-video"
        }`}
      >
        {featuredImageUrl ? (
          <Image
            src={featuredImageUrl}
            alt={featuredImageAlt || title}
            width={featured ? 800 : 600}
            height={featured ? 500 : 340}
            className="h-full w-full object-cover transition-transform duration-500
                       group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center
                        bg-linear-to-br from-crimson-950/20 via-void to-onyx/30"
          >
            <svg
              className="h-10 w-10 text-text-primary/10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`flex flex-1 flex-col p-5 md:p-6 ${
          featured ? "md:justify-center md:p-8" : ""
        }`}
      >
        {categoryTitle && (
          <span
            className="mb-3 self-start rounded-full bg-crimson-950 px-3 py-1 text-xs
                         font-medium uppercase tracking-wider text-crimson-400"
          >
            {categoryTitle}
          </span>
        )}

        <h3
          className={`font-heading text-text-primary line-clamp-2 ${
            featured
              ? "text-card-title md:text-2xl"
              : "text-card-title"
          }`}
        >
          {title}
        </h3>

        {excerpt && (
          <p
            className={`mt-3 flex-1 font-body text-sm leading-relaxed text-text-secondary ${
              featured ? "line-clamp-4" : "line-clamp-3"
            }`}
          >
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
