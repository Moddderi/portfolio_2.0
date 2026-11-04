"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { chapters } from "@/data/journey";
import { sectionNumber } from "@/data/sections";
import { useLocale } from "@/i18n/locale-provider";

/**
 * Pinned horizontal scroll: vertical scrolling drives a sideways timeline.
 * The section's height equals the viewport + the horizontal distance to travel.
 */
export function Journey() {
  const { t } = useLocale();
  const j = t.journey;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100dvh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-5 px-[6vw] sm:gap-8">
          {/* Intro panel */}
          <div className="w-[82vw] shrink-0 sm:w-[44vw] lg:w-[32vw]">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
              <span>{sectionNumber("journey")}</span>
              <span className="h-px w-10 bg-accent-cyan/40" />
              <span>{j.label}</span>
            </div>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl">
              {j.titleA} <span className="text-gradient">{j.age}</span>
              {j.titleB} <span className="text-gradient">{j.leaner}</span> {j.titleC}
            </h2>
            <p className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
              {j.keepScrolling} <span className="animate-pulse text-accent-cyan">→</span>
            </p>
          </div>

          {chapters.map((chapter) => {
            const copy = j.chapters[chapter.id];
            const results = "results" in copy ? copy.results : undefined;
            return (
            <article
              key={chapter.index}
              className="group relative flex h-[min(68dvh,35rem)] w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-850/70 p-6 backdrop-blur-xl transition-colors hover:border-accent-violet/40 sm:w-[44vw] sm:p-8 lg:w-[30vw]"
            >
              <span
                aria-hidden
                className="text-gradient pointer-events-none absolute -right-4 -top-6 select-none text-[9rem] font-semibold leading-none tracking-tighter opacity-20 transition-opacity duration-500 group-hover:opacity-50 sm:text-[11rem]"
              >
                {chapter.big}
                {chapter.bigSuffix && <span className="ml-2 text-[0.3em] tracking-normal">{chapter.bigSuffix}</span>}
              </span>

              <div className="relative flex items-center gap-4">
                {chapter.logo && (
                  <Image
                    src={chapter.logo.src}
                    alt={chapter.logo.alt}
                    width={56}
                    height={56}
                    className="size-14 rounded-2xl border border-white/15 object-cover shadow-[0_0_30px_-6px_rgba(99,102,241,0.6)]"
                  />
                )}
                <div className="font-mono text-xs uppercase tracking-[0.2em]">
                  <p className="text-zinc-500">
                    <span className="mr-2 text-accent-cyan">{chapter.index}</span>
                    {copy.kicker}
                  </p>
                  <p className="mt-1 text-zinc-300">{copy.period}</p>
                </div>
              </div>

              <div className="relative">
                <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                  {copy.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">{copy.text}</p>
                {results && (
                  <ul className="mt-4 space-y-1.5">
                    {results.map((result) => (
                      <li key={result} className="flex items-start gap-2 text-sm text-zinc-300">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent-cyan" />
                        {result}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
            );
          })}

          {/* Outro panel */}
          <a
            href="#contact"
            className="group relative flex h-[min(68dvh,35rem)] w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-accent-indigo/40 bg-gradient-to-br from-accent-indigo/25 via-accent-violet/10 to-transparent p-6 sm:w-[36vw] sm:p-8 lg:w-[26vw]"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">{j.outroKicker}</span>
            <div>
              <h3 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                {j.outroTitle}
              </h3>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-zinc-400">{j.outroText}</p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition-transform group-hover:scale-105">
                {j.outroCta} <ArrowUpRight className="size-4" />
              </span>
            </div>
          </a>
        </motion.div>

        {/* Progress track */}
        <div className="absolute inset-x-[6vw] bottom-10 h-px bg-white/10" aria-hidden>
          <motion.div
            style={{ scaleX: progress }}
            className="h-full origin-left bg-gradient-to-r from-accent-indigo to-accent-cyan"
          />
        </div>
      </div>
    </section>
  );
}
