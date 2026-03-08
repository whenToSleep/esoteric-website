export function GradientDivider({
  from = "#0A0A0F",
  to = "#0E0E14",
}: {
  from?: string;
  to?: string;
}) {
  return (
    <div
      className="h-16 md:h-20"
      style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
    />
  );
}
