"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

const SECTION_COLORS = [
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#6366f1",
  "#14b8a6",
  "#f97316",
  "#84cc16",
  "#06b6d4",
  "#a855f7",
];

const glossaryFileMap: Record<string, string> = {
  fr: "/glossaire.txt",
  en: "/glossary.txt",
  it: "/glossario.txt",
  es: "/glosario.txt",
  pt: "/glossario_pt.txt",
  pl: "/glosariusz.txt",
  id: "/glosarium.txt",
  ru: "/glossariy.txt",
  de: "/glossar.txt",
};

const labels: Record<string, { title: string; search: string; noResults: string; back: string }> = {
  fr: { title: "Glossaire Top Girl", search: "Rechercher un terme...", noResults: "Aucun résultat trouvé", back: "← Retour aux guides" },
  en: { title: "Top Girl Glossary", search: "Search for a term...", noResults: "No results found", back: "← Back to Guides" },
  de: { title: "Top Girl Glossar", search: "Begriff suchen...", noResults: "Keine Ergebnisse gefunden", back: "← Zurück zu den Leitfäden" },
  it: { title: "Glossario Top Girl", search: "Cerca un termine...", noResults: "Nessun risultato trovato", back: "← Torna alle guide" },
  es: { title: "Glosario Top Girl", search: "Buscar un término...", noResults: "No se encontraron resultados", back: "← Volver a las guías" },
  pt: { title: "Glossário Top Girl", search: "Pesquisar um termo...", noResults: "Nenhum resultado encontrado", back: "← Voltar aos guias" },
  pl: { title: "Słownik Top Girl", search: "Szukaj terminu...", noResults: "Nie znaleziono wyników", back: "← Wróć do poradników" },
  id: { title: "Glosarium Top Girl", search: "Cari istilah...", noResults: "Tidak ada hasil ditemukan", back: "← Kembali ke panduan" },
  ru: { title: "Глоссарий Top Girl", search: "Поиск термина...", noResults: "Результаты не найдены", back: "← Вернуться к гайдам" },
};

type GlossaryEntry = { term: string; definition: string };
type Section = { title: string; entries: GlossaryEntry[] };

const emDash = "\u2014";

function parseGlossaryFile(text: string): Section[] {
  if (!text) return [];
  const lines = text.split("\n");
  const sections: Section[] = [];
  let currentSection: Section | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const emIdx = trimmed.indexOf(emDash);
    const hypIdx = trimmed.indexOf(" - ");

    if (emIdx === -1 && hypIdx === -1) {
      currentSection = { title: trimmed, entries: [] };
      sections.push(currentSection);
    } else {
      let term: string, definition: string;
      if (emIdx !== -1) {
        term = trimmed.substring(0, emIdx).trim();
        definition = trimmed.substring(emIdx + 1).trim();
      } else {
        term = trimmed.substring(0, hypIdx).trim();
        definition = trimmed.substring(hypIdx + 3).trim();
      }
      if (term && definition) {
        if (!currentSection) {
          currentSection = { title: "", entries: [] };
          sections.push(currentSection);
        }
        currentSection.entries.push({ term, definition });
      }
    }
  }

  return sections.filter((s) => s.entries.length > 0);
}

function filterSections(sections: Section[], query: string): Section[] {
  if (!query.trim()) return sections;
  const q = query.toLowerCase();
  return sections
    .map((section) => ({
      ...section,
      entries: section.entries.filter(
        (e) =>
          e.term.toLowerCase().includes(q) ||
          e.definition.toLowerCase().includes(q)
      ),
    }))
    .filter((section) => section.entries.length > 0);
}

export default function GlossaryClient({ lang }: { lang: string }) {
  const [glossaryContent, setGlossaryContent] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const l = labels[lang] || labels.en;
  const glossaryFile = glossaryFileMap[lang] || "/glossary.txt";

  useEffect(() => {
    fetch(glossaryFile)
      .then((res) => (res.ok ? res.text() : ""))
      .then((text) => setGlossaryContent(text))
      .catch(() => {
        if (glossaryFile !== "/glossary.txt") {
          fetch("/glossary.txt")
            .then((r) => (r.ok ? r.text() : ""))
            .then((t) => setGlossaryContent(t))
            .catch(() => setGlossaryContent(""));
        } else {
          setGlossaryContent("");
        }
      });
  }, [lang]);

  const sections = useMemo(
    () => parseGlossaryFile(glossaryContent),
    [glossaryContent]
  );

  const filteredSections = useMemo(
    () => filterSections(sections, search),
    [sections, search]
  );

  const totalEntries = sections.reduce((sum, s) => sum + s.entries.length, 0);
  const filteredEntries = filteredSections.reduce(
    (sum, s) => sum + s.entries.length, 0
  );

  return (
    <>
      <div
        style={{
          background: "rgba(15, 15, 26, 0.78)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(139, 92, 246, 0.3)",
          padding: "32px 0 24px",
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 800,
                marginBottom: "8px",
                lineHeight: 1.2,
              }}
            >
              {l.title}
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.95rem",
                marginBottom: "20px",
              }}
            >
              {totalEntries} terms &amp; definitions
            </p>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={l.search}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.6)";
                e.currentTarget.style.background = "rgba(255,255,255,0.09)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "32px 0 60px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link
            href={`/${lang}/guides/`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.88rem",
              marginBottom: "28px",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            {l.back}
          </Link>

          {filteredSections.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "rgba(255,255,255,0.4)",
                fontSize: "1.1rem",
              }}
            >
              {l.noResults}
            </div>
          ) : (
            filteredSections.map((section, sectionIdx) => {
              const color =
                SECTION_COLORS[sectionIdx % SECTION_COLORS.length];
              return (
                <div key={section.title} style={{ marginBottom: "40px" }}>
                  <h2
                    style={{
                      color: color,
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      marginBottom: "14px",
                      paddingBottom: "8px",
                      borderBottom: `1px solid ${color}33`,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: color,
                        flexShrink: 0,
                      }}
                    />
                    {section.title}
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "0.78rem",
                        color: "rgba(255,255,255,0.35)",
                        fontWeight: 500,
                      }}
                    >
                      {section.entries.length}
                    </span>
                  </h2>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {section.entries.map((entry, entryIdx) => (
                      <div
                        key={`${entry.term}-${entryIdx}`}
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          borderRadius: "14px",
                          padding: "16px 18px",
                          transition: "background 0.2s, border-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.06)";
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.14)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.03)";
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.07)";
                        }}
                      >
                        <div
                          style={{
                            color: color,
                            fontWeight: 700,
                            fontSize: "0.97rem",
                            marginBottom: "6px",
                          }}
                        >
                          {entry.term}
                        </div>
                        <div
                          style={{
                            color: "rgba(255,255,255,0.72)",
                            fontSize: "0.9rem",
                            lineHeight: 1.65,
                          }}
                        >
                          {entry.definition}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}

          {search && filteredEntries !== totalEntries && (
            <div
              style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.88rem",
                marginTop: "8px",
              }}
            >
              {filteredEntries} / {totalEntries} results
            </div>
          )}
        </div>
      </div>
    </>
  );
}
