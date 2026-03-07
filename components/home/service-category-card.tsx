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
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/[0.08] p-5 shadow-lg shadow-purple-900/10 transition-all duration-300 hover:border-cosmic-violet/40 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.25),0_0_60px_-15px_rgba(124,58,237,0.1)] hover:-translate-y-1 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic-violet md:p-6 lg:p-8"
      style={{ background: 'linear-gradient(180deg, #16161E 0%, #111118 100%)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-cosmic-purple/30 bg-cosmic-purple/20 text-cosmic-violet">
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
