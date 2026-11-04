"use client";

import { motion } from "framer-motion";
import { useSite } from "@/components/providers/site-provider";
import { sections } from "@/data/sections";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/cn";

/** Vertical HUD navigation pinned to the right edge (desktop only). */
export function SectionRail() {
  const { activeId, scrollTo, ready } = useSite();
  const { t } = useLocale();

  return (
    <motion.nav
      aria-label="Sections"
      initial={{ opacity: 0, x: 16 }}
      animate={ready ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-3.5">
        {sections.map((section, i) => {
          const active = section.id === activeId;
          return (
            <li key={section.id}>
              <button
                onClick={() => scrollTo(section.id)}
                aria-label={t.sections[section.id].label}
                aria-current={active ? "true" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={cn(
                    "translate-x-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] opacity-0 transition-all duration-300",
                    "group-hover:translate-x-0 group-hover:opacity-100",
                    active ? "text-white" : "text-zinc-500",
                  )}
                >
                  {String(i + 1).padStart(2, "0")} · {t.sections[section.id].label}
                </span>
                <span
                  className={cn(
                    "block h-[3px] rounded-full transition-all duration-500",
                    active
                      ? "w-8 bg-gradient-to-r from-accent-indigo to-accent-cyan shadow-[0_0_12px_2px_rgba(99,102,241,0.7)]"
                      : "w-3 bg-white/20 group-hover:w-5 group-hover:bg-white/50",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
