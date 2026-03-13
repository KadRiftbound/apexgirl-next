"use client";

import { useRouter } from "next/navigation";

const languages = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "pl", label: "Polski" },
  { code: "id", label: "Indonesia" },
  { code: "ru", label: "Русский" },
];

export function LanguageSelector({ currentLang }: { currentLang: string }) {
  const router = useRouter();

  return (
    <select
      onChange={(e) => {
        const newLang = e.target.value;
        router.push(`/${newLang}/`);
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
