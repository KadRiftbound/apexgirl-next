"use client";

import { useRouter, usePathname } from "next/navigation";

const VALID_LOCALES = ["fr", "en", "de", "it", "es", "pt", "pl", "id", "ru"];

const languages = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "pl", label: "Polski" },
  { code: "id", label: "Indonesia" },
  { code: "ru", label: "Русский" },
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
      style={{
        background: "rgba(20, 20, 35, 0.9)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "8px",
        padding: "8px 12px",
        color: "#fff",
        fontSize: "0.85rem",
        cursor: "pointer",
        marginLeft: "12px",
        fontWeight: 500,
        minWidth: "100px"
      }}
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code} style={{ background: "#1a1a2e", color: "#fff" }}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
