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
            ? "bg-astral-violet text-star-white"
            : "bg-astral-violet/10 text-astral-violet hover:bg-astral-violet/20"
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
              ? "bg-astral-violet text-star-white"
              : "bg-astral-violet/10 text-astral-violet hover:bg-astral-violet/20"
          }`}
        >
          {cat.title}
        </Link>
      ))}
    </div>
  );
}
