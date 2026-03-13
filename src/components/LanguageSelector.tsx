"use client";

import { useRouter } from "next/navigation";

const languages = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
  { code: "pl", label: "PL" },
  { code: "id", label: "ID" },
  { code: "ru", label: "RU" },
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
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "8px",
        padding: "6px 10px",
        color: "#fff",
        fontSize: "0.85rem",
        cursor: "pointer",
        marginLeft: "12px"
      }}
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code}>{l.label}</option>
      ))}
    </select>
  );
}
