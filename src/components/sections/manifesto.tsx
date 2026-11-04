"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/cn";

type WordProps = {
  word: string;
  accent: boolean;
  range: [number, number];
  progress: MotionValue<number>;
};

function Word({ word, accent, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={cn("mr-[0.28em] inline-block", accent && "text-gradient")}
    >
      {word}
    </motion.span>
  );
}

/** Large statement whose words light up one by one as you scroll through it. */
export function Manifesto() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });

  const tokens = t.manifesto.text.split(" ").map((raw) => ({
    word: raw.replaceAll("*", ""),
    accent: raw.includes("*"),
  }));

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative mx-auto flex min-h-[90dvh] w-full max-w-6xl flex-col justify-center px-4 py-32 sm:px-6"
    >
      <div className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
        <span>02</span>
        <span className="h-px w-10 bg-accent-cyan/40" />
        <span>{t.manifesto.label}</span>
      </div>

      <p className="text-3xl font-semibold leading-[1.2] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
        {tokens.map((token, i) => {
          const start = i / tokens.length;
          const end = Math.min(1, start + 1.6 / tokens.length);
          return (
            <Word
              key={i}
              word={token.word}
              accent={token.accent}
              range={[start, end]}
              progress={scrollYProgress}
            />
          );
        })}
      </p>
    </section>
  );
}
