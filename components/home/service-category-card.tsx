import { Link } from "@/i18n/navigation";
import { CategoryIcon } from "@/components/home/icon-map";

interface ServiceCategoryCardProps {
  title: string;
  shortDescription: string;
  icon: string;
  slug: string;
  learnMoreText: string;
}

export function ServiceCategoryCard({
  title,
  shortDescription,
  icon,
  slug,
  learnMoreText,
}: ServiceCategoryCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className="group block w-full rounded-2xl border border-cosmic-purple/20 bg-cosmic-card p-5 transition-all duration-300 hover:border-cosmic-violet/40 hover:shadow-[0_0_25px_-5px_rgba(124,58,237,0.2)] hover:-translate-y-1 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic-violet md:p-6 lg:p-8"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cosmic-purple/30 text-cosmic-violet">
        <CategoryIcon name={icon} size={24} />
      </div>
      <h3 className="font-heading text-card-title text-cosmic-white">
        {title}
      </h3>
      <p className="mt-3 text-small leading-relaxed text-cosmic-white/70">
        {shortDescription}
      </p>
      <span className="mt-4 inline-flex items-center text-small font-medium text-cosmic-violet transition-transform group-hover:translate-x-1">
        {learnMoreText} →
      </span>
    </Link>
  );
}
