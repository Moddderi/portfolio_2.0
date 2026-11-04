"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Check, TrendingDown, User, Wallet } from "lucide-react";
import { useRef, useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { bypass } from "@/data/profile";
import {
  CONSTRAINT_INDEX,
  modelSteps,
  type ModelStep,
} from "@/data/bypass-model";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/cn";

const TARGET = 50; // target time, constant (% of chart height)
const MAX_TEAM = modelSteps[0].team;

/** Scroll-pinned story: the Theory of Constraints, played step by step as you scroll. */
export function BypassStory() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(modelSteps.length - 1, Math.max(0, Math.floor(v * modelSteps.length)));
    setIndex((prev) => (prev === next ? prev : next));
  });

  const step = modelSteps[index];
  const copy = t.bypass.steps[index];

  const facts = [
    { value: `~${bypass.companySize}`, label: t.bypass.facts.company },
    { value: `${bypass.reduction.before} → ${bypass.reduction.after}`, label: t.bypass.facts.department },
    { value: String(bypass.cases), label: t.bypass.facts.cases },
  ];

  return (
    <section id="bypass" ref={ref} className="relative h-[560vh]">
      <div className="sticky top-0 flex h-dvh items-start overflow-hidden px-4 pt-[4.75rem] sm:px-6 lg:items-center lg:pt-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-3 sm:gap-6 lg:grid-cols-[0.95fr_1.1fr] lg:gap-14">
          {/* ── Narrative ── */}
          <div className="flex flex-col gap-2.5 sm:gap-5 lg:gap-7">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent-cyan sm:text-xs">
              <span>04</span>
              <span className="h-px w-10 bg-accent-cyan/40" />
              <span>{t.bypass.eyebrow} · {bypass.company}</span>
            </div>

            <h2 className="text-[1.65rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="text-gradient">{t.bypass.titleA}</span>
              <br />
              <span className="text-zinc-500">{t.bypass.titleB}</span>
            </h2>

            <div className="relative min-h-[8.5rem] sm:min-h-[11.5rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-violet">
                    {copy.kicker}
                  </p>
                  <h3 className="mt-1.5 text-base font-semibold leading-snug text-white sm:mt-2 sm:text-2xl">{copy.title}</h3>
                  <p className="mt-2 max-w-lg text-[13px] leading-snug text-zinc-400 sm:mt-3 sm:text-[15px] sm:leading-relaxed">{copy.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2" aria-hidden>
              {modelSteps.map((s, i) => (
                <span key={s.key} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan"
                    animate={{ width: i <= index ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </span>
              ))}
            </div>

            <dl className="hidden grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col bg-ink-900/80 px-4 py-3 backdrop-blur">
                  <dt className="order-2 text-[11px] text-zinc-500">{fact.label}</dt>
                  <dd className="text-xl font-semibold tabular-nums text-white">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Simulator ── */}
          <FlowSimulator step={step} index={index} final={index === modelSteps.length - 1} />
        </div>
      </div>
    </section>
  );
}

function FlowSimulator({ step, index, final }: { step: ModelStep; index: number; final: boolean }) {
  const { t } = useLocale();
  const sim = t.bypass.sim;
  const solved = step.times[CONSTRAINT_INDEX] <= TARGET;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-850/70 p-3 shadow-[0_30px_80px_-30px_rgba(99,102,241,0.45)] backdrop-blur-xl sm:rounded-3xl sm:p-6">
      <div className="mb-2 flex sm:mb-4 items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        <span>{sim.title}</span>
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              "size-1.5 rounded-full",
              step.alert ? "animate-pulse bg-amber-400" : "bg-emerald-400",
            )}
          />
          {step.alert ? sim.bottleneck : sim.flowing}
        </span>
      </div>

      {/* Legend: how to read the chart */}
      <div className="mb-3 hidden flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-zinc-500 sm:flex">
        <span className="font-mono uppercase tracking-widest text-zinc-400">{sim.chartTitle} →</span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-accent-indigo/50 bg-accent-indigo/40" />
          {sim.legendBar}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 border-t border-dashed border-white/50" />
          {sim.legendLine}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-amber-400/80" />
          {sim.legendAlert}
        </span>
      </div>

      {/* Capacity chart */}
      <div className="relative mt-5 h-24 sm:mt-0 sm:h-48">
        {/* demand line */}
        <div
          aria-hidden
          className="absolute inset-x-0 z-10 border-t border-dashed border-white/30"
          style={{ bottom: `${TARGET}%` }}
        >
          <span className="absolute -top-2.5 right-0 bg-ink-850 px-1.5 font-mono text-[9px] uppercase tracking-widest text-zinc-400">
            {sim.required}
          </span>
        </div>

        <div className="absolute inset-0 grid grid-cols-5 items-end gap-2 sm:gap-3">
          {t.bypass.stages.map((name, i) => {
            const isConstraint = i === CONSTRAINT_INDEX;
            const time = step.times[i];
            return (
              <div key={name} className="relative flex h-full items-end">
                <motion.div
                  animate={{ height: `${time}%` }}
                  transition={{ type: "spring", stiffness: 90, damping: 16 }}
                  className={cn(
                    "relative w-full rounded-t-xl border border-b-0",
                    isConstraint && step.alert
                      ? "border-amber-300/60 bg-gradient-to-t from-red-500/30 to-amber-400/70 shadow-[0_0_40px_-4px_rgba(251,191,36,0.6)]"
                      : isConstraint && solved
                        ? "border-accent-cyan/60 bg-gradient-to-t from-accent-indigo/30 to-accent-cyan/70 shadow-[0_0_40px_-4px_rgba(34,211,238,0.55)]"
                        : "border-accent-indigo/40 bg-gradient-to-t from-accent-indigo/10 to-accent-indigo/50",
                  )}
                >
                  {isConstraint && step.alert && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider text-amber-300">
                      ⏱ {sim.mostTime}
                    </span>
                  )}
                  {isConstraint && step.alert && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-t-xl bg-amber-300/30"
                      animate={{ opacity: [0, 0.6, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2 grid grid-cols-5 gap-2 text-center sm:gap-3">
        {t.bypass.stages.map((name, i) => (
          <span
            key={name}
            className={cn(
              "truncate font-mono text-[10px] uppercase tracking-wider",
              i === CONSTRAINT_INDEX && step.alert ? "text-amber-300" : "text-zinc-500",
            )}
          >
            {name}
          </span>
        ))}
      </div>

      {/* Plain-language reading of the current step */}
      <div className="relative mt-2 min-h-[3.4rem] rounded-xl border border-accent-violet/20 bg-accent-violet/[0.06] px-3 py-2 sm:mt-3 sm:min-h-[3.75rem] sm:py-2.5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-[11px] leading-snug text-zinc-300 sm:text-[12px]"
          >
            {sim.reading[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Work waiting in front of the constraint */}
      <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-black/25 px-3 py-1.5 sm:mt-3 sm:py-2">
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          {sim.waiting}
        </span>
        <div className="flex min-h-3 flex-1 flex-wrap gap-1">
          {Array.from({ length: modelSteps[0].queue }).map((_, i) => (
            <motion.span
              key={i}
              animate={{
                opacity: i < step.queue ? 1 : 0,
                scale: i < step.queue ? 1 : 0.3,
              }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="size-2.5 rounded-[3px] bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.7)]"
            />
          ))}
        </div>
        <span className="w-6 text-right font-mono text-sm tabular-nums text-white">{step.queue}</span>
      </div>

      {/* Metrics */}
      <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-3 sm:gap-3">
        <div className="rounded-xl border border-white/[0.06] bg-black/25 p-2.5 sm:p-3">
          <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            {sim.team}
            <span className="text-sm normal-case tracking-normal text-white tabular-nums">
              {step.team} <span className="text-zinc-600">/ {MAX_TEAM}</span>
            </span>
          </p>
          <div className="mt-1.5 grid grid-cols-4 gap-1 sm:mt-2 sm:gap-1.5">
            {Array.from({ length: MAX_TEAM }).map((_, i) => (
              <motion.span
                key={i}
                animate={{ opacity: i < step.team ? 1 : 0.15, scale: i < step.team ? 1 : 0.8 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                className="grid h-5 place-items-center rounded-md sm:h-7 sm:rounded-lg border border-accent-indigo/40 bg-accent-indigo/15 text-indigo-200"
              >
                <User className="size-3.5" />
              </motion.span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-black/25 p-2.5 sm:p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{sim.output}</p>
          <p className="mt-1 flex items-center gap-2 text-xl font-semibold text-white sm:mt-1.5 sm:text-2xl">
            <AnimatedNumber value={100} suffix={final ? "%+" : "%"} duration={1} />
            <Check className="size-5 text-emerald-400" />
          </p>
          <p className="text-[11px] text-zinc-500">
            {final ? sim.heldFinal : sim.held}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {final && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            className="absolute right-4 top-12 hidden items-center gap-2 rounded-2xl sm:flex border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 shadow-[0_0_50px_-8px_rgba(52,211,153,0.7)] backdrop-blur"
          >
            <TrendingDown className="size-6 shrink-0 text-emerald-300" />
            <span className="flex flex-col">
              <span className="text-2xl font-semibold leading-none text-white">
                {bypass.reduction.factor}×{" "}
                <span className="text-sm font-medium text-emerald-200">{sim.smaller}</span>
              </span>
              <span className="mt-1 flex items-center gap-1 text-xs text-emerald-200/80">
                <Wallet className="size-3" /> {sim.win}
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-2.5 hidden text-[11px] leading-snug text-zinc-600 sm:block">
        {sim.note}
      </p>
    </div>
  );
}
