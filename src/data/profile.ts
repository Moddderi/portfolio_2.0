/**
 * Language-neutral content: names, numbers, links, assets, stack.
 * All translatable copy lives in /src/i18n.
 */

export const profile = {
  name: "Oleh Kyrychenko",
  shortName: "Oleh",
  timezone: "Europe/Kyiv",
  experience: { totalYears: 3, commercialYears: 1 },
  firstOfferAge: 16,
  booksRead: 80,
} as const;

export const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Zod",
  "Tailwind CSS",
  "Git",
  "Docker",
] as const;

export const bypass = {
  company: "Bypass",
  companySize: 80,
  /** Frontend department, including me as lead developer. */
  reduction: { before: 8, after: 2, factor: 4 },
  cases: 2,
} as const;

export const books = {
  count: profile.booksRead,
} as const;

/** Key projects & freelance – real links and screenshots. Copy lives in i18n. */
export const projects = [
  {
    id: "kirich",
    monogram: "K",
    name: "K.I.RICH",
    stack: ["Next.js", "React", "TypeScript", "Redux", "Tailwind CSS", "Node.js", "Sequelize", "PostgreSQL", "Zod"],
    images: ["/projects/kirich-1.png", "/projects/kirich-2.png", "/projects/kirich-3.png"],
    liveLink: "https://website-kirich-ts-react-client.vercel.app/",
    codeLink: "https://github.com/Moddderi/website-kirich-ts-react",
  },
  {
    id: "flow-crm",
    monogram: "C",
    name: "FLOW CRM",
    stack: ["React", "TypeScript", "SCSS", "Python"],
    images: ["/projects/crm-1.png", "/projects/crm-2.png", "/projects/crm-3.png"],
    liveLink: "https://moddderi.github.io/FLOW_CRM/",
    codeLink: "https://github.com/Moddderi/FLOW_CRM",
  },
  {
    id: "phone-catalog",
    monogram: "P",
    name: "Phone Catalog",
    stack: ["React", "TypeScript", "SCSS", "Node.js"],
    images: ["/projects/phone-catalog-1.png", "/projects/phone-catalog-2.png", "/projects/phone-catalog-3.png"],
    liveLink: "https://moddderi.github.io/Phone-Catalog/#/",
    codeLink: "https://github.com/Moddderi/Phone-Catalog",
  },
] as const;

export const education = [
  { id: "mate", name: "Mate Academy", period: "2025", logo: "/logos/mate.png" },
  { id: "itstep", name: "IT Step Academy", period: "2024", logo: "/logos/itstep.png" },
  { id: "college", name: "Poltava Polytechnic Faculty College", period: "2024", ongoing: true, logo: null },
] as const;

export type ContactLink = {
  id: "email" | "telegram" | "linkedin" | "github";
  label: string;
  value: string;
  href: string;
};

export const contacts: ContactLink[] = [
  {
    id: "email",
    label: "Email",
    value: "kiricenkoo182@gmail.com",
    href: "mailto:kiricenkoo182@gmail.com",
  },
  {
    id: "telegram",
    label: "Telegram",
    value: "@kiricholeg5",
    href: "https://t.me/kiricholeg5",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "oleh-kyrychenko",
    href: "https://www.linkedin.com/in/oleh-kyrychenko-8839b73a6/",
  },
  {
    id: "github",
    label: "GitHub",
    value: "Moddderi",
    href: "https://github.com/Moddderi",
  },
];

/** Public CV (served from /public). */
export const resume = {
  href: "/Kyrychenko_Oleh_CV.pdf",
  fileName: "Oleh_Kyrychenko_CV.pdf",
} as const;

export const syntaxaiUrl = "https://syntaxai.app";
