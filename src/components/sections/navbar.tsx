"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Command, FileDown, Menu } from "lucide-react";
import { useSite } from "@/components/providers/site-provider";
import { resume } from "@/data/profile";
import { sections } from "@/data/sections";
import { useLocale, type Locale } from "@/i18n/locale-provider";
import { cn } from "@/lib/cn";

const LOCALES: { id: Locale; short: string }[] = [
  { id: "en", short: "EN" },
  { id: "uk", short: "UA" },
];

/**
 * Floating control bar:  wordmark · where-you-are (label + segmented progress) ·
 * language switch · menu (⌘K palette).
 */
export function Navbar() {
  const { activeId, setPaletteOpen, scrollTo, ready } = useSite();
  const { t, locale, setLocale } = useLocale();

  const index = Math.max(0, sections.findIndex((s) => s.id === activeId));
  const current = sections[index];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-40 flex justify-center px-3"
    >
      <nav
        aria-label="Primary"
        className="flex max-w-full items-center gap-0.5 rounded-2xl sm:gap-1 border border-white/10 bg-ink-900/60 p-1.5 shadow-[0_8px_40px_-12px_rgba(99,102,241,0.45)] backdrop-blur-xl"
      >
        {/* Wordmark */}
        <button
          onClick={() => scrollTo("intro")}
          aria-label={t.nav.backToTop}
          className="rounded-xl px-2.5 py-2 font-mono text-sm font-semibold sm:px-3 tracking-tight text-white transition-colors hover:bg-white/[0.06]"
        >
          OK<span className="animate-pulse text-accent-cyan">_</span>
        </button>

        <Divider />

        {/* Where am I */}
        <div className="flex items-center gap-3 px-1.5 sm:px-2.5">
          <span className="relative block h-5 w-[4.5rem] overflow-hidden text-left text-[13px] text-zinc-200 sm:w-28 sm:text-sm">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={`${current.id}-${locale}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 truncate"
              >
                {t.sections[current.id].label}
              </motion.span>
            </AnimatePresence>
          </span>

          {/* Segmented progress – one bar per section, click to jump */}
          <ul className="hidden items-center gap-1 md:flex" aria-label="Sections">
            {sections.map((section, i) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollTo(section.id)}
                  aria-label={t.sections[section.id].label}
                  aria-current={i === index ? "true" : undefined}
                  className="group grid h-5 place-items-center"
                >
                  <span
                    className={cn(
                      "block h-1 rounded-full transition-all duration-500",
                      i === index
                        ? "w-6 bg-gradient-to-r from-accent-indigo to-accent-cyan shadow-[0_0_10px_1px_rgba(99,102,241,0.7)]"
                        : i < index
                          ? "w-2 bg-accent-violet/60 group-hover:bg-accent-violet"
                          : "w-2 bg-white/15 group-hover:bg-white/40",
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Divider />

        {/* Language */}
        <div
          role="group"
          aria-label={t.nav.language}
          className="relative flex rounded-xl bg-white/[0.04] p-0.5 font-mono text-[10px] sm:text-[11px]"
        >
          {LOCALES.map((l) => (
            <button
              key={l.id}
              onClick={() => setLocale(l.id)}
              aria-pressed={locale === l.id}
              className={cn(
                "relative rounded-[10px] px-2 py-1.5 transition-colors sm:px-2.5",
                locale === l.id ? "text-white" : "text-zinc-500 hover:text-zinc-300",
              )}
            >
              {locale === l.id && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 -z-10 rounded-[10px] bg-white/[0.12]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              {l.short}
            </button>
          ))}
        </div>

        {/* Resume */}
        <a
          href={resume.href}
          download={resume.fileName}
          aria-label={t.nav.resumeAria}
          className="ml-0.5 flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-2 py-2 sm:px-2.5 text-sm text-zinc-200 transition-colors hover:border-accent-cyan/50 hover:bg-accent-cyan/10 hover:text-white"
        >
          <FileDown className="size-4 text-accent-cyan" />
          <span className="hidden md:inline">{t.nav.resume}</span>
        </a>

        {/* Menu */}
        <button
          onClick={() => setPaletteOpen(true)}
          aria-label={t.nav.openMenu}
          className="ml-0.5 flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 sm:px-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
        >
          <Menu className="size-4" />
          <span className="hidden sm:inline">{t.nav.menu}</span>
          <kbd className="hidden items-center gap-0.5 rounded-md bg-ink-950/10 px-1.5 py-0.5 font-mono text-[10px] font-medium lg:flex">
            <Command className="size-2.5" />K
          </kbd>
        </button>
      </nav>
    </motion.header>
  );
}

function Divider() {
  return <span aria-hidden className="mx-0.5 h-5 w-px bg-white/10" />;
}
