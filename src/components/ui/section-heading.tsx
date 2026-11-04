import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
};

/** "03 ── Case study" eyebrow + large title. */
export function SectionHeading({ index, label, children, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
        <span>{index}</span>
        <span className="h-px w-10 bg-accent-cyan/40" />
        <span>{label}</span>
      </div>
      <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
        {children}
      </h2>
    </Reveal>
  );
}
