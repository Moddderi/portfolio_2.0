"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { books } from "@/data/profile";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { BentoCard, Eyebrow } from "./bento-card";
import { useLocale } from "@/i18n/locale-provider";

/**
 * Growth directions (0–100). Decorative self-assessment – the order matches
 * `t.profile.books.radar`.
 */
const LEVELS = [92, 76, 86, 82, 68, 80] as const;

const CX = 160;
const CY = 118;
const R = 78;
const RINGS = [0.25, 0.5, 0.75, 1] as const;

function point(index: number, ratio: number, radius = R) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / LEVELS.length;
  return { x: CX + Math.cos(angle) * radius * ratio, y: CY + Math.sin(angle) * radius * ratio, angle };
}

const ringPaths = RINGS.map((ratio) =>
  LEVELS.map((_, i) => {
    const p = point(i, ratio);
    return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ") + " Z",
);

const dataPoints = LEVELS.map((level, i) => point(i, level / 100));
const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";

export function BooksCard({ className }: { className?: string }) {
  const { t } = useLocale();
  const b = t.profile.books;

  return (
    <BentoCard
      delay={0.05}
      className={className}
      glow="rgba(167, 139, 250, 0.2)"
      contentClassName="flex flex-col gap-5"
    >
      <Eyebrow icon={<BookOpen />}>{b.eyebrow}</Eyebrow>

      <div className="flex items-baseline gap-1">
        <AnimatedNumber
          value={books.count}
          className="text-gradient text-7xl font-semibold leading-none tracking-tighter tabular-nums"
        />
        <span className="text-gradient text-5xl font-semibold leading-none">+</span>
        <span className="ml-2 text-sm text-zinc-500">{b.read}</span>
      </div>

      <p className="text-sm leading-relaxed text-zinc-400">{b.summary}</p>

      {/* Growth radar */}
      <figure className="mt-auto">
        <svg viewBox="0 0 320 236" className="w-full" role="img" aria-label={b.radarTitle}>
          <defs>
            <linearGradient id="radar-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {ringPaths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          ))}
          {LEVELS.map((_, i) => {
            const end = point(i, 1);
            return <line key={i} x1={CX} y1={CY} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.08)" />;
          })}

          <motion.path
            d={dataPath}
            fill="url(#radar-fill)"
            stroke="#a78bfa"
            strokeWidth="1.5"
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
          {dataPoints.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="#22d3ee"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.06 }}
            />
          ))}

          {b.radar.map((label, i) => {
            const p = point(i, 1, R + 16);
            const cos = Math.cos(p.angle);
            const anchor = Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";
            return (
              <text
                key={label}
                x={p.x}
                y={p.y}
                textAnchor={anchor}
                dominantBaseline="middle"
                className="fill-zinc-400 text-[10px]"
              >
                {label}
              </text>
            );
          })}
        </svg>
        <figcaption className="text-center font-mono text-[10px] uppercase tracking-widest text-zinc-600">
          {b.radarTitle}
        </figcaption>
      </figure>

      <div className="flex flex-col gap-1.5 border-t border-white/[0.07] pt-4">
        {b.list.map((book) => (
          <div key={book.title} className="flex items-baseline justify-between gap-3 text-[13px]">
            <span className="min-w-0 font-medium italic text-zinc-200">{book.title}</span>
            <span className="shrink-0 text-right text-xs text-zinc-500">{book.author}</span>
          </div>
        ))}
        <p className="pt-1 font-mono text-[11px] text-zinc-600">{b.more}</p>
      </div>
    </BentoCard>
  );
}
