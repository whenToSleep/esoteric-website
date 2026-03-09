import { getTranslations } from "next-intl/server";

interface ServiceInfoBlockProps {
  price?: string;
  duration?: string;
  format?: string;
}

export async function ServiceInfoBlock({
  price,
  duration,
  format,
}: ServiceInfoBlockProps) {
  const t = await getTranslations("service");

  const formatLabel =
    format === "online"
      ? t("format_online")
      : format === "offline"
        ? t("format_offline")
        : format === "both"
          ? t("format_both")
          : null;

  const items = [
    { label: t("price_label"), value: price, accent: true },
    { label: t("duration_label"), value: duration, accent: false },
    { label: t("format_label"), value: formatLabel, accent: false },
  ].filter((item) => item.value);

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-overlay/50 p-5 text-center"
          style={{
            background: "linear-gradient(180deg, #1C1C22 0%, #131316 100%)",
          }}
        >
          <p className="text-small text-text-muted">{item.label}</p>
          <p
            className={`mt-1 text-lg font-medium ${
              item.accent ? "text-gold-500" : "text-text-primary"
            }`}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
