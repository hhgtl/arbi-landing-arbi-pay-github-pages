import { useLanguage } from "../../../../../contexts/LanguageContext";
import { mapLanguageToAdminLocale } from "../../../../../lib/mapLanguageToAdminLocale";
import {
  type ArbiPayLandingCardsBlockLocale,
  type ArbiPayLandingCustomLocale,
  useGetArbiPayLandingData,
} from "../../../../../lib/useGetArbiPayLandingData";
import { getFaqSectionLocale } from "../FaqSection.locales";

const DEFAULT_CTA_HREF = "https://arbipay.online/onboarding/";

const pick = (value: string | undefined, fallback: string): string =>
  value?.trim() ? value.trim() : fallback;

const isCustomLocale = (locale: unknown): locale is ArbiPayLandingCustomLocale =>
  typeof locale === "object" &&
  locale !== null &&
  "items" in locale &&
  Array.isArray((locale as ArbiPayLandingCustomLocale).items);

const isCardsBlockLocale = (
  locale: unknown,
): locale is ArbiPayLandingCardsBlockLocale =>
  typeof locale === "object" &&
  locale !== null &&
  "cards" in locale &&
  Array.isArray((locale as ArbiPayLandingCardsBlockLocale).cards);

export const useFaqSectionContent = () => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetArbiPayLandingData();
  const fallback = getFaqSectionLocale(language);

  const mainSection = data?.page.sections.find(
    (section) => section.internal_name === "quick-connection-section-main",
  );
  const cardsSection = data?.page.sections.find(
    (section) => section.internal_name === "quick-connection-section-cards",
  );

  const adminLocaleKey = mapLanguageToAdminLocale(language);

  const rawMainLocale = !isLoading
    ? mainSection?.locales[adminLocaleKey]
    : undefined;
  const mainLocale = isCustomLocale(rawMainLocale) ? rawMainLocale : undefined;

  const rawCardsLocale = !isLoading
    ? cardsSection?.locales[adminLocaleKey]
    : undefined;
  const cardsLocale = isCardsBlockLocale(rawCardsLocale)
    ? rawCardsLocale
    : undefined;

  const titleItem = mainLocale?.items.find((item) => item.type === "title");
  const descriptionItem = mainLocale?.items.find(
    (item) => item.type === "description",
  );
  const buttonItem = mainLocale?.items.find((item) => item.type === "button");

  const titleFromAdmin =
    titleItem?.type === "title" && titleItem.text.trim()
      ? titleItem.text
      : null;

  const sidebarHtmlFromAdmin =
    descriptionItem?.type === "description" && descriptionItem.html.trim()
      ? descriptionItem.html
      : null;

  const cta = {
    label: pick(
      buttonItem?.type === "button" ? buttonItem.label : undefined,
      fallback.cta,
    ),
    href: pick(
      buttonItem?.type === "button" ? buttonItem.href : undefined,
      DEFAULT_CTA_HREF,
    ),
    target:
      buttonItem?.type === "button" && buttonItem.target.trim()
        ? buttonItem.target
        : "_blank",
  };

  const steps = fallback.steps.map((fallbackStep, index) => {
    const adminCard = cardsLocale?.cards[index];

    return {
      id: fallbackStep.id,
      number: fallbackStep.number,
      title: adminCard?.title.trim()
        ? adminCard.title
        : fallbackStep.title,
      imageUrl: adminCard?.images[0]?.url.trim() || null,
      fallbackTitle: fallbackStep.title,
    };
  });

  return {
    fallback,
    titleFromAdmin,
    sidebarHtmlFromAdmin,
    cta,
    steps,
  };
};
