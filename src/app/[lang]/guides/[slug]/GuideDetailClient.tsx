"use client";


import Link from "next/link";
import { AdBanner } from "@/components/AdSense";
import { useEffect, useState, type ReactNode } from "react";
import guidesData from "@/lib/data/guides.json";
import artistsData from "@/lib/data/artists.json";

const guideTranslations: Record<string, any> = {
   fr: { notFound: "Guide non trouvé", backToGuides: "← Retour aux guides", otherGuides: "Autres guides", tips: "Conseils", rewards: "Récompenses", explanation: "Explication", artistDatabaseTitle: "Base de Données Artistes", artistDatabaseDesc: "Découvrez tous les artistes", tierListTitle: "Tier List", tierListDesc: "Classement des meilleurs artistes", relatedGuides: "Guides liés", relatedArtists: "Artistes liés", glossary: "Glossaire du guide", viewFullGlossary: "→ Voir le glossaire complet", noRelatedGuides: "Aucun guide lié", noRelatedArtists: "Aucun artiste lié" },
   en: { notFound: "Guide not found", backToGuides: "← Back to Guides", otherGuides: "Other Guides", tips: "Tips", rewards: "Rewards", explanation: "Explanation", artistDatabaseTitle: "Artist Database", artistDatabaseDesc: "Discover all artists", tierListTitle: "Tier List", tierListDesc: "Best artists ranking", relatedGuides: "Related guides", relatedArtists: "Related artists", glossary: "Guide glossary", viewFullGlossary: "→ View full glossary", noRelatedGuides: "No related guides", noRelatedArtists: "No related artists" },
   it: { notFound: "Guida non trovata", backToGuides: "← Torna alle guide", otherGuides: "Altre guide", tips: "Consigli", rewards: "Ricompense", explanation: "Spiegazione", artistDatabaseTitle: "Database Artisti", artistDatabaseDesc: "Scopri tutti gli artisti", tierListTitle: "Tier List", tierListDesc: "Classifica dei migliori artisti", relatedGuides: "Guide correlate", relatedArtists: "Artisti correlati", glossary: "Glossario della guida", viewFullGlossary: "→ Vedi glossario completo", noRelatedGuides: "Nessuna guida correlata", noRelatedArtists: "Nessun artista correlato" },
   es: { notFound: "Guía no encontrada", backToGuides: "← Volver a las guías", otherGuides: "Otras guías", tips: "Consejos", rewards: "Recompensas", explanation: "Explicación", artistDatabaseTitle: "Base de Datos de Artistas", artistDatabaseDesc: "Descubre todos los artistas", tierListTitle: "Tier List", tierListDesc: "Ranking de los mejores artistas", relatedGuides: "Guías relacionadas", relatedArtists: "Artistas relacionados", glossary: "Glosario del guía", viewFullGlossary: "→ Ver glosario completo", noRelatedGuides: "No hay guías relacionadas", noRelatedArtists: "No hay artistas relacionados" },
   pt: { notFound: "Guia não encontrado", backToGuides: "← Voltar aos guias", otherGuides: "Outros guias", tips: "Dicas", rewards: "Recompensas", explanation: "Explicação", artistDatabaseTitle: "Base de Artistas", artistDatabaseDesc: "Descubra todas as artistas", tierListTitle: "Tier List", tierListDesc: "Ranking das melhores artistas", relatedGuides: "Guias relacionados", relatedArtists: "Artistas relacionados", glossary: "Glossário do guia", viewFullGlossary: "→ Ver glossário completo", noRelatedGuides: "Sem guias relacionados", noRelatedArtists: "Sem artistas relacionados" },
   pl: { notFound: "Poradnik nie znaleziony", backToGuides: "← Wróć do poradników", otherGuides: "Inne poradniki", tips: "Wskazówki", rewards: "Nagrody", explanation: "Wyjaśnienie", artistDatabaseTitle: "Baza Artystów", artistDatabaseDesc: "Poznaj wszystkich artystów", tierListTitle: "Tier List", tierListDesc: "Ranking najlepszych artystów", relatedGuides: "Powiązane poradników", relatedArtists: "Powiązani artyści", glossary: "Słownik poradnika", viewFullGlossary: "→ Zobacz pełny słownik", noRelatedGuides: "Brak powiązanych poradników", noRelatedArtists: "Brak powiązanych artystów" },
   id: { notFound: "Panduan tidak ditemukan", backToGuides: "← Kembali ke panduan", otherGuides: "Panduan lain", tips: "Tips", rewards: "Hadiah", explanation: "Penjelasan", artistDatabaseTitle: "Database Artis", artistDatabaseDesc: "Lihat semua artis", tierListTitle: "Tier List", tierListDesc: "Peringkat artis terbaik", relatedGuides: "Panduan terkait", relatedArtists: "Artis terkait", glossary: "Glosarium panduan", viewFullGlossary: "→ Lihat glosarium lengkap", noRelatedGuides: "Tidak ada panduan terkait", noRelatedArtists: "Tidak ada artis terkait" },
   ru: { notFound: "Гайд не найден", backToGuides: "← Вернуться к гайдам", otherGuides: "Другие гайды", tips: "Советы", rewards: "Награды", explanation: "Объяснение", artistDatabaseTitle: "База артистов", artistDatabaseDesc: "Все артисты", tierListTitle: "Tier List", tierListDesc: "Рейтинг лучших артистов", relatedGuides: "Связанные гайды", relatedArtists: "Связанные артисты", glossary: "Глоссарий гайда", viewFullGlossary: "→ Смотреть полный глоссарий", noRelatedGuides: "Нет связанных гайдов", noRelatedArtists: "Нет связанных артистов" },
   de: { notFound: "Leitfaden nicht gefunden", backToGuides: "← Zurück zu den Leitfäden", otherGuides: "Weitere Leitfäden", tips: "Tipps", rewards: "Belohnungen", explanation: "Erklärung", artistDatabaseTitle: "Künstlerdatenbank", artistDatabaseDesc: "Entdecke alle Künstler", tierListTitle: "Tier Liste", tierListDesc: "Beste Künstler Rangliste", relatedGuides: "Verwandte Leitfäden", relatedArtists: "Verwandte Künstler", glossary: "Leitfaden-Glossar", viewFullGlossary: "→ Vollständiges Glossar ansehen", noRelatedGuides: "Keine verwandten Leitfäden", noRelatedArtists: "Keine verwandten Künstler" },
};

