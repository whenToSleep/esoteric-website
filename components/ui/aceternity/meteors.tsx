import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

// Deterministic positions to avoid hydration mismatch
const meteorData = [
  { left: "4%", delay: "0.2s", duration: "2.1s" },
  { left: "14%", delay: "0.8s", duration: "1.8s" },
  { left: "24%", delay: "1.4s", duration: "2.4s" },
  { left: "34%", delay: "0.1s", duration: "1.9s" },
  { left: "44%", delay: "1.0s", duration: "2.2s" },
  { left: "54%", delay: "0.5s", duration: "2.0s" },
  { left: "64%", delay: "1.6s", duration: "1.7s" },
  { left: "74%", delay: "0.3s", duration: "2.3s" },
  { left: "84%", delay: "1.2s", duration: "1.8s" },
  { left: "92%", delay: "0.7s", duration: "2.1s" },
  { left: "8%", delay: "1.8s", duration: "2.0s" },
  { left: "18%", delay: "0.4s", duration: "2.5s" },
  { left: "28%", delay: "1.1s", duration: "1.6s" },
  { left: "38%", delay: "0.9s", duration: "2.2s" },
  { left: "48%", delay: "1.5s", duration: "1.9s" },
  { left: "58%", delay: "0.6s", duration: "2.3s" },
  { left: "68%", delay: "1.3s", duration: "1.8s" },
  { left: "78%", delay: "0.2s", duration: "2.1s" },
  { left: "88%", delay: "1.7s", duration: "2.0s" },
  { left: "96%", delay: "0.8s", duration: "1.7s" },
];

export function Meteors({ number = 20, className }: MeteorsProps) {
  const meteors = meteorData.slice(0, number);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {meteors.map((meteor, idx) => (
        <span
          key={idx}
          className="meteor absolute top-0 h-0.5 w-0.5 rotate-[215deg] rounded-full bg-text-primary shadow-[0_0_0_1px_rgba(240,235,224,0.06)]"
          style={{
            left: meteor.left,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        >
          <span className="absolute top-1/2 -z-10 h-px w-12 -translate-y-1/2 bg-linear-to-r from-text-primary/60 to-transparent" />
        </span>
      ))}
    </div>
  );
}
