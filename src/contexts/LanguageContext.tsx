import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export const LANGUAGES = ["RU", "ENG", "TH"] as const;
export type Language = (typeof LANGUAGES)[number];

const LANGUAGE_STORAGE_KEY = "arbi-pay-language";

const getStoredLanguage = (): Language | null => {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && (LANGUAGES as readonly string[]).includes(stored)) {
      return stored as Language;
    }
  } catch {
    // ignore: private mode / storage unavailable
  }
  return null;
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [language, setLanguageState] = useState<Language>(
    () => getStoredLanguage() ?? "RU",
  );

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // ignore: private mode / quota exceeded
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