type GuideSlug = {
  fr?: string;
  en?: string;
  it?: string;
  es?: string;
  pt?: string;
  pl?: string;
  id?: string;
  ru?: string;
  de?: string;
};

type Guide = {
  id: string;
  slugs?: GuideSlug;
  title: string;
  title_en?: string;
  title_it?: string;
  title_es?: string;
  title_pt?: string;
  title_pl?: string;
  title_id?: string;
  title_ru?: string;
  title_de?: string;
  description: string;
  description_en?: string;
  description_it?: string;
  description_es?: string;
  description_pt?: string;
  description_pl?: string;
  description_id?: string;
  description_ru?: string;
  description_de?: string;
  icon?: string;
  color?: string;
  category?: string;
  category_en?: string;
  category_it?: string;
  category_es?: string;
  category_pt?: string;
  category_pl?: string;
  category_id?: string;
  category_ru?: string;
  category_de?: string;
  readTime?: string;
  content?: string;
  content_en?: string;
  content_it?: string;
  content_es?: string;
  content_pt?: string;
  content_pl?: string;
  content_id?: string;
  content_ru?: string;
  content_de?: string;
  tips?: string;
  tips_en?: string;
  tips_it?: string;
  tips_es?: string;
  tips_pt?: string;
  tips_pl?: string;
  tips_id?: string;
  tips_ru?: string;
  tips_de?: string;
  rewards?: string;
  rewards_en?: string;
  rewards_it?: string;
  rewards_es?: string;
  rewards_pt?: string;
  rewards_pl?: string;
  rewards_id?: string;
  rewards_ru?: string;
  rewards_de?: string;
  guideType?: "classic" | "event" | "special";
  stage?: "early" | "mid" | "late" | null;
  difficulty?: "beginner" | "intermediate" | "advanced" | null;
  relatedGuides?: string[];
  relatedArtists?: string[];
};

const guides: Guide[] = [
];


const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

const allGuides: Guide[] = (() => {
  const merged = new Map<string, Guide>();
  [...guides, ...((guidesData as unknown as Guide[]) || [])].forEach((guide) => {
    if (!guide?.id) return;
    merged.set(guide.id, guide);
  });
  return Array.from(merged.values());
})();

const artistsBySlug = new Map(
  (artistsData as { name: string }[]).map((artist) => [slugify(artist.name), artist])
);

