"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CornerDownLeft,
  Copy,
  FileDown,
  Hash,
  Mail,
  Search,
  Send,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { useLocale } from "@/i18n/locale-provider";
import { useSite } from "@/components/providers/site-provider";
import { contacts, resume, type ContactLink } from "@/data/profile";
import { sections } from "@/data/sections";
import { cn } from "@/lib/cn";

type Item = {
  id: string;
  group: "navigate" | "connect";
  label: string;
  hint: string;
  keywords: string;
  icon: ReactNode;
  run: () => void;
};

const CONTACT_ICONS: Record<ContactLink["id"], ReactNode> = {
  email: <Mail className="size-4" />,
  telegram: <Send className="size-4" />,
  linkedin: <LinkedinIcon className="size-4" />,
  github: <GithubIcon className="size-4" />,
};

/** ⌘K / Ctrl+K command palette – the fastest way around the page. */
export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, scrollTo } = useSite();
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => setPaletteOpen(false);

  const items = useMemo<Item[]>(() => {
    const nav: Item[] = sections.map((s) => ({
      id: `nav-${s.id}`,
      group: "navigate",
      label: t.sections[s.id].label,
      hint: t.sections[s.id].hint,
      keywords: `${t.sections[s.id].label} ${t.sections[s.id].hint} ${s.keywords}`.toLowerCase(),
      icon: <Hash className="size-4" />,
      run: () => {
        setPaletteOpen(false);
        // wait for the scroll lock to release before scrolling
        setTimeout(() => scrollTo(s.id), 60);
      },
    }));

    const email = contacts.find((c) => c.id === "email");
    const connect: Item[] = [
      {
        id: "download-resume",
        group: "connect" as const,
        label: t.nav.palette.downloadResume,
        hint: "PDF",
        keywords: "resume cv download pdf резюме завантажити",
        icon: <FileDown className="size-4" />,
        run: () => {
          setPaletteOpen(false);
          const a = document.createElement("a");
          a.href = resume.href;
          a.download = resume.fileName;
          a.click();
        },
      },
      ...(email
        ? [
            {
              id: "copy-email",
              group: "connect" as const,
              label: t.nav.palette.copyEmail,
              hint: email.value,
              keywords: "copy email mail address",
              icon: <Copy className="size-4" />,
              run: () => {
                navigator.clipboard?.writeText(email.value);
                setPaletteOpen(false);
              },
            },
          ]
        : []),
      ...contacts.map((c) => ({
        id: `open-${c.id}`,
        group: "connect" as const,
        label: `${t.nav.palette.open} ${c.label}`,
        hint: c.value,
        keywords: `${c.label} ${c.value} open`.toLowerCase(),
        icon: CONTACT_ICONS[c.id],
        run: () => {
          setPaletteOpen(false);
          if (c.href.startsWith("mailto:")) window.location.href = c.href;
          else window.open(c.href, "_blank", "noopener,noreferrer");
        },
      })),
    ];

    return [...nav, ...connect];
  }, [scrollTo, setPaletteOpen, t]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.keywords.includes(q)) : items;
  }, [items, query]);

  // Global shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      } else if (e.key === "Escape" && paletteOpen) {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, setPaletteOpen]);

  // Reset on open
  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setCursor(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [paletteOpen]);

  function onInputKey(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      filtered[cursor]?.run();
    }
  }

  let lastGroup = "";

  return (
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          key="palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-md"
          onMouseDown={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 shadow-[0_30px_100px_-20px_rgba(99,102,241,0.5)]"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
              <Search className="size-4 text-zinc-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={onInputKey}
                placeholder={t.nav.palette.placeholder}
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
              />
              <kbd className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                ESC
              </kbd>
            </div>

            <ul className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-zinc-600">{t.nav.palette.nothing}</li>
              )}
              {filtered.map((item, i) => {
                const showGroup = item.group !== lastGroup;
                lastGroup = item.group;
                const active = i === cursor;
                return (
                  <li key={item.id}>
                    {showGroup && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                        {item.group === "navigate" ? t.nav.palette.navigate : t.nav.palette.connect}
                      </p>
                    )}
                    <button
                      onMouseMove={() => setCursor(i)}
                      onClick={item.run}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                        active ? "bg-white/[0.07]" : "bg-transparent",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-8 place-items-center rounded-lg border border-white/10 transition-colors",
                          active ? "bg-accent-indigo/20 text-white" : "bg-white/[0.03] text-zinc-400",
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-white">{item.label}</span>
                        <span className="block truncate text-xs text-zinc-500">{item.hint}</span>
                      </span>
                      {active &&
                        (item.group === "navigate" ? (
                          <CornerDownLeft className="size-4 text-zinc-500" />
                        ) : (
                          <ArrowUpRight className="size-4 text-zinc-500" />
                        ))}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
