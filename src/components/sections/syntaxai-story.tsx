"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  Loader2,
  MousePointerClick,
  NotebookPen,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { BentoCard } from "@/components/bento/bento-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechIcon, TechLabel } from "@/components/ui/tech-icon";
import { captureSamples, shots, type CaptureSample, type Shot } from "@/data/syntaxai-demo";
import { syntaxaiUrl } from "@/data/profile";
import { sectionNumber } from "@/data/sections";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/cn";

const FEATURE_ICONS: LucideIcon[] = [NotebookPen, Sparkles, MousePointerClick, BarChart3];

export function SyntaxAIStory() {
  const { t } = useLocale();
  const s = t.syntaxai;

  return (
    <section id="syntaxai" className="mx-auto w-full max-w-7xl px-4 py-28 sm:px-6">
      <SectionHeading index={sectionNumber("syntaxai")} label={s.label}>
        {s.titleA} <span className="text-gradient">SyntaxAI</span>{" "}
        <span className="text-zinc-500">{s.titleB}</span>
      </SectionHeading>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Image
          src="/logos/syntaxai-dark.png"
          alt="SyntaxAI logo"
          width={56}
          height={56}
          className="size-14 rounded-2xl border border-white/15 shadow-[0_0_40px_-8px_rgba(99,102,241,0.7)]"
        />
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
          {s.badge}
        </span>
        <span className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300">
          <TechLabel name="Chrome" iconClassName="size-3.5" />
          <TechLabel name="Firefox" iconClassName="size-3.5" />
        </span>
        <a
          href={syntaxaiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-950 shadow-[0_0_40px_-10px_rgba(255,255,255,0.6)] transition-transform hover:scale-[1.04]"
        >
          {s.visit} <ArrowUpRight className="size-4" />
        </a>
      </div>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-12">
        {/* Story + features */}
        <div className="flex min-w-0 flex-col gap-8">
          <p className="max-w-lg text-lg leading-relaxed text-zinc-400">{s.summary}</p>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {s.features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <motion.li
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-accent-cyan/30 hover:bg-accent-cyan/[0.04]"
                >
                  <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-accent-cyan">
                    <Icon className="size-4" />
                  </span>
                  <p className="mt-3 text-sm font-medium text-white">{feature.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500 transition-colors group-hover:text-zinc-400">
                    {feature.text}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <CaptureDemo />
      </div>

      <ProductShots />
    </section>
  );
}

/* ───────────────────────── "Add to SyntaxAI" demo ───────────────────────── */

type Phase = 0 | 1 | 2 | 3 | 4; // selected → menu → click → detecting → saved

function CaptureDemo() {
  const { t } = useLocale();
  const d = t.syntaxai.demo;

  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.5 });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [sampleId, setSampleId] = useState<CaptureSample["id"]>(captureSamples[0].id);
  const [phase, setPhase] = useState<Phase>(0);
  const [logIndex, setLogIndex] = useState(0);

  const sample = captureSamples.find((c) => c.id === sampleId) ?? captureSamples[0];
  const copy = d.samples[sample.id];

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const run = useCallback(() => {
    clear();
    setPhase(0);
    setLogIndex(0);
    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));
    at(900, () => setPhase(1));
    at(1900, () => setPhase(2));
    at(2400, () => setPhase(3));
    at(3000, () => setLogIndex(1));
    at(3600, () => setLogIndex(2));
    at(4300, () => setPhase(4));
  }, [clear]);

  useEffect(() => {
    if (inView) run();
    return clear;
  }, [inView, run, clear]);

  function pick(id: CaptureSample["id"]) {
    setSampleId(id);
    run();
  }

  return (
    <div ref={rootRef} className="min-w-0">
      <BentoCard tilt={0} glow="rgba(34, 211, 238, 0.14)" contentClassName="flex flex-col gap-4 !p-4 sm:!p-6">
        {/* Sample picker */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-zinc-600">{d.pick}</span>
          {captureSamples.map((c) => (
            <button
              key={c.id}
              onClick={() => pick(c.id)}
              aria-pressed={c.id === sampleId}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
                c.id === sampleId
                  ? "border-accent-cyan/50 bg-accent-cyan/10 text-white"
                  : "border-white/10 text-zinc-500 hover:border-white/25 hover:text-zinc-200",
              )}
            >
              <TechIcon name={c.icon} className="size-3.5" />
              {c.language}
            </button>
          ))}
        </div>

        {/* Mock documentation page */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-3 py-2">
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-zinc-500">
              {d.pageTitle}
            </span>
            <Image src="/logos/syntaxai-dark.png" alt="" width={20} height={20} className="size-5 rounded-md" />
          </div>

          <div className="relative p-4 sm:p-5">
            {/* skeleton text */}
            <span className="block h-2.5 w-2/5 rounded-full bg-white/20" />
            <span className="mt-3 block h-1.5 w-11/12 rounded-full bg-white/[0.08]" />
            <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-white/[0.08]" />

            {/* selected code */}
            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-[11px] leading-relaxed text-zinc-300 sm:text-xs">
              <code>
                <span className="box-decoration-clone rounded bg-accent-indigo/35 px-0.5 text-white">
                  {sample.code}
                </span>
              </code>
            </pre>

            {/* context menu */}
            <AnimatePresence>
              {(phase === 1 || phase === 2) && (
                <motion.ul
                  initial={{ opacity: 0, scale: 0.92, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute bottom-6 right-5 z-10 w-48 origin-top-left rounded-xl border border-white/15 bg-ink-900/95 p-1 text-xs shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] backdrop-blur"
                >
                  <li className="rounded-lg px-3 py-1.5 text-zinc-400">{d.menuCopy}</li>
                  <li className="rounded-lg px-3 py-1.5 text-zinc-400">{d.menuSearch}</li>
                  <li
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-1.5 font-medium transition-colors",
                      phase === 2 ? "bg-accent-indigo text-white" : "bg-white/[0.06] text-white",
                    )}
                  >
                    <Image src="/logos/syntaxai-dark.png" alt="" width={16} height={16} className="size-4 rounded" />
                    {d.menuAdd}
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Result area */}
        <div className="min-h-[11.5rem] rounded-2xl border border-white/[0.07] bg-black/30 p-4">
          <AnimatePresence mode="wait" initial={false}>
            {phase < 3 && (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid h-[9.5rem] place-items-center text-center text-sm text-zinc-600"
              >
                {d.note}
              </motion.p>
            )}

            {phase === 3 && (
              <motion.ul
                key="detecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2.5 font-mono text-xs"
              >
                {d.log.map((line, i) => (
                  <li
                    key={line}
                    className={cn(
                      "flex items-center gap-2 transition-opacity duration-300",
                      i > logIndex ? "opacity-0" : i === logIndex ? "text-white" : "text-zinc-600",
                    )}
                  >
                    {i < logIndex ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Loader2 className="size-3.5 animate-spin text-accent-cyan" />
                    )}
                    {line}
                  </li>
                ))}
              </motion.ul>
            )}

            {phase === 4 && (
              <motion.div
                key="saved"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="flex gap-4"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-black/60">
                  <TechIcon name={sample.icon} className="size-7" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-white">{copy.title}</p>
                    <span className="rounded-md border border-accent-cyan/30 bg-accent-cyan/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-cyan">
                      {sample.language}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">{copy.explanation}</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    {sample.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-500"
                      >
                        #{tag}
                      </span>
                    ))}
                    <span className="ml-auto flex items-center gap-1 text-[11px] text-emerald-400">
                      <Check className="size-3.5" />
                      {d.saved}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={run}
          className="self-start font-mono text-[11px] uppercase tracking-widest text-zinc-500 transition-colors hover:text-white"
        >
          ↺ {d.replay}
        </button>
      </BentoCard>
    </div>
  );
}