export default function GuideDetailClient({ lang, slug, guideId }: { lang: string; slug: string; guideId?: string }) {
  const t = guideTranslations[lang] || guideTranslations.en;
  
  const guide = guideId ? allGuides.find(g => g.id === guideId) : allGuides.find(g => g.id === slug);
  const langSlug = guide?.slugs?.[lang as keyof typeof guide.slugs] || guide?.id || slug;
  const guideColor = guide?.color || "#8b5cf6";
  
  const getGuideSlug = (g: typeof guide) => g?.slugs?.[lang as keyof typeof g.slugs] || g?.id || '';
  const [glossaryContent, setGlossaryContent] = useState<string>("");

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

  if (!guide) {
    return (
      <div className="container" style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", marginBottom: "20px" }}>{t.notFound}</h1>
        <Link href={`/${lang}/guides/`} style={{ color: "#8b5cf6" }}>
          {t.backToGuides}
        </Link>
      </div>
    );
  }

  // Helper to parse inline bold text **text** into styled spans
  const parseInlineBold = (text: string, accentColor: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      return <span key={idx}>{part}</span>;
    });
  };

  // Helper to render markdown-like content
  const renderContent = (text: string, color: string) => {
    const normalizedText = text.replace(/\n{3,}/g, '\n\n');
    const lines = normalizedText.split('\n');
    const elements: ReactNode[] = [];
    let listMode = false;
    let pendingBullet = false;
    let lastNonEmpty = '';
    let lastWasEmpty = false;
    const isSectionTitle = (line: string, nextLine?: string) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      if (trimmed.endsWith(':')) return false;
      if (trimmed.includes(':')) return false;
      if (trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) return false;
      if (/[.!?]/.test(trimmed)) return false;
      if (trimmed.length > 70) return false;
      const nextTrimmed = (nextLine || '').trim();
      return nextTrimmed === '' || nextTrimmed.startsWith('- ') || nextTrimmed.length < 40;
    };

    const pushParagraph = (contentLine: string, key: number) => {
      elements.push(
        <p key={key} className="guide-p">
          {parseInlineBold(contentLine, color)}
        </p>
      );
    };

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const normalizedLine = line.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\u00a0/g, ' ');
      const trimmed = normalizedLine.trim();
      const trimmedNoSpaces = trimmed.replace(/\s+/g, '');
      const bulletInlineText = trimmed.replace(/^[•·-]\s*/, '').trim();
      const isBulletOnly = /^[\s•·\-–—]+$/.test(normalizedLine);
      const isDashList = normalizedLine.startsWith('- ');
      const isNumbered = /^\d+\.\s/.test(trimmed);
      const isNumberOnly = /^\d+\.$/.test(trimmed);

      if (isBulletOnly || trimmedNoSpaces === '•' || trimmedNoSpaces === '-' || trimmedNoSpaces === '·') {
        pendingBullet = true;
        listMode = true;
        continue;
      }

      if (!trimmed) {
        if (pendingBullet) continue;
        if (lastWasEmpty) continue;
        lastWasEmpty = true;
        if (listMode) {
          elements.push(<div key={i} style={{ height: "4px" }} />);
          continue;
        }
        listMode = false;
        elements.push(<div key={i} style={{ height: "8px" }} />);
        continue;
      }
      lastWasEmpty = false;

      if ((trimmed.startsWith('•') || trimmed.startsWith('·')) && bulletInlineText) {
        listMode = true;
        pendingBullet = false;
        elements.push(
          <div key={i} className="guide-li">
            <span className="guide-li-dot">•</span>
            <span className="guide-li-text">{parseInlineBold(bulletInlineText, color)}</span>
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }

      if (isDashList) {
        pendingBullet = false;
        listMode = true;
        elements.push(
          <div key={i} className="guide-li">
            <span className="guide-li-dot">▸</span>
            <span className="guide-li-text">{parseInlineBold(trimmed.replace('- ', ''), color)}</span>
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }

      if (isNumbered) {
        pendingBullet = false;
        listMode = true;
        elements.push(
          <div key={i} className="guide-num">
            <span className="guide-num-badge">{trimmed.match(/^\d+/)![0]}.</span>
            <span className="guide-li-text">{parseInlineBold(trimmed.replace(/^\d+\.\s/, ''), color)}</span>
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }

      if (isNumberOnly) {
        pendingBullet = false;
        listMode = true;
        const nextRaw = lines[i + 1] || '';
        const nextNormalized = nextRaw.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\u00a0/g, ' ');
        const nextTrimmed = nextNormalized.trim();
        if (nextTrimmed && !nextTrimmed.startsWith('- ') && !nextTrimmed.startsWith('•') && !nextTrimmed.startsWith('·') && !/^\d+\./.test(nextTrimmed) && !nextTrimmed.startsWith('#')) {
          elements.push(
            <div key={i} className="guide-num">
              <span className="guide-num-badge">{trimmed.replace('.', '')}.</span>
              <span className="guide-li-text">{parseInlineBold(nextTrimmed, color)}</span>
            </div>
          );
          lastNonEmpty = nextTrimmed;
          i += 1;
          continue;
        }
        elements.push(
          <div key={i} className="guide-num">
            <span className="guide-num-badge">{trimmed.replace('.', '')}.</span>
            <span className="guide-li-text"></span>
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }

      if (pendingBullet) {
        if (trimmed.endsWith(':')) {
          pendingBullet = false;
          listMode = false;
        } else if (trimmed.length <= 80 && !/[.!?]$/.test(trimmed)) {
          elements.push(
            <div key={i} className="guide-li">
              <span className="guide-li-dot">•</span>
              <span className="guide-li-text">{parseInlineBold(trimmed, color)}</span>
            </div>
          );
          pendingBullet = false;
          listMode = true;
          continue;
        }
        pendingBullet = false;
      }

      if (listMode && lastNonEmpty.endsWith(':')) {
        if (trimmed.endsWith(':')) {
          listMode = false;
        } else if (trimmed.length <= 80 && !/[.!?]$/.test(trimmed)) {
          elements.push(
            <div key={i} className="guide-li">
              <span className="guide-li-dot">•</span>
              <span className="guide-li-text">{parseInlineBold(trimmed, color)}</span>
            </div>
          );
          continue;
        }
        listMode = false;
      }

      if (isSectionTitle(trimmed, lines[i + 1])) {
        listMode = false;
        elements.push(
          <h3 key={i} className="guide-section">
            {parseInlineBold(trimmed, color)}
          </h3>
        );
        lastNonEmpty = trimmed;
        continue;
      }

      if (line.startsWith('## ')) {
        listMode = false;
        elements.push(
          <h2 key={i} className="guide-h2">
            {parseInlineBold(line.replace('## ', ''), color)}
          </h2>
        );
        lastNonEmpty = trimmed;
        continue;
      }
      if (line.startsWith('### ')) {
        listMode = false;
        elements.push(
          <h3 key={i} className="guide-h3">
            {parseInlineBold(line.replace('### ', ''), color)}
          </h3>
        );
        lastNonEmpty = trimmed;
        continue;
      }
      if (line.startsWith('#### ')) {
        listMode = false;
        elements.push(
          <div key={i} className="guide-h4">
            {parseInlineBold(line.replace('#### ', ''), color)}
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }
      if (/^(explication courte|explication longue|short explanation|long explanation|spiegazione breve|spiegazione dettagliata|explicación corta|explicación larga|explicação curta|explicação longa|krótkie wyjaśnienie|długie wyjaśnienie|penjelasan singkat|penjelasan panjang|краткое объяснение|подробное объяснение|kurze erklärung|lange erklärung|conseils|tips|tipps|rewards|récompenses|guides liés|glossaire)/i.test(trimmed)) {
        listMode = false;
        elements.push(
          <h3 key={i} className="guide-label">
            {parseInlineBold(trimmed, color)}
          </h3>
        );
        lastNonEmpty = trimmed;
        continue;
      }
      if (/^(type\s*:\s*|niveau\s*:\s*|level\s*:\s*)/i.test(trimmed)) {
        listMode = false;
        elements.push(
          <div key={i} className="guide-meta">
            {parseInlineBold(trimmed, color)}
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }
      if (line.startsWith('| ')) {
        listMode = false;
        const cells = line.split('|').filter(c => c.trim() && !c.match(/^[-\s]+$/));
        if (cells.length === 0) continue;
        elements.push(
          <div key={i} className="guide-table-row">
            {cells.map((cell, j) => (
              <span key={j} className="guide-table-cell">{cell.trim()}</span>
            ))}
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }

      if (line.startsWith('**') && line.endsWith('**')) {
        listMode = false;
        elements.push(
          <div key={i} className="guide-strong">
            {parseInlineBold(line.replace(/\*\*/g, ''), color)}
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }

      if (trimmed.endsWith(':') && trimmed.length <= 90) {
        elements.push(
          <div key={i} className="guide-subhead">
            {parseInlineBold(trimmed, color)}
          </div>
        );
      } else {
        pushParagraph(trimmed, i);
      }
      lastNonEmpty = trimmed;
      listMode = lastNonEmpty.endsWith(':');
    }

    return (
      <div className="guide-content" style={{ "--accent": color } as React.CSSProperties}>
        {elements}
      </div>
    );
  };

  const emDash = '\u2014';

  const parseGlossaryEntries = (text: string) => {
    if (!text) return [] as { term: string; definition: string }[];
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const emIdx = line.indexOf(emDash);
        if (emIdx === -1) {
          const hypIdx = line.indexOf(' - ');
          if (hypIdx === -1) return null;
          const term = line.substring(0, hypIdx).trim();
          const definition = line.substring(hypIdx + 3).trim();
          if (!term || !definition) return null;
          return { term, definition };
        }
        const term = line.substring(0, emIdx).trim();
        const definition = line.substring(emIdx + 1).trim();
        if (!term || !definition) return null;
        return { term, definition };
      })
      .filter(Boolean) as { term: string; definition: string }[];
  };

  const getGlossaryForGuide = (entries: { term: string; definition: string }[], contentText: string) => {
    if (!entries.length || !contentText) return [] as { term: string; definition: string }[];
    const contentLower = contentText.toLowerCase();
    const matches = entries
      .map((entry) => {
        const termLower = entry.term.toLowerCase();
        const index = contentLower.indexOf(termLower);
        if (index === -1) return null;
        return { ...entry, index };
      })
      .filter(Boolean) as { term: string; definition: string; index: number }[];

    return matches
      .sort((a, b) => a.index - b.index)
      .map(({ term, definition }) => ({ term, definition }));
  };

  const sectionHeadings = {
    fr: { short: ["Explication courte"], long: ["Explication longue"] },
    en: { short: ["Short Explanation"], long: ["Long Explanation"] },
    it: { short: ["Spiegazione Breve"], long: ["Spiegazione Dettagliata"] },
    es: { short: ["Explicación Corta"], long: ["Explicación Larga"] },
    pt: { short: ["Explicação Curta"], long: ["Explicação Longa"] },
    pl: { short: ["Krótkie Wyjaśnienie", "Krótka Wyjaśnienie"], long: ["Długie Wyjaśnienie"] },
    id: { short: ["Penjelasan Singkat"], long: ["Penjelasan Panjang"] },
    ru: { short: ["Краткое объяснение"], long: ["Подробное Объяснение"] },
    de: { short: ["Kurze Erklärung"], long: ["Lange Erklärung"] },
  } as const;

  const categoryLabels = {
    type: {
      classic: { fr: "Classique", en: "Classic", it: "Classica", es: "Clásica", pt: "Clássico", pl: "Klasyczny", id: "Klasik", ru: "Классический", de: "Klassisch" },
      event: { fr: "Événement", en: "Event", it: "Evento", es: "Evento", pt: "Evento", pl: "Wydarzenie", id: "Event", ru: "Событие", de: "Event" },
      special: { fr: "Spécial", en: "Special", it: "Speciale", es: "Especial", pt: "Especial", pl: "Specjalny", id: "Spesial", ru: "Специальный", de: "Spezial" },
    },
    stage: {
      early: { fr: "Early", en: "Early", it: "Early", es: "Early", pt: "Early", pl: "Early", id: "Early", ru: "Early", de: "Early" },
      mid: { fr: "Mid", en: "Mid", it: "Mid", es: "Mid", pt: "Mid", pl: "Mid", id: "Mid", ru: "Mid", de: "Mid" },
      late: { fr: "Late", en: "Late", it: "Late", es: "Late", pt: "Late", pl: "Late", id: "Late", ru: "Late", de: "Late" },
    },
    difficulty: {
      beginner: { fr: "Débutant", en: "Beginner", it: "Principiante", es: "Principiante", pt: "Iniciante", pl: "Początkujący", id: "Pemula", ru: "Начинающий", de: "Anfänger" },
      intermediate: { fr: "Intermédiaire", en: "Intermediate", it: "Intermedio", es: "Intermedio", pt: "Intermediário", pl: "Średni", id: "Menengah", ru: "Средний", de: "Fortgeschritten" },
      advanced: { fr: "Avancé", en: "Advanced", it: "Avanzato", es: "Avanzado", pt: "Avançado", pl: "Zaawansowany", id: "Lanjutan", ru: "Продвинутый", de: "Experte" },
    },
  } as const;

  const getCategoryLabel = (currentGuide: Guide, currentLang: string) => {
    const localized = currentGuide[`category_${currentLang}` as keyof typeof currentGuide] as string | undefined;
    if (localized) return localized;
    if (currentGuide.category) return currentGuide.category;

    const parts: string[] = [];
    if (currentGuide.guideType) {
      const label = categoryLabels.type[currentGuide.guideType]?.[currentLang as keyof typeof categoryLabels.type.classic]
        || categoryLabels.type[currentGuide.guideType]?.en;
      if (label) parts.push(label);
    }
    if (currentGuide.stage) {
      const label = categoryLabels.stage[currentGuide.stage]?.[currentLang as keyof typeof categoryLabels.stage.early]
        || categoryLabels.stage[currentGuide.stage]?.en;
      if (label) parts.push(label);
    }
    if (currentGuide.difficulty) {
      const label = categoryLabels.difficulty[currentGuide.difficulty]?.[currentLang as keyof typeof categoryLabels.difficulty.beginner]
        || categoryLabels.difficulty[currentGuide.difficulty]?.en;
      if (label) parts.push(label);
    }
    return parts.join(" • ");
  };

  const rewardsContent = guide[`rewards_${lang}` as keyof typeof guide] as string || guide.rewards;
  const rawContent = guide[`content_${lang}` as keyof typeof guide] as string || guide.content;
  const descriptionText = (guide[`description_${lang}` as keyof typeof guide] as string) || guide.description;
  const localizedTitle = (guide as any)[`title_${lang}`] || guide.title;
  const extractedContent = rawContent || '';
  const stripLeadingTitle = (contentText: string, titleText: string) => {
    if (!contentText) return contentText;
    const lines = contentText.split('\n');
    const firstIndex = lines.findIndex((line) => line.trim());
    if (firstIndex === -1) return contentText;
    const firstLine = lines[firstIndex].trim();
    const normalizedTitle = titleText.toLowerCase();
    const normalizedLine = firstLine.toLowerCase();
    if (normalizedLine === normalizedTitle || normalizedLine === `guide ${normalizedTitle}`) {
      return [...lines.slice(0, firstIndex), ...lines.slice(firstIndex + 1)].join('\n').trim();
    }
    return contentText;
  };
  const stripLeadingDescription = (contentText: string, description: string) => {
    if (!contentText || !description) return contentText;
    const lines = contentText.split('\n');
    const firstIndex = lines.findIndex((line) => line.trim());
    if (firstIndex === -1) return contentText;
    const firstLine = lines[firstIndex].trim();
    if (firstLine === description.trim()) {
      return [...lines.slice(0, firstIndex), ...lines.slice(firstIndex + 1)].join('\n').trim();
    }
    return contentText;
  };
  const stripMetaLines = (contentText: string) => {
    if (!contentText) return contentText;
    
    // Patterns to strip from content (all languages)
    const metaPatterns = [
      // Type/Niveau/Level
      /^type\s*:/i, /^niveau\s*:/i, /^level\s*:/i,
      /^type\s*—/i, /^niveau\s*—/i, /^level\s*—/i,
      // Section headers (standalone or with colon)
      /^(short explanation|long explanation|explication courte|explication longue|court|long|kurz erklärung|lange erklärung|spiegazione breve|spiegazione lunga|explicación corta|explicación larga|explicação curta|explicação longa)$/i,
      /^(short|long|court|long|kurz|lang|corto|largo|breve|lunga)$/i,
      // Guide prefix that might appear in content
      /^guide\s*:/i,
    ];
    
    const lines = contentText.split('\n');
    const filtered = lines.filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return true;
      
      // Skip empty-ish lines
      if (trimmed.length < 2) return true;
      
      // Skip meta patterns
      for (const pattern of metaPatterns) {
        if (pattern.test(trimmed)) return false;
      }
      
      return true;
    });
    
    return filtered.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  };

  let mainContent = stripLeadingTitle(extractedContent, localizedTitle);
  mainContent = stripLeadingDescription(mainContent, descriptionText);
  mainContent = stripMetaLines(mainContent);
  const glossaryEntries = getGlossaryForGuide(parseGlossaryEntries(glossaryContent), rawContent || "");
  const relatedGuideEntries = (guide.relatedGuides || [])
    .map((id) => allGuides.find((g) => g.id === id))
    .filter(Boolean) as Guide[];
  const relatedArtistEntries = (guide.relatedArtists || [])
    .map((slugValue) => {
      const artist = artistsBySlug.get(slugValue);
      return {
        slug: slugValue,
        name: artist?.name || slugValue,
      };
    });

  return (
    <>
      {/* Hero Header */}
      <div style={{
        background: "rgba(15,15,26,0.78)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${guideColor}44`,
        padding: "32px 0 24px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
          <Link href={`/${lang}/guides/`} style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.85rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "12px",
            transition: "color 0.2s",
          }}>
            ← {t.backToGuides}
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
              background: `linear-gradient(135deg, ${guideColor}, ${guideColor}88)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.6rem",
              boxShadow: `0 8px 24px ${guideColor}55`,
            }}>
              {guide.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px", flexWrap: "wrap" }}>
                <span style={{
                  padding: "3px 10px", borderRadius: "20px",
                  background: `${guideColor}22`, color: guideColor,
                  fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  {getCategoryLabel(guide, lang)}
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>⏱️ {guide.readTime}</span>
              </div>
              <h1 style={{
                fontSize: "1.7rem", fontWeight: 800, margin: 0,
                background: `linear-gradient(135deg, ${guideColor}, #fff)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {(guide as any)[`title_${lang}`] || guide.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 20px 0" }}>

        {/* Rewards */}
        {rewardsContent && (
          <div style={{
            background: "rgba(8,32,14,0.78)",
            borderRadius: "16px",
            border: "1px solid rgba(34,197,94,0.3)",
            padding: "24px",
            marginBottom: "16px",
            backdropFilter: "blur(10px)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "0.9rem",
              }}>🎁</span>
              <h2 style={{ margin: 0, color: "#22c55e", fontSize: "1rem", fontWeight: 700 }}>
                {t.rewards}
              </h2>
            </div>
            {/* Rewards en grille si liste de bullet points */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "8px",
            }}>
              {rewardsContent.split('\n').map((line, i) => {
                if (!line.trim()) return null;
                const text = line.startsWith('- ') ? line.replace('- ', '') : line;
                return (
                  <div key={i} style={{
                    display: "flex", gap: "10px", alignItems: "flex-start",
                    background: "rgba(34,197,94,0.08)",
                    borderRadius: "10px", padding: "10px 14px",
                    border: "1px solid rgba(34,197,94,0.15)",
                  }}>
                    <span style={{ color: "#22c55e", flexShrink: 0, fontSize: "0.85rem", marginTop: "1px" }}>✦</span>
                    <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.88rem", lineHeight: 1.5 }}>{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main content */}
        {mainContent && (
          <div className="guide-article">
            {renderContent(mainContent, guideColor)}
          </div>
        )}

        {(relatedGuideEntries.length > 0 || relatedArtistEntries.length > 0) && (
          <div style={{
            background: "rgba(12,12,28,0.82)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "24px",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <h2 style={{ margin: 0, color: "rgba(255,255,255,0.85)", fontSize: "1rem", fontWeight: 700 }}>
                {t.relatedGuides}
              </h2>
            </div>
            <div style={{ padding: "18px 20px" }}>
              {relatedGuideEntries.length ? (
                <div style={{ display: "grid", gap: "10px" }}>
                  {relatedGuideEntries.map((relatedGuide) => (
                    <Link
                      key={relatedGuide.id}
                      href={`/${lang}/guides/${getGuideSlug(relatedGuide)}/`}
                      style={{
                        textDecoration: "none",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        border: `1px solid ${relatedGuide.color}33`,
                        background: "rgba(255,255,255,0.03)",
                        color: "rgba(255,255,255,0.85)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>{relatedGuide.icon}</span>
                      <span>{relatedGuide[`title_${lang}` as keyof typeof relatedGuide] as string || relatedGuide.title}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>{t.noRelatedGuides}</div>
              )}
            </div>

            <div style={{ padding: "0 20px 18px" }}>
              <h3 style={{ margin: "0 0 12px", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", fontWeight: 700 }}>
                {t.relatedArtists}
              </h3>
              {relatedArtistEntries.length ? (
                <div style={{ display: "grid", gap: "10px" }}>
                  {relatedArtistEntries.map((artist) => (
                    <Link
                      key={artist.slug}
                      href={`/${lang}/artist/${artist.slug}/`}
                      style={{
                        textDecoration: "none",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.03)",
                        color: "rgba(255,255,255,0.85)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>🎤</span>
                      <span>{artist.name}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>{t.noRelatedArtists}</div>
              )}
            </div>
          </div>
        )}

        {glossaryEntries.length > 0 && (
          <div style={{
            background: "rgba(8,12,22,0.82)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "24px",
            padding: "20px",
          }}>
            <h2 style={{ margin: "0 0 14px", color: "rgba(255,255,255,0.85)", fontSize: "1rem", fontWeight: 700 }}>
              {t.glossary}
            </h2>
            <div style={{ display: "grid", gap: "12px" }}>
              {glossaryEntries.map((entry) => (
                <div key={entry.term} style={{
                  borderRadius: "12px",
                  padding: "12px 14px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <div style={{ color: guideColor, fontWeight: 700, fontSize: "0.9rem", marginBottom: "6px" }}>
                    {entry.term}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    {entry.definition}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "14px", textAlign: "right" }}>
              <Link
                href={`/${lang}/glossary/`}
                style={{
                  color: "rgba(139, 92, 246, 0.85)",
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                {t.viewFullGlossary}
              </Link>
            </div>
          </div>
        )}

        <AdBanner />

        {/* Autres guides */}
        <div style={{ marginTop: "32px", marginBottom: "24px" }}>
          <h3 style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>
            {t.otherGuides}
          </h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {allGuides.filter(g => g.id !== guide.id).slice(0, 5).map(g => (
              <Link
                key={g.id}
                href={`/${lang}/guides/${getGuideSlug(g)}/`}
                style={{
                  padding: "10px 16px",
                   background: "rgba(10,10,24,0.72)",
                   borderRadius: "10px",
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  border: `1px solid ${g.color || "#8b5cf6"}33`,
                  display: "flex", alignItems: "center", gap: "8px",
                  fontSize: "0.85rem", fontWeight: 500,
                  transition: "all 0.2s",
                }}
              >
                <span>{g.icon || "📘"}</span>
                <span>{g[`title_${lang}` as keyof typeof g] as string || g.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Internal Linking Hubs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          <Link href={`/${lang}/teambuilder/`} style={{
            padding: "18px", background: "rgba(244,114,182,0.1)",
            borderRadius: "12px", border: "1px solid rgba(244,114,182,0.25)",
            textDecoration: "none", display: "block",
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>🎤</div>
            <div style={{ color: "#f472b6", fontWeight: 600, fontSize: "0.9rem", marginBottom: "3px" }}>
              {t.artistDatabaseTitle}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>
              {t.artistDatabaseDesc}
            </div>
          </Link>

          <Link href={`/${lang}/tierlist/`} style={{
            padding: "18px", background: "rgba(251,191,36,0.1)",
            borderRadius: "12px", border: "1px solid rgba(251,191,36,0.25)",
            textDecoration: "none", display: "block",
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>🏆</div>
            <div style={{ color: "#fbbf24", fontWeight: 600, fontSize: "0.9rem", marginBottom: "3px" }}>
              {t.tierListTitle}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>
              {t.tierListDesc}
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
        .guide-top-row {
          grid-template-columns: 1fr !important;
        }
      }

      .guide-article {
        background: linear-gradient(180deg, rgba(12,12,28,0.92), rgba(10,10,24,0.92));
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 18px;
        padding: 28px;
        margin-bottom: 24px;
        box-shadow: 0 12px 30px rgba(0,0,0,0.35);
      }

        .guide-content {
          color: rgba(230,232,245,0.92);
          font-size: 0.98rem;
          line-height: 1.85;
          font-weight: 430;
          letter-spacing: 0.01em;
        }

        .guide-h2 {
          margin: 28px 0 12px;
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 6px;
          position: relative;
        }

        .guide-h2::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 48px;
          height: 2px;
          background: var(--accent);
          opacity: 0.6;
        }

        .guide-h3 {
          margin: 18px 0 8px;
          font-size: 1.02rem;
          font-weight: 700;
          color: rgba(255,255,255,0.95);
        }

        .guide-h4 {
          margin: 14px 0 6px;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--accent);
        }

        .guide-label {
          margin: 18px 0 6px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .guide-section {
          margin: 18px 0 6px;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--accent);
        }

        .guide-subhead {
          margin: 12px 0 6px;
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          border-left: 2px solid var(--accent);
          padding-left: 10px;
        }

        .guide-meta {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
          margin-bottom: 6px;
        }

      .guide-p {
        margin: 0 0 12px;
        color: rgba(240,240,255,0.88);
      }

      .guide-li,
      .guide-num {
        display: flex;
        gap: 10px;
        margin-bottom: 8px;
        align-items: flex-start;
        color: rgba(255,255,255,0.85);
      }

        .guide-li-dot {
          color: var(--accent);
          margin-top: 2px;
          flex-shrink: 0;
          font-size: 0.85rem;
          opacity: 0.85;
        }

      .guide-li-text {
        color: rgba(240,240,255,0.86);
        font-size: 0.95rem;
        line-height: 1.7;
      }

        .guide-num-badge {
          min-width: 20px;
          color: var(--accent);
          margin-top: 2px;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .guide-table-row {
          display: flex;
          gap: 8px;
          margin: 2px 0;
          font-size: 0.82rem;
        }

      .guide-table-cell {
        color: rgba(255,255,255,0.8);
        flex: 1;
        padding: 6px 8px;
        background: rgba(255,255,255,0.05);
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.08);
      }

        .guide-strong {
          margin-top: 12px;
          font-weight: 700;
          color: var(--accent);
          font-size: 0.95rem;
        }
      `}</style>
    </>
  );
}
