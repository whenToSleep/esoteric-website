import { Layers, Flame, Compass, BookOpen, Eye } from "lucide-react";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  cards: Layers,
  candle: Flame,
  compass: Compass,
  book: BookOpen,
  spiral: Eye,
};

export interface AccentConfig {
  iconColor: string;
  borderGlow: string;
  shadowGlow: string;
  bgTint: string;
  iconBg: string;
  iconBorder: string;
  linkColor: string;
}

const defaultAccent: AccentConfig = {
  iconColor: "text-crimson-400",
  borderGlow: "rgba(185,28,60,0.3)",
  shadowGlow:
    "0 0 30px -5px rgba(185,28,60,0.25), 0 0 60px -15px rgba(185,28,60,0.1)",
  bgTint: "rgba(185,28,60,0.03)",
  iconBg: "bg-crimson-950/20",
  iconBorder: "border-crimson-950/30",
  linkColor: "text-crimson-400",
};

const accentMap: Record<string, AccentConfig> = {
  // Таро — crimson
  cards: { ...defaultAccent },
  // Ритуалистика — gold
  candle: {
    iconColor: "text-gold-500",
    borderGlow: "rgba(201,168,76,0.3)",
    shadowGlow:
      "0 0 30px -5px rgba(201,168,76,0.25), 0 0 60px -15px rgba(201,168,76,0.1)",
    bgTint: "rgba(201,168,76,0.03)",
    iconBg: "bg-[rgba(201,168,76,0.08)]",
    iconBorder: "border-[rgba(201,168,76,0.15)]",
    linkColor: "text-gold-500",
  },
  // Сопровождение — rose
  compass: {
    iconColor: "text-[#F4A0B5]",
    borderGlow: "rgba(244,160,181,0.3)",
    shadowGlow:
      "0 0 30px -5px rgba(244,160,181,0.25), 0 0 60px -15px rgba(244,160,181,0.1)",
    bgTint: "rgba(244,160,181,0.03)",
    iconBg: "bg-[rgba(244,160,181,0.08)]",
    iconBorder: "border-[rgba(244,160,181,0.15)]",
    linkColor: "text-[#F4A0B5]",
  },
  // Обучение — emerald
  book: {
    iconColor: "text-emerald-400",
    borderGlow: "rgba(52,208,123,0.3)",
    shadowGlow:
      "0 0 30px -5px rgba(52,208,123,0.25), 0 0 60px -15px rgba(52,208,123,0.1)",
    bgTint: "rgba(52,208,123,0.03)",
    iconBg: "bg-emerald-950/20",
    iconBorder: "border-emerald-950/30",
    linkColor: "text-emerald-400",
  },
  // Регресс — amethyst
  spiral: {
    iconColor: "text-[#9F7AEA]",
    borderGlow: "rgba(159,122,234,0.3)",
    shadowGlow:
      "0 0 30px -5px rgba(159,122,234,0.25), 0 0 60px -15px rgba(159,122,234,0.1)",
    bgTint: "rgba(159,122,234,0.03)",
    iconBg: "bg-[rgba(159,122,234,0.08)]",
    iconBorder: "border-[rgba(159,122,234,0.15)]",
    linkColor: "text-[#9F7AEA]",
  },
};

export function getAccentConfig(icon: string): AccentConfig {
  return accentMap[icon] || defaultAccent;
}

export function CategoryIcon({
  name,
  ...props
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = iconMap[name] || Layers;
  return <Icon {...props} />;
}
