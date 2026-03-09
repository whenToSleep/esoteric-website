export function GradientDivider({
  from = "#0B0B0F",
  to = "#131316",
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
