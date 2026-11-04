import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteProvider } from "@/components/providers/site-provider";
import { LocaleProvider } from "@/i18n/locale-provider";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description =
  "Full-Stack Engineer focused on process optimization. I cut a department from 8 people to 2 with Lean, Theory of Constraints and code. Founder of SyntaxAI.";

export const metadata: Metadata = {
  title: { default: `${profile.name} — Full-Stack Engineer · Process Optimization`, template: `%s · ${profile.name}` },
  description,
  openGraph: {
    title: `${profile.name} — Full-Stack Engineer · Process Optimization`,
    description,
    siteName: profile.name,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: profile.name, description },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Always start at the top on reload – never restore the previous scroll position. */}
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual'" }} />
      </head>
      <body>
        <LocaleProvider>
          <SiteProvider>{children}</SiteProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
