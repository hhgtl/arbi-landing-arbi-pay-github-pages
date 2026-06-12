import type { Language } from "../contexts/LanguageContext";
import type { ArbiPayLandingLocaleKey } from "./useGetArbiPayLandingData";

const languageToAdminLocale = {
  RU: "ru",
  ENG: "en",
  TH: "th",
} as const satisfies Record<Language, ArbiPayLandingLocaleKey>;

export const mapLanguageToAdminLocale = (
  lang: Language,
): ArbiPayLandingLocaleKey => languageToAdminLocale[lang];
