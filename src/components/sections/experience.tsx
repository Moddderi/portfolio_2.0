"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  BarChart3,
  Code2,
  Handshake,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { BentoCard } from "@/components/bento/bento-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechLabel } from "@/components/ui/tech-icon";
import { experience, type ExperienceEntry, type HatIcon } from "@/data/experience";
import { sectionNumber } from "@/data/sections";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/cn";

const HAT_ICONS: Record<HatIcon, LucideIcon> = {
  code: Code2,
  workflow: Workflow,
  bridge: Handshake,
  sparkles: Sparkles,
  chart: BarChart3,
};

/** Work history as a vertical timeline whose spine fills while you scroll. */
export function Experience() {
  const { t } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <section id="experience" className="mx-auto w-full max-w-7xl px-4 py-28 sm:px-6">
      <SectionHeading index={sectionNumber("experience")} label={t.experience.label}>
        {t.experience.titleA} <span className="text-zinc-500">{t.experience.titleB}</span>
      </SectionHeading>

      <div ref={ref} className="relative mt-14 pl-9 sm:pl-14">
        {/* Spine */}
        <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-white/10 sm:left-[15px]">
          <motion.div
            style={{ scaleY: fill }}
            className="h-full origin-top bg-gradient-to-b from-accent-indigo via-accent-violet to-accent-cyan"
          />
        </div>

        <ol className="space-y-8">
          {experience.map((entry, i) => (
            <TimelineEntry key={entry.id} entry={entry} delay={i * 0.05} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineEntry({ entry, delay }: { entry: ExperienceEntry; delay: number }) {
  const { t } = useLocale();
  const copy = t.experience.entries[entry.id];

  return (
    <li className="relative">
      {/* Node on the spine */}
      <span
        aria-hidden
        className={cn(
          "absolute -left-9 top-9 grid size-6 place-items-center rounded-full border sm:-left-14 sm:size-8",
          entry.current ? "border-emerald-400/50 bg-ink-950" : "border-accent-violet/50 bg-ink-950",
        )}
      >
        <span
          className={cn(
            "size-2 rounded-full sm:size-2.5",
            entry.current
              ? "animate-pulse bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.7)]"
              : "bg-accent-violet shadow-[0_0_12px_2px_rgba(139,92,246,0.7)]",
          )}
        />
      </span>

      <BentoCard
        delay={delay}
        tilt={0}
        glow={entry.current ? "rgba(52, 211, 153, 0.12)" : "rgba(99, 102, 241, 0.2)"}
        contentClassName="flex flex-col gap-7"
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">{copy.type}</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{entry.company}</h3>
            <p className="mt-1 text-base text-accent-cyan sm:text-lg">{copy.role}</p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs",
                entry.current
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                  : "border-white/10 bg-white/[0.04] text-zinc-400",
              )}
            >
              {entry.current && <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />}
              {copy.period}
            </span>

            <div className="text-right">
              <p className="text-gradient text-4xl font-semibold leading-none tracking-tight">
                {entry.highlightValue}
              </p>
              <p className="mt-1 max-w-[12rem] text-xs text-zinc-500">{copy.highlightLabel}</p>
            </div>
          </div>
        </div>

        {/* What I did – one tile per "hat" */}
        <ul className="grid gap-3 md:grid-cols-3">
          {copy.hats.map((hat, i) => {
            const Icon = HAT_ICONS[entry.hats[i]];
            return (
              <li
                key={hat.title}
                className="group/hat rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-accent-indigo/40 hover:bg-accent-indigo/[0.07]"
              >
                <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-accent-cyan transition-transform group-hover/hat:-translate-y-0.5">
                  <Icon className="size-4" />
                </span>
                <p className="mt-3 text-sm font-medium text-white">{hat.title}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500 transition-colors group-hover/hat:text-zinc-400">
                  {hat.text}
                </p>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
          <ul className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"
              >
                <TechLabel name={tag} iconClassName="size-3.5" />
              </li>
            ))}
          </ul>

          <a
            href={entry.ctaHref}
            className="group/cta inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-accent-cyan"
          >
            {copy.cta}
            <ArrowDown className="size-4 transition-transform group-hover/cta:translate-y-0.5" />
          </a>
        </div>
      </BentoCard>
    </li>
  );
}
