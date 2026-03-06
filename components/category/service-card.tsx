import { Link } from "@/i18n/navigation";
import { CategoryIcon } from "@/components/home/icon-map";

interface ServiceCardProps {
  title: string;
  slug: string;
  categorySlug: string;
  shortDescription: string;
  price?: string;
  duration?: string;
  icon?: string;
}

export function ServiceCard({
  title,
  slug,
  categorySlug,
  shortDescription,
  price,
  duration,
  icon,
}: ServiceCardProps) {
  return (
    <Link
      href={`/${categorySlug}/${slug}`}
      className="group block rounded-xl border border-celestial-gold/20 bg-midnight-navy p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
    >
      {icon && (
        <CategoryIcon
          name={icon}
          size={36}
          className="text-celestial-gold"
        />
      )}
      <h3 className="mt-3 font-heading text-lg text-star-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-silver-mist line-clamp-3">
        {shortDescription}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {price && (
          <span className="rounded-md bg-celestial-gold/10 px-3 py-1 text-xs font-medium text-celestial-gold">
            {price}
          </span>
        )}
        {duration && (
          <span className="rounded-md bg-astral-violet/10 px-3 py-1 text-xs font-medium text-astral-violet">
            {duration}
          </span>
        )}
      </div>
    </Link>
  );
}
