import idealCustomersFinance from "../../../../../assets/icons/ideal-customers-finance.svg";
import idealCustomersRealEstate from "../../../../../assets/icons/ideal-customers-real-estate.svg";
import idealCustomersRental from "../../../../../assets/icons/ideal-customers-rental.svg";
import idealCustomersRestaurants from "../../../../../assets/icons/ideal-customers-restaurants.svg";
import idealCustomersSpa from "../../../../../assets/icons/ideal-customers-spa.svg";
import idealCustomersTourism from "../../../../../assets/icons/ideal-customers-tourism.svg";
import { useLanguage } from "../../../../../contexts/LanguageContext";
import { mapLanguageToAdminLocale } from "../../../../../lib/mapLanguageToAdminLocale";
import {
  type ArbiPayLandingCardsBlockLocale,
  type ArbiPayLandingCustomLocale,
  useGetArbiPayLandingData,
} from "../../../../../lib/useGetArbiPayLandingData";
import { getIdealCustomersSectionLocale } from "../IdealCustomersSection.locales";

const DEFAULT_CTA_HREF = "https://arbipay.online/onboarding/";

const itemIconSrc = [
  idealCustomersRestaurants,
  idealCustomersSpa,
  idealCustomersTourism,
  idealCustomersRental,
  idealCustomersRealEstate,
  idealCustomersFinance,
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

export const useIdealCustomersSectionContent = () => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetArbiPayLandingData();
  const fallback = getIdealCustomersSectionLocale(language);

  const mainSection = data?.page.sections.find(
    (section) => section.internal_name === "who-will-benefit-most-main",
  );
  const cardsSection = data?.page.sections.find(
    (section) => section.internal_name === "who-will-benefit-most-cards",
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

  const items = fallback.items.map((fallbackItem, index) => {
    const adminCard = cardsLocale?.cards[index];
    const defaultIcon = itemIconSrc[index] ?? itemIconSrc[0];

    return {
      id: fallbackItem.id,
      title: adminCard?.title.trim() ? adminCard.title : null,
      descriptionHtml: adminCard?.description.trim()
        ? adminCard.description
        : null,
      iconSrc: adminCard?.images[0]?.url.trim() || defaultIcon,
      fallbackTitle: fallbackItem.title,
      fallbackDescription: fallbackItem.description,
    };
  });

  return {
    fallback,
    titleFromAdmin,
    cta,
    items,
  };
};