/* ───────────────────────── Real screenshots ───────────────────────── */

function ProductShots() {
  const { t } = useLocale();
  const s = t.syntaxai;
  const [active, setActive] = useState<Shot["id"]>("sidepanel");
  const shot = shots.find((x) => x.id === active) ?? shots[0];

  return (
    <div className="mt-20">
      <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
        <span className="h-px w-10 bg-accent-cyan/40" />
        {s.shotsTitle}
      </p>

      <div className="grid gap-5 lg:grid-cols-[17rem_1fr]">
        {/* Tabs */}
        <div role="tablist" aria-orientation="vertical" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {shots.map((x) => {
            const isActive = x.id === active;
            return (
              <button
                key={x.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(x.id)}
                className={cn(
                  "shrink-0 rounded-2xl border px-4 py-3 text-left transition-colors lg:shrink",
                  isActive
                    ? "border-accent-indigo/50 bg-accent-indigo/10"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-white/20",
                )}
              >
                <span className={cn("text-sm font-medium", isActive ? "text-white" : "text-zinc-400")}>
                  {s.shots[x.id].tab}
                </span>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="hidden overflow-hidden text-[13px] leading-snug text-zinc-400 lg:block"
                    >
                      <span className="block pt-1.5">{s.shots[x.id].caption}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Viewer */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/50 shadow-[0_30px_80px_-30px_rgba(99,102,241,0.45)]">
          <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-2.5">
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="ml-3 truncate font-mono text-[11px] text-zinc-500">
              SyntaxAI · {s.shots[shot.id].tab}
            </span>
          </div>

          <div className="relative">
            <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={shot.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {shot.id === "sidepanel" ? (
                  <div className="flex flex-col items-center gap-6 p-4 sm:flex-row sm:items-center sm:justify-center sm:gap-10 sm:p-8">
                    <div
                      className="relative h-[26rem] shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] sm:h-[30rem]"
                      style={{ aspectRatio: `${shot.width}/${shot.height}` }}
                    >
                      <Image
                        src={shot.src}
                        alt={`SyntaxAI ${s.openShot}: ${s.shots[shot.id].tab}`}
                        fill
                        sizes="240px"
                        className="object-cover"
                      />
                    </div>
                    <ol className="w-full max-w-sm space-y-4">
                      {s.sidepanelSteps.map((step, i) => (
                        <li key={step.title} className="flex gap-3">
                          <span className="grid size-7 shrink-0 place-items-center rounded-full border border-accent-cyan/40 bg-accent-cyan/10 font-mono text-xs text-accent-cyan">
                            {i + 1}
                          </span>
                          <span>
                            <span className="block text-sm font-medium text-white">{step.title}</span>
                            <span className="mt-0.5 block text-[13px] leading-snug text-zinc-400">{step.text}</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <div className="p-3 sm:p-6">
                    <div
                      className="relative mx-auto w-full overflow-hidden rounded-xl border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]"
                      style={{ aspectRatio: `${shot.width}/${shot.height}`, maxWidth: shot.width }}
                    >
                      <Image
                        src={shot.src}
                        alt={`SyntaxAI ${s.openShot}: ${s.shots[shot.id].tab}`}
                        fill
                        sizes="(min-width: 1024px) 800px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="border-t border-white/[0.07] px-4 py-3 text-[13px] text-zinc-500 lg:hidden">
            {s.shots[shot.id].caption}
          </p>
        </div>
      </div>
    </div>
  );
}
