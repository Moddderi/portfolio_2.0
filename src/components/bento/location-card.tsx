"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { BentoCard, Eyebrow } from "./bento-card";
import { useLocale } from "@/i18n/locale-provider";

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

export function LocationCard({ className }: { className?: string }) {
  const time = useLocalTime(profile.timezone);
  const { t } = useLocale();

  return (
    <BentoCard
      delay={0.18}
      className={className}
      glow="rgba(34, 211, 238, 0.16)"
      contentClassName="flex min-h-[24rem] flex-col justify-between gap-5 !p-0"
    >
      {/* Portrait */}
      <Image
        src="/ava1.jpg"
        alt={profile.name}
        fill
        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
        className="object-cover object-[50%_22%] transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/10"
      />
      <div aria-hidden className="absolute inset-0 bg-accent-indigo/10 mix-blend-color" />

      <div className="relative p-6 sm:p-7">
        <span className="inline-flex rounded-full border border-white/15 bg-ink-950/50 px-2.5 py-1 backdrop-blur">
          <Eyebrow icon={<MapPin />}>{t.profile.location.eyebrow}</Eyebrow>
        </span>
      </div>

      <div className="relative p-6 pt-0 sm:p-7 sm:pt-0">
        <p className="text-2xl font-semibold tracking-tight text-white">{profile.name}</p>
        <p className="mt-0.5 text-sm text-zinc-300">{t.profile.location.place}</p>
        <p className="mt-1 flex items-center gap-2 font-mono text-sm text-zinc-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          <span className="tabular-nums">{time ?? "--:--:--"}</span>
          <span className="text-zinc-400">{t.profile.location.local}</span>
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {t.profile.location.modes.map((mode) => (
            <li
              key={mode}
              className="rounded-full border border-white/15 bg-ink-950/50 px-3 py-1 text-xs text-zinc-200 backdrop-blur"
            >
              {mode}
            </li>
          ))}
        </ul>
      </div>
    </BentoCard>
  );
}
