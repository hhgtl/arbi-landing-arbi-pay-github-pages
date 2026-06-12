import { useLanguage } from "../../../../../contexts/LanguageContext";
import { mapLanguageToAdminLocale } from "../../../../../lib/mapLanguageToAdminLocale";
import {
  type ArbiPayLandingCardsBlockLocale,
  useGetArbiPayLandingData,
} from "../../../../../lib/useGetArbiPayLandingData";
import { getQuickOnboardingSectionLocale } from "../QuickOnboardingSection.locales";

const WHY_WE_ARE_TRUSTED_INTERNAL_NAME = "why-we-are-trusted-section";

const isCardsBlockLocale = (
  locale: unknown,
): locale is ArbiPayLandingCardsBlockLocale =>
  typeof locale === "object" &&
  locale !== null &&
  "cards" in locale &&
  Array.isArray((locale as ArbiPayLandingCardsBlockLocale).cards);

export const useQuickOnboardingSectionContent = () => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetArbiPayLandingData();
  const fallback = getQuickOnboardingSectionLocale(language);

  const section = data?.page.sections.find(
    (s) => s.internal_name === WHY_WE_ARE_TRUSTED_INTERNAL_NAME,
  );
  const rawLocale = !isLoading
    ? section?.locales[mapLanguageToAdminLocale(language)]
    : undefined;
  const adminLocale = isCardsBlockLocale(rawLocale) ? rawLocale : undefined;

  const titleFromAdmin = adminLocale?.title.trim()
    ? adminLocale.title
    : null;
  const descriptionHtmlFromAdmin = adminLocale?.descriptionHtml.trim()
    ? adminLocale.descriptionHtml
    : null;

  const items = fallback.items.map((fallbackItem, index) => {
    const adminCard = adminLocale?.cards[index];

    return {
      id: fallbackItem.id,
      title: adminCard?.title.trim() ? adminCard.title : null,
      descriptionHtml: adminCard?.description.trim()
        ? adminCard.description
        : null,
      fallbackTitle: fallbackItem.title,
      fallbackDescription: fallbackItem.description,
    };
  });

  return {
    fallback,
    titleFromAdmin,
    descriptionHtmlFromAdmin,
    items,
  };
};
