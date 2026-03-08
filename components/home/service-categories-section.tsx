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
          <h2 className="mb-8 text-center font-heading text-section text-cosmic-gold md:mb-12 lg:mb-16">
            {t("section_title")}
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-6 lg:gap-8">
          {categories.map((cat, index) => (
            <StaggerItem
              key={cat.id}
              className={`lg:col-span-2${index === 3 ? " lg:col-start-2" : ""}`}
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
