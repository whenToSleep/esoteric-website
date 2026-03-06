import { getTranslations } from "next-intl/server";
import { DollarSign, Clock, Monitor } from "lucide-react";

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
    { icon: DollarSign, label: t("price_label"), value: price },
    { icon: Clock, label: t("duration_label"), value: duration },
    { icon: Monitor, label: t("format_label"), value: formatLabel },
  ].filter((item) => item.value);

  if (items.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-4 rounded-xl border border-celestial-gold/20 bg-midnight-navy p-5"
        >
          <item.icon className="h-6 w-6 shrink-0 text-celestial-gold" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-silver-mist">
              {item.label}
            </p>
            <p className="mt-1 text-base font-semibold text-star-white">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
