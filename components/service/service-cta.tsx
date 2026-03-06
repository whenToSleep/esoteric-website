import { getTranslations } from "next-intl/server";

interface ServiceCtaProps {
  serviceTitle: string;
}

export async function ServiceCta({ serviceTitle }: ServiceCtaProps) {
  const t = await getTranslations("service");

  return (
    <section
      className="px-4 py-16 md:py-20 lg:py-24"
      style={{
        background: "linear-gradient(135deg, #2D1B69 0%, #0D1137 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-2xl font-semibold text-star-white md:text-3xl lg:text-4xl">
          {t("book_title", { title: serviceTitle })}
        </h2>
        <a
          href="#"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-celestial-gold px-8 py-3 text-base font-semibold text-cosmic-black transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_4px_12px_rgba(212,175,55,0.3)]"
        >
          {t("book_button")}
        </a>
      </div>
    </section>
  );
}
