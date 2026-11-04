"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { sections, type SectionId } from "@/data/sections";

type SiteContextValue = {
  /** True once the boot sequence has finished – hero animations wait for it. */
  ready: boolean;
  markReady: () => void;
  /** Section currently crossing the middle of the viewport. */
  activeId: SectionId;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  scrollTo: (id: SectionId) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}

/**
 * Global client state of the page:
 *  • Lenis smooth scrolling
 *  • boot / ready flag
 *  • active-section tracking
 *  • command-palette visibility
 */
export function SiteProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);
  const [activeId, setActiveId] = useState<SectionId>("intro");
  const [paletteOpen, setPaletteOpen] = useState(false);

  // ── Always start at the top (reload, back/forward, stale #hash) ──
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  // ── Smooth scroll ──────────────────────────────────────────────
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, duration: 1.15 });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ── Lock scrolling while booting or while the palette is open ──
  useEffect(() => {
    const locked = !ready || paletteOpen;
    const html = document.documentElement;
    if (locked) {
      lenisRef.current?.stop();
      html.style.overflow = "hidden";
    } else {
      lenisRef.current?.start();
      html.style.overflow = "";
    }
  }, [ready, paletteOpen]);

  // ── Active section ─────────────────────────────────────────────
  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id as SectionId);
        }
      },
      // A thin band just above the vertical centre of the viewport.
      { rootMargin: "-45% 0px -54% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(el, { duration: 1.6 });
    else el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const markReady = useCallback(() => setReady(true), []);

  const value = useMemo<SiteContextValue>(
    () => ({ ready, markReady, activeId, paletteOpen, setPaletteOpen, scrollTo }),
    [ready, markReady, activeId, paletteOpen, scrollTo],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
