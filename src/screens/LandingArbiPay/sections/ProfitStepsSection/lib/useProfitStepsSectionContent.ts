import { useLanguage } from "../../../../../contexts/LanguageContext";
import { mapLanguageToAdminLocale } from "../../../../../lib/mapLanguageToAdminLocale";
import {
  type ArbiPayLandingCardsBlockLocale,
  type ArbiPayLandingCustomLocale,
  useGetArbiPayLandingData,
} from "../../../../../lib/useGetArbiPayLandingData";
import { getProfitStepsSectionLocale } from "../ProfitStepsSection.locales";

const DEFAULT_CTA_HREF = "https://arbipay.online/onboarding/";

const stepMeta = [
  {
    phoneImage:
      "https://arbipay.online/onboarding/site-library/6d0df6ef-389c-4cdb-be8d-909e7b21cc39.webp",
    badgePosition: "first" as const,
  },
  {
    phoneImage:
      "https://arbipay.online/onboarding/site-library/762fd14b-a8d1-42bf-9019-36a831af04c3.webp",
    badgePosition: "second" as const,
  },
  {
    phoneImage:
      "https://arbipay.online/onboarding/site-library/518583cb-bf84-48ac-8448-a56ba10a738e.webp",
    badgePosition: "default" as const,
  },
  {
    phoneImage:
      "https://arbipay.online/onboarding/site-library/cf27b090-2e93-4092-a1d6-c9b377553b39.webp",
    badgePosition: "default" as const,
  },
] as const;

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

export const useProfitStepsSectionContent = () => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetArbiPayLandingData();
  const fallback = getProfitStepsSectionLocale(language);

  const mainSection = data?.page.sections.find(
    (section) => section.internal_name === "profit-steps-section-main",
  );
  const cardsSection = data?.page.sections.find(
    (section) => section.internal_name === "profit-steps-section-cards",
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
  const buttonItem = mainLocale?.items.find((item) => item.type === "button");

  const titleFromAdmin =
    titleItem?.type === "title" && titleItem.text.trim()
      ? titleItem.text
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

  const steps = fallback.items.map((fallbackStep, index) => {
    const adminCard = cardsLocale?.cards[index];
    const meta = stepMeta[index];

    return {
      id: fallbackStep.id,
      number: fallbackStep.number,
      title: adminCard?.title.trim() ? adminCard.title : null,
      descriptionHtml: adminCard?.description.trim()
        ? adminCard.description
        : null,
      phoneImage: adminCard?.images[0]?.url.trim() || meta.phoneImage,
      badgePosition: meta.badgePosition,
      fallbackTitle: fallbackStep.title,
      fallbackDescription: fallbackStep.description,
    };
  });

  return {
    fallback,
    titleFromAdmin,
    cta,
    steps,
  };
};
