import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface CategoryHeroProps {
  title: string;
  description: string;
  locale: string;
}

export function CategoryHero({ title, description }: CategoryHeroProps) {
  const tNav = useTranslations("nav");

  return (
    <section className="relative overflow-hidden bg-cosmic-bg py-20 md:py-28 lg:py-36">
      {/* Atmospheric gradient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-cosmic-purple/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-cosmic-violet/8 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-small text-cosmic-white/40">
          <Link href="/" className="transition-colors hover:text-cosmic-white/70">
            {tNav("home")}
          </Link>
          <span className="mx-2">&rarr;</span>
          <span className="text-cosmic-gold">{title}</span>
        </nav>

        {/* Title */}
        <h1 className="font-heading text-hero text-cosmic-white">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="mx-auto mt-6 max-w-2xl font-body text-body text-cosmic-white/70">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
