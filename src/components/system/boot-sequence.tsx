"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSite } from "@/components/providers/site-provider";
import { profile } from "@/data/profile";
import { useLocale } from "@/i18n/locale-provider";

const STORAGE_KEY = "oleh:booted";



/** Terminal-style intro that plays once per session, then slides away. */
export function BootSequence() {
  const { markReady } = useSite();
  const { t } = useLocale();
  const LOG = t.boot.log;
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const skip =
      sessionStorage.getItem(STORAGE_KEY) === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
      markReady();
    };

    if (skip) {
      finish();
      return;
    }

    let done = false;
    const controls = animate(0, 100, {
      duration: 2.1,
      ease: "easeInOut",
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        done = true;
        setTimeout(finish, 280);
      },
    });

    const onKey = () => {
      if (done) return;
      controls.stop();
      done = true;
      finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      controls.stop();
      window.removeEventListener("keydown", onKey);
    };
  }, [markReady]);

  const visibleLines = Math.min(LOG.length, Math.floor((progress / 100) * LOG.length) + 1);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          role="status"
          aria-label="Loading"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink-950 p-6 font-mono text-xs text-zinc-400 sm:p-10"
        >
          <div className="flex items-center justify-between uppercase tracking-[0.25em]">
            <span>{profile.name}</span>
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
              className="text-zinc-600 transition-colors hover:text-white"
            >
              {t.boot.skip}
            </button>
          </div>

          <ul className="space-y-1.5">
            {LOG.slice(0, visibleLines).map((line, i) => (
              <li key={line} className={i === visibleLines - 1 ? "text-white" : "text-zinc-600"}>
                <span className="mr-2 text-accent-cyan">›</span>
                {line}
              </li>
            ))}
          </ul>

          <div>
            <div className="flex items-end justify-between">
              <span className="text-gradient text-[clamp(4rem,16vw,11rem)] font-semibold leading-none tracking-tighter tabular-nums">
                {String(progress).padStart(3, "0")}
              </span>
              <span className="mb-3 uppercase tracking-[0.25em]">{t.boot.initialising}</span>
            </div>
            <div className="mt-4 h-px w-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-cyan"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
