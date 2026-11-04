export type HatIcon = "code" | "workflow" | "bridge" | "sparkles" | "chart";

export type ExperienceEntry = {
  id: "syntaxai" | "bypass";
  company: string;
  current?: boolean;
  hats: readonly HatIcon[];
  tags: readonly string[];
  highlightValue: string;
  ctaHref: string;
};

/** Work experience – structure only; copy lives in i18n (`t.experience.entries`). Newest first. */
export const experience: readonly ExperienceEntry[] = [
  {
    id: "syntaxai",
    company: "SyntaxAI",
    current: true,
    hats: ["code", "sparkles", "chart"],
    tags: ["Next.js", "Node.js", "TypeScript", "Chrome", "Firefox", "AI"],
    highlightValue: "0→1",
    ctaHref: "#syntaxai",
  },
  {
    id: "bypass",
    company: "Bypass",
    hats: ["code", "workflow", "chart"],
    tags: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Lean", "TOC"],
    highlightValue: "8 → 2",
    ctaHref: "#bypass",
  },
] as const;
