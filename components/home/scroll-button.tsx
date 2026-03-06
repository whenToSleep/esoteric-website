"use client";

export function ScrollButton({
  targetId,
  children,
  className,
}: {
  targetId: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el?.scrollIntoView({ behavior: prefersReduced ? "instant" : "smooth" });
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
