import "server-only";

const dictionaries: Record<string, () => Promise<any>> = {
  fr: () => import("./translations/fr.json").then((m) => m.default),
  en: () => import("./translations/en.json").then((m) => m.default),
  it: () => import("./translations/it.json").then((m) => m.default),
  es: () => import("./translations/es.json").then((m) => m.default),
  pt: () => import("./translations/pt.json").then((m) => m.default),
  pl: () => import("./translations/pl.json").then((m) => m.default),
  id: () => import("./translations/id.json").then((m) => m.default),
  ru: () => import("./translations/ru.json").then((m) => m.default),
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};

export type Dictionary = any;
