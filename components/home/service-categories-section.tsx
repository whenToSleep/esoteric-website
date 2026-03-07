import { getTranslations } from "next-intl/server";
import { ServiceCategoryCard } from "@/components/home/service-category-card";

interface Category {
  id: string | number;
  title: string;
  slug: string;
  shortDescription: string;
  icon: string;
}

export async function ServiceCategoriesSection({
  categories,
}: {
  categories: Category[];
}) {
  const t = await getTranslations("home.services");

  return (
    <section id="services" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-30">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center font-heading text-2xl font-semibold text-celestial-gold md:mb-12 md:text-3xl lg:mb-16 lg:text-4xl">
          {t("section_title")}
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {categories.map((cat) => (
            <ServiceCategoryCard
              key={cat.id}
              title={cat.title}
              shortDescription={cat.shortDescription}
              icon={cat.icon}
              slug={cat.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
