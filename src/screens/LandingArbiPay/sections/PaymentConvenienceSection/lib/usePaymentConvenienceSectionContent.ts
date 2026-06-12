import paymentConvenienceCashLimitBadge from "../../../../../assets/icons/payment-convenience-cash-limit-badge.svg";
import paymentConvenienceConversionLossBadge from "../../../../../assets/icons/payment-convenience-conversion-loss-badge.svg";
import paymentConvenienceGraySchemesBadge from "../../../../../assets/icons/payment-convenience-gray-schemes-badge.svg";
import paymentConvenienceNoControlBadge from "../../../../../assets/icons/payment-convenience-no-control-badge.svg";
import paymentConvenienceCashLimit from "../../../../../assets/img/payment-convenience-cash-limit.png";
import paymentConvenienceConversionLoss from "../../../../../assets/img/payment-convenience-conversion-loss.png";
import paymentConvenienceGraySchemes from "../../../../../assets/img/payment-convenience-gray-schemes.png";
import paymentConvenienceNoControl from "../../../../../assets/img/payment-convenience-no-control.png";
import { useLanguage } from "../../../../../contexts/LanguageContext";
import { mapLanguageToAdminLocale } from "../../../../../lib/mapLanguageToAdminLocale";
import {
  type ArbiPayLandingCardsBlockLocale,
  useGetArbiPayLandingData,
} from "../../../../../lib/useGetArbiPayLandingData";
import { getPaymentConvenienceSectionLocale } from "../PaymentConvenienceSection.locales";

const cardMeta = [
  {
    illustration: paymentConvenienceCashLimit,
    badgeIcon: paymentConvenienceCashLimitBadge,
    highlighted: false,
  },
  {
    illustration: paymentConvenienceNoControl,
    badgeIcon: paymentConvenienceNoControlBadge,
    highlighted: false,
  },
  {
    illustration: paymentConvenienceConversionLoss,
    badgeIcon: paymentConvenienceConversionLossBadge,
    highlighted: false,
  },
  {
    illustration: paymentConvenienceGraySchemes,
    badgeIcon: paymentConvenienceGraySchemesBadge,
    highlighted: true,
  },
] as const;

const pick = (value: string | undefined, fallback: string): string =>
  value?.trim() ? value.trim() : fallback;

const isCardsBlockLocale = (
  locale: unknown,
): locale is ArbiPayLandingCardsBlockLocale =>
  typeof locale === "object" &&
  locale !== null &&
  "cards" in locale &&
  Array.isArray((locale as ArbiPayLandingCardsBlockLocale).cards);

export const usePaymentConvenienceSectionContent = () => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetArbiPayLandingData();
  const fallback = getPaymentConvenienceSectionLocale(language);

  const section = data?.page.sections.find(
    (s) => s.internal_name === "payment-convenience-section",
  );
  const rawLocale = !isLoading
    ? section?.locales[mapLanguageToAdminLocale(language)]
    : undefined;
  const adminLocale = isCardsBlockLocale(rawLocale) ? rawLocale : undefined;

  const titleFromAdmin = adminLocale?.title.trim()
    ? adminLocale.title
    : null;

  const cards = fallback.items.map((fallbackCard, index) => {
    const adminCard = adminLocale?.cards[index];
    const meta = cardMeta[index];

    return {
      id: fallbackCard.id,
      title: adminCard?.title.trim() ? adminCard.title : null,
      descriptionHtml: adminCard?.description.trim()
        ? adminCard.description
        : null,
      badgeLabel: pick(adminCard?.buttonLabel, fallbackCard.badgeLabel),
      illustration:
        adminCard?.images[0]?.url.trim() || meta.illustration,
      badgeIcon: adminCard?.images[1]?.url.trim() || meta.badgeIcon,
      highlighted: meta.highlighted,
      fallbackTitleParts: fallbackCard.titleParts,
      fallbackDescription: fallbackCard.description,
    };
  });

  return {
    fallback,
    titleFromAdmin,
    cards,
  };
};
