/** Language-neutral data for the simulated "Add to SyntaxAI" capture demo. */

export type CaptureSample = {
  id: "angular" | "python" | "sql";
  /** Code that gets "selected" on the mock documentation page. */
  code: string;
  /** What the AI detects. */
  language: string;
  /** Name used to look up a brand icon (see TechIcon). */
  icon: string;
  tags: readonly string[];
};

export const captureSamples: readonly CaptureSample[] = [
  {
    id: "angular",
    code: `import { Component, signal } from '@angular/core';

export class Counter {
  count = signal(0);
}`,
    language: "TypeScript",
    icon: "Angular",
    tags: ["angular", "signals", "component"],
  },
  {
    id: "python",
    code: `def vowels(text):
    return [c for c in text if c in "aeiou"]`,
    language: "Python",
    icon: "Python",
    tags: ["python", "strings", "list comprehension"],
  },
  {
    id: "sql",
    code: `SELECT language, COUNT(*)
FROM notes
GROUP BY language;`,
    language: "SQL",
    icon: "PostgreSQL",
    tags: ["sql", "aggregation", "group by"],
  },
] as const;

export type Shot = {
  id: "sidepanel" | "notes" | "stack" | "analytics";
  src: string;
  width: number;
  height: number;
};

/** Real screenshots of the extension and its dashboard. */
export const shots: readonly Shot[] = [
  { id: "sidepanel", src: "/syntaxai/sidepanel.png", width: 369, height: 898 },
  { id: "notes", src: "/syntaxai/notes.png", width: 1500, height: 951 },
  { id: "stack", src: "/syntaxai/stack.png", width: 1226, height: 500 },
  { id: "analytics", src: "/syntaxai/analytics.png", width: 1237, height: 778 },
] as const;
