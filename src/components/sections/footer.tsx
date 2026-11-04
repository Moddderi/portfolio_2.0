"use client";

import { profile } from "@/data/profile";
import { useLocale } from "@/i18n/locale-provider";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-white/[0.06] px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-center text-xs text-zinc-600">
        <p>
          © {new Date().getFullYear()} {profile.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
