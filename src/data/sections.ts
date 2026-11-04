/** Page map – ids and search keywords. Labels/hints live in i18n (`t.sections`). */
export const sections = [
  { id: "intro", keywords: "home top hero" },
  { id: "manifesto", keywords: "about philosophy" },
  { id: "experience", keywords: "jobs career bypass syntaxai role" },
  { id: "bypass", keywords: "lean toc headcount process" },
  { id: "syntaxai", keywords: "founder ai extension startup notes" },
  { id: "projects", keywords: "portfolio work kirich flow crm phone catalog" },
  { id: "journey", keywords: "timeline story academy mate it step" },
  { id: "profile", keywords: "skills books gym education" },
  { id: "contact", keywords: "email telegram linkedin hire" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/** "03" – the human-readable number of a section, derived from its position. */
export function sectionNumber(id: SectionId) {
  return String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");
}
