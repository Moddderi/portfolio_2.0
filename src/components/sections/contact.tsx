"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, FileDown, Mail, Send } from "lucide-react";
import { useState, type ReactNode } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Ticker } from "@/components/ui/ticker";
import { contacts, resume, type ContactLink } from "@/data/profile";
import { sectionNumber } from "@/data/sections";
import { useLocale } from "@/i18n/locale-provider";

const ICONS: Record<ContactLink["id"], ReactNode> = {
  email: <Mail className="size-4" />,
  telegram: <Send className="size-4" />,
  linkedin: <LinkedinIcon className="size-4" />,
  github: <GithubIcon className="size-4" />,
};

const email = contacts.find((c) => c.id === "email");
const links = contacts.filter((c) => c.id !== "email");

export function Contact() {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = email.href;
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6">
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent-indigo/20 blur-[140px]"
      />

      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
          <span>{sectionNumber("contact")}</span>
          <span className="h-px w-10 bg-accent-cyan/40" />
          <span>{t.contact.label}</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(3rem,10.5vw,10rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white">
            {t.contact.titleA}
            <br />
            <span className="text-gradient">{t.contact.titleB}</span>
            <br />
            {t.contact.titleC}
          </h2>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center gap-3">
          {email && (
            <>
              <Magnetic strength={0.45}>
                <a
                  href={email.href}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-ink-950 shadow-[0_0_60px_-10px_rgba(255,255,255,0.6)] transition-transform hover:scale-[1.04]"
                >
                  {t.contact.hello} <ArrowUpRight className="size-5" />
                </a>
              </Magnetic>

              <button
                onClick={copyEmail}
                className="group/copy inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-5 py-4 font-mono text-sm text-zinc-300 backdrop-blur transition-colors hover:border-white/30 hover:text-white"
              >
                {email.value}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "ok" : "copy"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={copied ? "text-emerald-400" : "text-zinc-500 group-hover/copy:text-white"}
                  >
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </motion.span>
                </AnimatePresence>
                <span className="sr-only" aria-live="polite">
                  {copied ? t.contact.copied : ""}
                </span>
              </button>
            </>
          )}
        </Reveal>

        <Reveal delay={0.25} className="mt-4">
          <Magnetic strength={0.3}>
            <a
              href={resume.href}
              download={resume.fileName}
              aria-label={t.nav.resumeAria}
              className="group/cv relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-accent-cyan/30 bg-gradient-to-r from-accent-indigo/20 via-accent-violet/10 to-accent-cyan/15 py-3 pl-3 pr-6 text-base font-medium text-white shadow-[0_0_50px_-14px_rgba(34,211,238,0.6)] backdrop-blur transition-all hover:border-accent-cyan/60 hover:shadow-[0_0_60px_-10px_rgba(34,211,238,0.8)]"
            >
              <span className="grid size-9 place-items-center rounded-full bg-accent-cyan/15 text-accent-cyan transition-transform group-hover/cv:-translate-y-0.5">
                <FileDown className="size-4.5" />
              </span>
              {t.nav.palette.downloadResume}
              <span className="rounded-md border border-white/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                PDF
              </span>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.3}>
          <ul className="mt-14 grid gap-3 sm:grid-cols-3">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-accent-violet/40 hover:bg-accent-violet/[0.08]"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-white/[0.06] text-zinc-300 transition-colors group-hover/link:text-white">
                    {ICONS[link.id]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-zinc-500">{link.label}</span>
                    <span className="block truncate text-sm text-zinc-200">{link.value}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-zinc-600 transition-all group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-white" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Ticker
          reverse
          className="mt-24"
          items={t.contact.ticker}
        />
      </div>
    </section>
  );
}
