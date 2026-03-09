import { getTranslations } from "next-intl/server";
import { ServiceCategoryCard } from "@/components/home/service-category-card";
import { ScrollReveal } from "@/components/animations";
import { StaggerContainer, StaggerItem } from "@/components/animations";

interface Category {
  id: string | number;
  title: string;
  slug: string;
  shortDescription: string;
  icon: string;
}

function getGridClasses(index: number): string {
  // Таро (index 0): spans 2 columns on desktop
  if (index === 0) return "lg:col-span-2";
  return "";
}

function getMinHeight(index: number): string {
  // First row (Таро + Ритуалы) taller
  if (index <= 1) return "min-h-[280px] lg:min-h-[320px]";
  return "min-h-[280px]";
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
        <ScrollReveal direction="up">
          <h2 className="mb-8 text-center font-heading text-section text-gold-500 md:mb-12 lg:mb-16">
            {t("section_title")}
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {categories.map((cat, index) => (
            <StaggerItem
              key={cat.id}
              className={`${getGridClasses(index)} ${getMinHeight(index)}`}
            >
              <ServiceCategoryCard
                title={cat.title}
                shortDescription={cat.shortDescription}
                icon={cat.icon}
                slug={cat.slug}
                learnMoreText={t("learn_more")}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
