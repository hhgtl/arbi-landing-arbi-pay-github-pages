import { useLanguage } from "../../../../../contexts/LanguageContext";
import { mapLanguageToAdminLocale } from "../../../../../lib/mapLanguageToAdminLocale";
import {
  type ArbiPayLandingLocale,
  useGetArbiPayLandingData,
} from "../../../../../lib/useGetArbiPayLandingData";
import { getBusinessChallengesSectionLocale } from "../BusinessChallengesSection.locales";

const DEFAULT_PRIMARY_HREF = "https://arbipay.online/onboarding/";
const DEFAULT_SECONDARY_HREF = "#";

const pick = (value: string | undefined, fallback: string): string =>
  value?.trim() ? value.trim() : fallback;

const isHeroLocale = (locale: unknown): locale is ArbiPayLandingLocale =>
  typeof locale === "object" &&
  locale !== null &&
  "headline" in locale &&
  typeof (locale as ArbiPayLandingLocale).headline === "string";

export const useBusinessChallengesSectionContent = () => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetArbiPayLandingData();
  const fallback = getBusinessChallengesSectionLocale(language);

  const heroSection = data?.page.sections.find(
    (section) => section.section_type === "hero",
  );
  const rawLocale = !isLoading
    ? heroSection?.locales[mapLanguageToAdminLocale(language)]
    : undefined;
  const adminLocale = isHeroLocale(rawLocale) ? rawLocale : undefined;

  const headlineFromAdmin = adminLocale?.headline.trim()
    ? adminLocale.headline
    : null;
  const descriptionHtmlFromAdmin = adminLocale?.descriptionHtml.trim()
    ? adminLocale.descriptionHtml
    : null;

  const primaryCta = {
    label: pick(adminLocale?.primaryButton?.label, fallback.cta),
    href: pick(adminLocale?.primaryButton?.href, DEFAULT_PRIMARY_HREF),
  };
  const secondaryCta = {
    label: pick(adminLocale?.secondaryButton?.label, fallback.secondaryCta),
    href: pick(adminLocale?.secondaryButton?.href, DEFAULT_SECONDARY_HREF),
  };

  const regionCountries = fallback.countries.slice(0, 5);
  const russiaCountry = fallback.countries[5];

  return {
    fallback,
    headlineFromAdmin,
    descriptionHtmlFromAdmin,
    primaryCta,
    secondaryCta,
    regionCountries,
    russiaCountry,
  };
};
