import { Link } from "@/i18n/navigation";
import { CategoryIcon } from "@/components/home/icon-map";

interface ServiceCategoryCardProps {
  title: string;
  shortDescription: string;
  icon: string;
  slug: string;
}

export function ServiceCategoryCard({
  title,
  shortDescription,
  icon,
  slug,
}: ServiceCategoryCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className="group block w-full rounded-xl border border-celestial-gold/20 bg-midnight-navy p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
    >
      <CategoryIcon
        name={icon}
        size={40}
        className="text-celestial-gold"
      />
      <h3 className="mt-4 font-heading text-xl text-star-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-silver-mist">
        {shortDescription}
      </p>
    </Link>
  );
}
