"use client";

import { BooksCard } from "@/components/bento/books-card";
import { DisciplineCard } from "@/components/bento/discipline-card";
import { EducationCard } from "@/components/bento/education-card";
import { ExperienceCard } from "@/components/bento/experience-card";
import { LocationCard } from "@/components/bento/location-card";
import { PrinciplesCard } from "@/components/bento/principles-card";
import { StackCard } from "@/components/bento/stack-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionNumber } from "@/data/sections";
import { useLocale } from "@/i18n/locale-provider";

/**
 * Asymmetrical 6-column Bento Grid (desktop) that collapses to 2 → 1 columns.
 *
 *  ┌── Books (2×2) ──┬───────── Stack (4×1) ─────────┐
 *  │                 ├── Experience ──┬─ Discipline ─┤
 *  ├─ Education ─────┼── Location ────┼─ Principles ─┤
 */
export function BentoGrid() {
  const { t } = useLocale();
  return (
    <section id="profile" className="mx-auto w-full max-w-7xl px-4 py-28 sm:px-6">
      <SectionHeading index={sectionNumber("profile")} label={t.profile.label} className="mb-14">
        {t.profile.titleA} <span className="text-zinc-500">{t.profile.titleB}</span>
      </SectionHeading>

      <div className="grid auto-rows-[minmax(230px,auto)] grid-cols-1 gap-4 [grid-auto-flow:dense] md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        <BooksCard className="lg:col-span-2 lg:row-span-2" />
        <StackCard className="md:col-span-2 lg:col-span-4" />
        <ExperienceCard className="lg:col-span-2" />
        <DisciplineCard className="lg:col-span-2" />

        <EducationCard className="lg:col-span-2" />
        <LocationCard className="lg:col-span-2" />
        <PrinciplesCard className="md:col-span-2 lg:col-span-2" />
      </div>
    </section>
  );
}
