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
