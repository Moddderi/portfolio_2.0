export type Chapter = {
  id: "itstep" | "mate" | "offer" | "syntaxai";
  index: string;
  /** Big decorative glyph in the card background. */
  big: string;
  /** Smaller suffix after `big` (e.g. "y.o."). */
  bigSuffix?: string;
  logo?: { src: string; alt: string };
};

/** Chronology of the career story. Copy lives in i18n (`t.journey.chapters[id]`). */
export const chapters: readonly Chapter[] = [
  { id: "itstep", index: "01", big: "2024", logo: { src: "/logos/itstep.png", alt: "IT Step Academy logo" } },
  { id: "mate", index: "02", big: "2025", logo: { src: "/logos/mate.png", alt: "Mate Academy logo" } },
  { id: "offer", index: "03", big: "16", bigSuffix: "y.o." },
  { id: "syntaxai", index: "04", big: "AI", logo: { src: "/logos/syntaxai-dark.png", alt: "SyntaxAI logo" } },
] as const;
