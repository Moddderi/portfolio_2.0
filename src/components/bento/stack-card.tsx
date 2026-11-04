"use client";

import { Layers } from "lucide-react";
import { TechLabel } from "@/components/ui/tech-icon";
import { stack } from "@/data/profile";
import { useLocale } from "@/i18n/locale-provider";
import { BentoCard, Eyebrow } from "./bento-card";

export function StackCard({ className }: { className?: string }) {
  const { t } = useLocale();
  // Duplicated once so the -50% translate loops seamlessly.
  const loop = [...stack, ...stack];

  return (
    <BentoCard
      delay={0.1}
      className={className}
      tilt={0}
      contentClassName="flex flex-col justify-between gap-6 !px-0"
    >
      <div className="px-6 sm:px-7">
        <Eyebrow icon={<Layers />}>{t.profile.stack.eyebrow}</Eyebrow>
        <p className="mt-3 text-lg font-medium tracking-tight text-white">
          {t.profile.stack.text}
        </p>
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="flex w-max animate-marquee gap-3 py-1 hover:[animation-play-state:paused]">
          {loop.map((tech, i) => (
            <li
              key={`${tech}-${i}`}
              aria-hidden={i >= stack.length}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-accent-violet/50 hover:bg-accent-violet/10 hover:text-white"
            >
              <TechLabel name={tech} iconClassName="size-4" className="gap-2" />
            </li>
          ))}
        </ul>
      </div>
    </BentoCard>
  );
}
