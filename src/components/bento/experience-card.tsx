"use client";

import { Rocket } from "lucide-react";
import { profile } from "@/data/profile";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { BentoCard, Eyebrow } from "./bento-card";
import { useLocale } from "@/i18n/locale-provider";

const { totalYears } = profile.experience;

export function ExperienceCard({ className }: { className?: string }) {
  const { t } = useLocale();
  return (
    <BentoCard
      delay={0.12}
      className={className}
      glow="rgba(34, 211, 238, 0.16)"
      contentClassName="flex flex-col justify-between gap-5"
    >
      <Eyebrow icon={<Rocket />}>{t.profile.experience.eyebrow}</Eyebrow>

      <div>
        <div className="flex items-baseline gap-2">
          <AnimatedNumber
            value={totalYears}
            className="text-6xl font-semibold leading-none tracking-tighter text-white"
          />
          <span className="text-zinc-400">{t.profile.experience.years}</span>
        </div>
      </div>

      <p className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-zinc-300">
        {t.profile.experience.offer}{" "}
        <span className="font-semibold text-white">{profile.firstOfferAge} y.o.</span>
      </p>
    </BentoCard>
  );
}
