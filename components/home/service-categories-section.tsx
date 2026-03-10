import { getTranslations } from "next-intl/server";
import { ServiceCategoryCard } from "@/components/home/service-category-card";
import { TextReveal } from "@/components/animations";
import { StaggerContainer, StaggerItem } from "@/components/animations";

interface Category {
  id: string | number;
  title: string;
  slug: string;
  shortDescription: string;
  icon: string;
}

// Desired bento order: Ритуалы (2col) | Обучение | Сопровождение | Таро | Регресс
const bentoOrder = ["candle", "book", "compass", "cards", "spiral"];

function getGridClasses(icon: string): string {
  // Ритуалы: spans 2 columns on desktop (first, large card)
  if (icon === "candle") return "lg:col-span-2";
  return "";
}

function getMinHeight(icon: string): string {
  // First row (Ритуалы + Обучение) taller
  if (icon === "candle" || icon === "book") return "min-h-[280px] lg:min-h-[320px]";
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
        <TextReveal
          text={t("section_title")}
          type="words"
          as="h2"
          className="mb-8 text-center font-heading text-section text-gold-500 md:mb-12 lg:mb-16"
        />
        <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {[...categories].sort((a, b) => bentoOrder.indexOf(a.icon) - bentoOrder.indexOf(b.icon)).map((cat) => (
            <StaggerItem
              key={cat.id}
              className={`${getGridClasses(cat.icon)} ${getMinHeight(cat.icon)}`}
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
