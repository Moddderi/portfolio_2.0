"use client";

import { GraduationCap } from "lucide-react";
import Image from "next/image";
import { education } from "@/data/profile";
import { useLocale } from "@/i18n/locale-provider";
import { BentoCard, Eyebrow } from "./bento-card";

export function EducationCard({ className }: { className?: string }) {
  const { t } = useLocale();
  return (
    <BentoCard
      delay={0.16}
      className={className}
      contentClassName="flex flex-col gap-4"
    >
      <Eyebrow icon={<GraduationCap />}>{t.profile.education.eyebrow}</Eyebrow>

      <ul className="space-y-2">
        {education.map((school) => (
          <li
            key={school.name}
            className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-2.5 transition-colors hover:border-accent-indigo/40 hover:bg-accent-indigo/10"
          >
            {school.logo ? (
              <Image
                src={school.logo}
                alt={`${school.name} logo`}
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-zinc-400">
                <GraduationCap className="size-5" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug text-white">{school.name}</p>
              <p className="text-xs leading-snug text-zinc-500">{t.profile.education.programs[school.id]}</p>
            </div>
            <span className="shrink-0 text-right font-mono text-[10px] text-zinc-500">{"ongoing" in school && school.ongoing ? `${school.period} – ${t.profile.education.present}` : school.period}</span>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
