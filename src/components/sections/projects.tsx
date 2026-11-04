"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BentoCard } from "@/components/bento/bento-card";
import { GithubIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechLabel } from "@/components/ui/tech-icon";
import { useLocale } from "@/i18n/locale-provider";
import { contacts, projects } from "@/data/profile";
import { sectionNumber } from "@/data/sections";
import { cn } from "@/lib/cn";

type Project = (typeof projects)[number];

// Monogram badges echo the CV: beige K, blue C, coral P.
const MONOGRAM_TONE: Record<Project["id"], string> = {
  kirich: "bg-[#d9cbbb] text-black",
  "flow-crm": "bg-[#0b4fb3] text-white",
  "phone-catalog": "bg-[#f25b5b] text-white",
};

const github = contacts.find((c) => c.id === "github");

export function Projects() {
  const { t } = useLocale();
  return (
    <section id="projects" className="mx-auto w-full max-w-7xl px-4 py-28 sm:px-6">
      <SectionHeading index={sectionNumber("projects")} label={t.projects.label}>
        {t.projects.titleA} <span className="text-zinc-500">{t.projects.titleB}</span>
      </SectionHeading>

      <ul className="mt-14 grid gap-5 lg:grid-cols-3">
        {projects.map((project, i) => (
          <li key={project.id} className="flex">
            <ProjectCard project={project} delay={i * 0.08} />
          </li>
        ))}
      </ul>

      {github && (
        <a
          href={github.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:text-white"
        >
          {t.projects.moreGithub} · {github.value}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      )}
    </section>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const { t } = useLocale();
  const copy = t.projects.items[project.id];
  return (
    <BentoCard
      delay={delay}
      className="w-full"
      glow="rgba(99, 102, 241, 0.2)"
      contentClassName="flex flex-col gap-5"
    >
      <Screenshots name={project.name} images={project.images} label={t.projects.showShot} />

      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full text-lg font-bold",
            MONOGRAM_TONE[project.id],
          )}
        >
          {project.monogram}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-xl font-semibold tracking-tight text-white">{project.name}</h3>
          <p className="truncate text-sm text-zinc-500">{copy.subtitle}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-zinc-400">{copy.description}</p>

      <ul className="grid gap-1.5">
        {copy.highlights.map((item) => (
          <li key={item} className="flex items-center gap-2 text-[13px] text-zinc-300">
            <Check className="size-3.5 shrink-0 text-accent-cyan" />
            {item}
          </li>
        ))}
      </ul>

      <ul className="mt-auto flex flex-wrap gap-1.5 border-t border-white/[0.07] pt-4">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
          >
            <TechLabel name={tech} iconClassName="size-3.5" />
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group/live inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.02]"
        >
          {copy.liveLabel}
          <ArrowUpRight className="size-4 transition-transform group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5" />
        </a>
        <a
          href={project.codeLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} ${t.projects.codeAria}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.08]"
        >
          <GithubIcon className="size-4" />
          Code
        </a>
      </div>
    </BentoCard>
  );
}

/** Browser-framed screenshot slider: autoplays when visible, pauses on hover, dots to jump. */
function Screenshots({ name, images, label }: { name: string; images: readonly string[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), 3200);
    return () => clearInterval(id);
  }, [inView, paused, images.length]);

  return (
    <div
      ref={ref}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="overflow-hidden rounded-2xl border border-white/10 bg-black/40"
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-3 py-2">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.05] px-2 py-0.5 text-center font-mono text-[10px] text-zinc-500">
          {name}
        </span>
      </div>

      <div className="relative aspect-[16/10] bg-ink-900">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${name} screenshot ${active + 1}`}
              fill
              sizes="(min-width: 1024px) 400px, 100vw"
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`${label} ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full backdrop-blur transition-all",
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
