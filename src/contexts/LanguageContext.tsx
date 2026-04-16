"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { fr, type Translations } from "@/locales/fr";
import { en } from "@/locales/en";

type Lang = "fr" | "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [lang, setLang] = useState<Lang>("fr");
  const t = lang === "fr" ? fr : en;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
