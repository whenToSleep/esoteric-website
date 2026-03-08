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
      className="group flex flex-col overflow-hidden rounded-2xl
                 border border-white/[0.08]
                 transition-all duration-300
                 hover:border-cosmic-violet/40
                 hover:shadow-[0_0_25px_-5px_rgba(124,58,237,0.2)]
                 hover:-translate-y-1
                 active:scale-[0.98]"
      style={{ background: "linear-gradient(180deg, #1A1A24 0%, #141419 100%)" }}
    >
      {/* Image or placeholder */}
      <div className="aspect-video w-full overflow-hidden">
        {featuredImageUrl ? (
          <Image
            src={featuredImageUrl}
            alt={featuredImageAlt || title}
            width={600}
            height={340}
            className="w-full h-full object-cover transition-transform duration-500
                       group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-cosmic-purple/20
                          via-cosmic-bg to-cosmic-card/30
                          flex items-center justify-center">
            <svg
              className="w-10 h-10 text-cosmic-white/10"
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
      <div className="flex flex-col flex-1 p-5 md:p-6">
        {categoryTitle && (
          <span className="self-start text-xs font-medium uppercase tracking-wider
                           text-cosmic-violet mb-3">
            {categoryTitle}
          </span>
        )}

        <h3 className="font-heading text-card-title text-cosmic-white mb-3 line-clamp-2">
          {title}
        </h3>

        {excerpt && (
          <p className="font-body text-small text-cosmic-white/60 leading-relaxed
                        line-clamp-3 flex-1">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
