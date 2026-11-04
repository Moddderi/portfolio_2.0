"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { StackOrbit } from "@/components/hero/stack-orbit";
import { useSite } from "@/components/providers/site-provider";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Magnetic } from "@/components/ui/magnetic";
import { Ticker } from "@/components/ui/ticker";
import { useScramble } from "@/hooks/use-scramble";
import { bypass, books, profile } from "@/data/profile";
import { useLocale } from "@/i18n/locale-provider";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

const lineReveal: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 1.1, ease: EASE } },
};

function RoleScramble({ roles }: { roles: readonly string[] }) {
  const [i, setI] = useState(0);
  const text = useScramble(roles[i]);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span className="inline-block min-w-[20ch]" aria-label={roles[i]}>
      <span aria-hidden>{text}</span>
      <span aria-hidden className="ml-1 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-accent-cyan" />
    </span>
  );
}

export function Hero() {
  const { ready } = useSite();
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);

  const stats = [
    { value: profile.experience.totalYears, suffix: "", label: t.hero.stats.years },
    { value: 0, suffix: "", text: `${bypass.reduction.before} → ${bypass.reduction.after}`, label: t.hero.stats.leaner },
    { value: books.count, suffix: "+", label: t.hero.stats.books },
  ];

  // Scroll-linked exit
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  // Pointer-driven gradient sweep across the name
  const pointerX = useMotionValue(30);
  const shift = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const backgroundPositionX = useTransform(shift, (v) => `${v}%`);

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    pointerX.set((e.clientX / window.innerWidth) * 100);
  }

  const nameGradient = {
    backgroundImage:
      "linear-gradient(100deg,#fff 0%,#c7d2fe 18%,#a78bfa 32%,#22d3ee 46%,#fff 60%,#c7d2fe 80%,#a78bfa 100%)",
    backgroundSize: "260% 100%",
    backgroundPositionX,
  };

  return (
    <section
      id="intro"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative flex min-h-dvh flex-col px-4 pt-28 sm:px-6"
    >
      <motion.div
        style={{ opacity, y }}
        className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-10"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          className="flex flex-col items-start gap-7"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 text-xs text-zinc-300 backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {t.hero.status}
            <span className="hidden sm:inline">· {t.hero.modes.join(" / ")}</span>
          </motion.div>

          {/* Name – masked line reveal + pointer-driven gradient sweep */}
          <h1 className="text-[clamp(3.2rem,8.4vw,7.6rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
            <span className="sr-only">{profile.name}</span>
            {profile.name.split(" ").map((word) => (
              <span
                key={word}
                aria-hidden
                className="-mb-[0.06em] block overflow-hidden pb-[0.1em]"
              >
                <motion.span
                  variants={lineReveal}
                  style={nameGradient}
                  className="block bg-clip-text text-transparent"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="font-mono text-sm uppercase tracking-[0.22em] text-accent-cyan"
          >
            <span className="text-zinc-600">{"> "}</span>
            <RoleScramble roles={t.hero.roles} />
          </motion.p>

          <motion.p variants={fadeUp} className="max-w-xl text-xl leading-relaxed text-zinc-400 sm:text-2xl">
            {t.hero.taglineA}{" "}
            <span className="font-semibold text-white">{t.hero.taglineB}</span>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#bypass"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-950 shadow-[0_0_40px_-8px_rgba(255,255,255,0.5)] transition-transform hover:scale-[1.03]"
              >
                {t.hero.ctaCase}
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/30 hover:bg-white/[0.08]"
              >
                {t.hero.ctaContact}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="grid w-full grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:max-w-xl"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-ink-900/80 px-4 py-4 backdrop-blur sm:px-5">
                <dt className="order-2 text-[11px] leading-tight text-zinc-500 sm:text-xs">{stat.label}</dt>
                <dd className="text-2xl font-semibold tabular-nums text-white sm:text-3xl">
                  {"text" in stat ? stat.text : ready ? <AnimatedNumber value={stat.value} suffix={stat.suffix} /> : `0${stat.suffix}`}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
        >
          <StackOrbit />
        </motion.div>
      </motion.div>

      {/* Bottom HUD */}
      <div className="mx-auto w-full max-w-7xl pb-6 pt-8">
        <Ticker items={t.hero.ticker} />
        <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
          <span>49.59°N · 34.55°E · {t.hero.where}</span>
          <span className="flex items-center gap-3">
            {t.hero.scroll}
            <span className="relative h-8 w-px overflow-hidden bg-white/10">
              <motion.span
                className="absolute inset-x-0 h-3 bg-accent-cyan"
                animate={{ y: ["-100%", "300%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
