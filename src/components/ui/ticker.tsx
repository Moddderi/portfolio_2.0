import { cn } from "@/lib/cn";

type TickerProps = {
  items: readonly string[];
  reverse?: boolean;
  className?: string;
};

/** Infinite horizontal text ticker (pure CSS, seamless via duplicated track). */
export function Ticker({ items, reverse = false, className }: TickerProps) {
  const loop = [...items, ...items];

  return (
    <div
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex w-max animate-marquee items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            {item}
            <span className="text-accent-violet/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
