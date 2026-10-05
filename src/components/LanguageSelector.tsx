"use client";

import { useRouter, usePathname } from "next/navigation";

const VALID_LOCALES = ["fr", "en", "id"];

const languages = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "id", label: "Indonesia" },
];

function switchLanguage(pathname: string, newLang: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && VALID_LOCALES.includes(segments[0])) {
    segments[0] = newLang;
    return "/" + segments.join("/") + "/";
  }
  return `/${newLang}/`;
}

export function LanguageSelector({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      onChange={(e) => {
        const newLang = e.target.value;
        const newPath = switchLanguage(pathname, newLang);
        router.push(newPath);
      }}
      value={currentLang}
      className="lang-select"
      aria-label="Language"
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
