/**
 * The Bypass story as a scroll-driven model. Copy lives in i18n (`t.bypass.steps`,
 * same order as below).
 *
 * REAL: company of ~80 people, a frontend department of 8, two cases,
 * department reduced to 2 (including me).
 * ILLUSTRATIVE: time bars and work queue – they visualise the
 * Theory-of-Constraints mechanics and are not company data.
 */

export const CONSTRAINT_INDEX = 2; // "Build"
export const STAGE_COUNT = 5;

export type ModelStep = {
  key: string;
  /** Relative time (0–100) a task spends in each stage – illustrative. */
  times: readonly number[];
  /** Frontend department headcount – real: 8 → 2. */
  team: number;
  /** Work items waiting in front of the constraint – illustrative. */
  queue: number;
  /** Whether the constraint is highlighted as a problem. */
  alert: boolean;
};

export const modelSteps: readonly ModelStep[] = [
  { key: "context", times: [24, 34, 86, 28, 18], team: 8, queue: 14, alert: false },
  { key: "analysis", times: [24, 34, 86, 28, 18], team: 8, queue: 14, alert: true },
  { key: "case-1", times: [24, 34, 64, 28, 18], team: 8, queue: 8, alert: true },
  { key: "flow", times: [24, 34, 54, 28, 18], team: 8, queue: 4, alert: true },
  { key: "case-2", times: [24, 34, 32, 28, 18], team: 8, queue: 1, alert: false },
  { key: "result", times: [20, 26, 30, 22, 16], team: 2, queue: 0, alert: false },
] as const;
