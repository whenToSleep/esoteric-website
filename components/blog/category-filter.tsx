import { Link } from "@/i18n/navigation";

interface CategoryFilterProps {
  categories: { id: string; title: string; slug: string }[];
  activeCategorySlug?: string;
  allLabel: string;
}

export function CategoryFilter({
  categories,
  activeCategorySlug,
  allLabel,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          !activeCategorySlug
            ? "bg-crimson-500 text-text-primary"
            : "bg-crimson-950 text-crimson-400 hover:bg-crimson-950/80"
        }`}
      >
        {allLabel}
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/blog?category=${cat.slug}`}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeCategorySlug === cat.slug
              ? "bg-crimson-500 text-text-primary"
              : "bg-crimson-950 text-crimson-400 hover:bg-crimson-950/80"
          }`}
        >
          {cat.title}
        </Link>
      ))}
    </div>
  );
}
