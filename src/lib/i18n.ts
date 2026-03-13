import "server-only";

const dictionaries: Record<string, () => Promise<any>> = {
  fr: () => import("./translations/fr.json").then((m) => m.default),
  en: () => import("./translations/en.json").then((m) => m.default),
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale]?.() ?? dictionaries.fr();
};

export type Dictionary = any;
