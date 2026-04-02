// Lightweight guide metadata — used server-side for generateMetadata only.
// Full guide content lives in GuideDetailClient.tsx.

import guidesData from "@/lib/data/guides.json";

export type GuideSlug = {
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

export type GuideMeta = {
  id: string;
  slugs?: GuideSlug;
  title: string;
  title_en?: string; title_it?: string; title_es?: string;
  title_pt?: string; title_pl?: string; title_id?: string; title_ru?: string; title_de?: string;
  description: string;
  description_en?: string; description_it?: string; description_es?: string;
  description_pt?: string; description_pl?: string; description_id?: string; description_ru?: string; description_de?: string;
  category?: string;
  category_en?: string; category_it?: string; category_es?: string;
  category_pt?: string; category_pl?: string; category_id?: string; category_ru?: string; category_de?: string;
  guideType?: "classic" | "event" | "special";
  stage?: "early" | "mid" | "late" | null;
  difficulty?: "beginner" | "intermediate" | "advanced" | null;
  thumbnail?: string;
  readTime?: string;
  isDone?: boolean;
  isNew?: boolean;
};

const guidesMeta = guidesData as GuideMeta[];

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

export function getGuideMeta(slug: string): GuideMeta | undefined {
  const guide = guidesMeta.find((guide) => guide.id === slug);
  if (guide) return guide;
  
  // Also search by language-specific slugs
  return guidesMeta.find((guide) => {
    if (guide.slugs) {
      const slugs = guide.slugs as GuideSlug;
      return Object.values(slugs).includes(slug);
    }
    return false;
  });
}

export function getGuideSlug(guide: GuideMeta, lang: string): string {
  if (guide.slugs) {
    const slugs = guide.slugs as GuideSlug;
    return slugs[lang as keyof GuideSlug] || guide.id;
  }
  return guide.id;
}

export function getAllGuideSlugs(guide: GuideMeta): string[] {
  if (guide.slugs) {
    const slugs = guide.slugs as GuideSlug;
    return Object.values(slugs).filter(Boolean) as string[];
  }
  return [guide.id];
}

export function getGuideIdBySlug(slug: string): string | undefined {
  const guide = getGuideMeta(slug);
  return guide?.id;
}

export function getGuideTitle(guide: GuideMeta, lang: string): string {
  return (guide as any)[`title_${lang}`] || guide.title;
}

export function getGuideDescription(guide: GuideMeta, lang: string): string {
  return (guide as any)[`description_${lang}`] || guide.description;
}

export function getGuideCategory(guide: GuideMeta, lang: string): string {
  const localized = (guide as any)[`category_${lang}`] || guide.category;
  if (localized) return localized;

  const parts: string[] = [];
  if (guide.guideType) {
    const label = (categoryLabels.type as any)[guide.guideType]?.[lang] || (categoryLabels.type as any)[guide.guideType]?.en;
    if (label) parts.push(label);
  }
  if (guide.stage) {
    const label = (categoryLabels.stage as any)[guide.stage]?.[lang] || (categoryLabels.stage as any)[guide.stage]?.en;
    if (label) parts.push(label);
  }
  if (guide.difficulty) {
    const label = (categoryLabels.difficulty as any)[guide.difficulty]?.[lang] || (categoryLabels.difficulty as any)[guide.difficulty]?.en;
    if (label) parts.push(label);
  }

  return parts.join(" • ") || "Guide";
}
