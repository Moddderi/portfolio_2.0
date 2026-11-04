"use client";

import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { BentoCard, Eyebrow } from "./bento-card";
import { useLocale } from "@/i18n/locale-provider";

const WEEKS = 14;
const DAYS = 7;

// Decorative consistency grid: Mon / Wed / Fri filled every week, no gaps.
 // Rows are Mon→Sun. Levels 1–3 vary colour like before (indigo → violet → cyan).
const TRAINING_DAYS = new Set([0, 2, 4]); // Mon, Wed, Fri
const cells = Array.from({ length: WEEKS * DAYS }, (_, i) => {
  const col = Math.floor(i / DAYS);
  const day = i % DAYS;
  if (!TRAINING_DAYS.has(day)) return 0;
  const score = (col * 5 + day * 3 + ((col * day) % 4)) % 7;
  return score < 3 ? 1 : score < 5 ? 2 : 3;
});

const LEVELS = [
  "bg-white/[0.05]",
  "bg-accent-indigo/30",
  "bg-accent-violet/60",
  "bg-accent-cyan/90",
] as const;

export function DisciplineCard({ className }: { className?: string }) {
  const { t } = useLocale();
  return (
    <BentoCard
      delay={0.14}
      className={className}
      glow="rgba(139, 92, 246, 0.2)"
      contentClassName="flex flex-col justify-between gap-5"
    >
      <Eyebrow icon={<Dumbbell />}>{t.profile.discipline.eyebrow}</Eyebrow>

      <div>
        <h3 className="text-xl font-semibold tracking-tight text-white">
          {t.profile.discipline.headline}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t.profile.discipline.summary}</p>
      </div>

      <div className="flex flex-col gap-1.5">
      <div
        aria-hidden
        className="grid grid-flow-col grid-rows-7 gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}
      >
        {cells.map((level, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: Math.floor(i / DAYS) * 0.03, duration: 0.35 }}
            className={`aspect-square rounded-[3px] ${LEVELS[level]}`}
          />
        ))}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">{t.profile.discipline.heatmapNote}</p>
      </div>

      <ul className="flex flex-wrap gap-2">
        {t.profile.discipline.principles.map((p) => (
          <li
            key={p}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-300"
          >
            {p}
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
