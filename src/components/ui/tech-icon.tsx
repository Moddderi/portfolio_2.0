import {
  siAngular,
  siDocker,
  siExpress,
  siFirefoxbrowser,
  siGit,
  siGooglechrome,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedux,
  siSass,
  siSequelize,
  siTailwindcss,
  siTypescript,
  siZod,
} from "simple-icons";
import { cn } from "@/lib/cn";

type BrandIcon = { path: string; hex: string };

const ICONS: Record<string, BrandIcon> = {
  react: siReact,
  "next.js": siNextdotjs,
  typescript: siTypescript,
  javascript: siJavascript,
  "node.js": siNodedotjs,
  postgresql: siPostgresql,
  zod: siZod,
  "tailwind css": siTailwindcss,
  git: siGit,
  docker: siDocker,
  redux: siRedux,
  sequelize: siSequelize,
  scss: siSass,
  python: siPython,
  express: siExpress,
  angular: siAngular,
  chrome: siGooglechrome,
  firefox: siFirefoxbrowser,
};

/** Brand colours that vanish on a dark background get a light override. */
const COLOR_OVERRIDES: Record<string, string> = {
  "next.js": "#f4f4f5",
  express: "#f4f4f5",
  angular: "#dd0031",
};

function lookup(name: string) {
  return ICONS[name.trim().toLowerCase()];
}

/** True when a brand icon exists for this technology name. */
export function hasTechIcon(name: string) {
  return Boolean(lookup(name));
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const icon = lookup(name);
  if (!icon) return null;
  const fill = COLOR_OVERRIDES[name.trim().toLowerCase()] ?? `#${icon.hex}`;

  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-4 shrink-0", className)} fill={fill}>
      <path d={icon.path} />
    </svg>
  );
}

/** Icon + label. Falls back to plain text for technologies without a brand icon. */
export function TechLabel({
  name,
  className,
  iconClassName,
}: {
  name: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <TechIcon name={name} className={iconClassName} />
      {name}
    </span>
  );
}
