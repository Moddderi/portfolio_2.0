"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Compass } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { BentoCard, Eyebrow } from "./bento-card";
import { useLocale } from "@/i18n/locale-provider";

/** Operating principles borrowed from The Goal, The Toyota Way and the gym. Hover to expand. */
export function PrinciplesCard({ className }: { className?: string }) {
  const [open, setOpen] = useState(0);
  const { t } = useLocale();

  return (
    <BentoCard
      delay={0.16}
      className={className}
      glow="rgba(99, 102, 241, 0.2)"
      contentClassName="flex flex-col gap-4"
    >
      <Eyebrow icon={<Compass />}>{t.profile.principles.eyebrow}</Eyebrow>

      <ul className="space-y-1.5">
        {t.profile.principles.items.map((p, i) => {
          const active = open === i;
          return (
            <li key={p.name}>
              <button
                onPointerEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
                className={cn(
                  "w-full rounded-xl border px-3.5 py-2.5 text-left transition-colors",
                  active
                    ? "border-accent-indigo/40 bg-accent-indigo/10"
                    : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]",
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-white">{p.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                    {p.source}
                  </span>
                </span>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden text-[13px] leading-snug text-zinc-400"
                    >
                      <span className="block pt-1.5">{p.text}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>
    </BentoCard>
  );
}
