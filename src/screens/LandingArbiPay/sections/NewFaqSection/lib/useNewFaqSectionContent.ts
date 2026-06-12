import { useLanguage } from "../../../../../contexts/LanguageContext";
import { mapLanguageToAdminLocale } from "../../../../../lib/mapLanguageToAdminLocale";
import {
  type ArbiPayLandingCardsBlockLocale,
  useGetArbiPayLandingData,
} from "../../../../../lib/useGetArbiPayLandingData";
import { getNewFaqSectionLocale } from "../NewFaqSection.locales";

const isCardsBlockLocale = (
  locale: unknown,
): locale is ArbiPayLandingCardsBlockLocale =>
  typeof locale === "object" &&
  locale !== null &&
  "cards" in locale &&
  Array.isArray((locale as ArbiPayLandingCardsBlockLocale).cards);

export const useNewFaqSectionContent = () => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetArbiPayLandingData();
  const fallback = getNewFaqSectionLocale(language);

  const section = data?.page.sections.find(
    (s) => s.internal_name === "faq-section",
  );
  const rawLocale = !isLoading
    ? section?.locales[mapLanguageToAdminLocale(language)]
    : undefined;
  const adminLocale = isCardsBlockLocale(rawLocale) ? rawLocale : undefined;

  const headingFromAdmin = adminLocale?.title.trim()
    ? adminLocale.title
    : null;

  const items = fallback.items.map((fallbackItem, index) => {
    const adminCard = adminLocale?.cards[index];

    return {
      id: fallbackItem.id,
      question: adminCard?.title.trim()
        ? adminCard.title
        : fallbackItem.question,
      answerHtml: adminCard?.description.trim()
        ? adminCard.description
        : fallbackItem.answerHtml,
    };
  });

  return {
    fallback,
    headingFromAdmin,
    items,
  };
};
