import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface CategoryHeroProps {
  title: string;
  description: string;
  locale: string;
  heroImage?: { url: string; alt?: string } | null;
}

export function CategoryHero({
  title,
  description,
  heroImage,
}: CategoryHeroProps) {
  const tNav = useTranslations("nav");

  return (
    <section className="relative flex min-h-[40vh] items-end overflow-hidden bg-cosmic-bg md:min-h-[50vh]">
      {heroImage?.url ? (
        <>
          <Image
            src={heroImage.url}
            alt={heroImage.alt || title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-bg via-cosmic-bg/70 to-cosmic-bg/30" />
        </>
      ) : (
        <>
          {/* Fallback: atmospheric gradient + orbs */}
          <div className="absolute inset-0 bg-gradient-to-b from-midnight-navy/50 to-cosmic-bg" />
          <div className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-cosmic-purple/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-cosmic-violet/8 blur-[100px]" />
        </>
      )}

      {/* Content — pinned to bottom via items-end on section */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 md:pb-16 md:pt-40 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 text-small text-cosmic-white/40">
          <Link
            href="/"
            className="transition-colors hover:text-cosmic-white/70"
          >
            {tNav("home")}
          </Link>
          <span className="mx-2">&rarr;</span>
          <span className="text-cosmic-gold">{title}</span>
        </nav>

        {/* Title */}
        <h1 className="font-heading text-hero text-cosmic-white">{title}</h1>

        {/* Description */}
        {description && (
          <p className="mt-4 max-w-2xl font-body text-body text-cosmic-white/70">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
