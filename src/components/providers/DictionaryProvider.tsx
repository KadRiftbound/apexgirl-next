"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface DictionaryProviderProps {
  children: React.ReactNode;
  lang: string;
}

interface DictionaryContextType {
  dict: any;
  lang: string;
}

const DictionaryContext = createContext<DictionaryContextType | null>(null);

export function DictionaryProvider({ children, lang }: DictionaryProviderProps) {
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    async function loadDict() {
      const translations: Record<string, () => Promise<any>> = {
        fr: () => import("@/lib/translations/fr.json").then((m) => m.default),
        en: () => import("@/lib/translations/en.json").then((m) => m.default),
      };
      
      const loader = translations[lang] || translations.fr;
      const result = await loader();
      setDict(result);
    }
    
    loadDict();
  }, [lang]);

  if (!dict) {
    return null;
  }

  return (
    <DictionaryContext.Provider value={{ dict, lang }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
}
