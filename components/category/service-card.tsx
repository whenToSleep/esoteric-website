import { Link } from "@/i18n/navigation";

interface ServiceCardProps {
  title: string;
  slug: string;
  categorySlug: string;
  shortDescription: string;
  price?: string;
  duration?: string;
}

export function ServiceCard({
  title,
  slug,
  categorySlug,
  shortDescription,
  price,
  duration,
}: ServiceCardProps) {
  return (
    <Link
      href={`/${categorySlug}/${slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-crimson-500/30 hover:shadow-[0_0_30px_-5px_rgba(185,28,60,0.25)] active:scale-[0.98] md:p-6 lg:p-8"
      style={{ background: "linear-gradient(180deg, #1C1C22 0%, #131316 100%)" }}
    >
      {/* Highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Title */}
      <h3 className="mb-3 font-heading text-card-title text-text-primary">
        {title}
      </h3>

      {/* Description */}
      <p className="flex-1 text-small leading-relaxed text-text-secondary">
        {shortDescription}
      </p>

      {/* Price + Duration */}
      {(price || duration) && (
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
          {price && (
            <span className="text-small font-medium text-gold-500">
              {price}
            </span>
          )}
          {duration && (
            <span className="text-small text-text-muted">
              {duration}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
