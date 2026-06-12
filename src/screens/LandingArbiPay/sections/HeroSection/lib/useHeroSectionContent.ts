import { useLanguage } from "../../../../../contexts/LanguageContext";
import { mapLanguageToAdminLocale } from "../../../../../lib/mapLanguageToAdminLocale";
import {
  type ArbiPayLandingCustomItem,
  type ArbiPayLandingCustomItemButton,
  type ArbiPayLandingCustomLocale,
  useGetArbiPayLandingData,
} from "../../../../../lib/useGetArbiPayLandingData";
import { getHeroSectionLocale } from "../HeroSection.locales";

const DEFAULT_CTA_HREF = "https://arbipay.online/onboarding/";

const pick = (value: string | undefined, fallback: string): string =>
  value?.trim() ? value.trim() : fallback;

const isCustomLocale = (locale: unknown): locale is ArbiPayLandingCustomLocale =>
  typeof locale === "object" &&
  locale !== null &&
  "items" in locale &&
  Array.isArray((locale as ArbiPayLandingCustomLocale).items);

const isButtonItem = (
  item: ArbiPayLandingCustomItem,
): item is ArbiPayLandingCustomItemButton => item.type === "button";

export const useHeroSectionContent = () => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetArbiPayLandingData();
  const fallback = getHeroSectionLocale(language);

  const headerSection = data?.page.sections.find(
    (section) => section.internal_name === "header-section",
  );

  const rawLocale = !isLoading
    ? headerSection?.locales[mapLanguageToAdminLocale(language)]
    : undefined;
  const adminLocale = isCustomLocale(rawLocale) ? rawLocale : undefined;

  const buttonItems = adminLocale?.items.filter(isButtonItem) ?? [];
  const navButtons = buttonItems.slice(0, -1);
  const ctaButton = buttonItems.at(-1);

  const navLinks = fallback.nav.map((fallbackItem, index) => {
    const adminButton = navButtons[index];

    return {
      id: fallbackItem.id,
      label: pick(adminButton?.label, fallbackItem.label),
      href: pick(adminButton?.href, `#${fallbackItem.sectionId}`),
      target: adminButton?.target?.trim() || "_self",
    };
  });

  const cta = {
    label: pick(ctaButton?.label, fallback.cta),
    href: pick(ctaButton?.href, DEFAULT_CTA_HREF),
    target: ctaButton?.target?.trim() || "_blank",
  };

  return {
    fallback,
    navLinks,
    cta,
  };
};
