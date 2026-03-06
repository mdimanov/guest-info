"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export type Lang = "bg" | "en";

type LangContextType = {
  lang: Lang;
  setLang: (value: Lang) => void;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialLangParam = searchParams.get("lang");

  const initialLang: Lang = initialLangParam === "en" ? "en" : "bg";

  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (value: Lang) => {
    setLangState(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", value);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error("useLang must be used inside LangProvider");
  }

  return context;
}
