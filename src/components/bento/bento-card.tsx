"use client";

import type { ComponentProps, ReactNode } from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

type BentoCardProps = ComponentProps<typeof SpotlightCard> & {
  /** Stagger delay (seconds) for the entrance animation. */
  delay?: number;
};

/** SpotlightCard + scroll-triggered entrance. Every Bento tile is built on this. */
export function BentoCard({ delay = 0, ...props }: BentoCardProps) {
  return (
    <SpotlightCard
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}

type EyebrowProps = {
  icon: ReactNode;
  children: ReactNode;
};

/** Small uppercase label with an icon, used at the top of each tile. */
export function Eyebrow({ icon, children }: EyebrowProps) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
      <span className="grid size-6 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-accent-cyan [&>svg]:size-3.5">
        {icon}
      </span>
      {children}
    </div>
  );
}
