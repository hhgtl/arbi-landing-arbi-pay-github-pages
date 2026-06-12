import solutionCardSbpPayment from "../../../../../assets/icons/solution-card-sbp-payment.svg";
import solutionCardFastCrediting from "../../../../../assets/img/solution-card-fast-crediting.png";
import solutionCardPaymentControl from "../../../../../assets/img/solution-card-payment-control.png";
import solutionCardTransparentProcess from "../../../../../assets/img/solution-card-transparent-process.png";
import { useLanguage } from "../../../../../contexts/LanguageContext";
import { mapLanguageToAdminLocale } from "../../../../../lib/mapLanguageToAdminLocale";
import {
  type ArbiPayLandingCardsBlockLocale,
  type ArbiPayLandingCustomLocale,
  useGetArbiPayLandingData,
} from "../../../../../lib/useGetArbiPayLandingData";
import { getSolutionCardsSectionLocale } from "../SolutionCardsSection.locales";

const DEFAULT_CTA_HREF = "https://arbipay.online/onboarding/";
const SOLUTION_SECTION_CARDS_INTERNAL_NAME = "solution-section-сards";

const cardMeta = [
  {
    illustration: solutionCardSbpPayment,
    elevated: true,
  },
  {
    illustration: solutionCardPaymentControl,
    elevated: false,
  },
  {
    illustration: solutionCardFastCrediting,
    elevated: false,
  },
  {
    illustration: solutionCardTransparentProcess,
    elevated: false,
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

export const useSolutionCardsSectionContent = () => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetArbiPayLandingData();
  const fallback = getSolutionCardsSectionLocale(language);

  const mainSection = data?.page.sections.find(
    (section) => section.internal_name === "solution-section-main",
  );
  const cardsSection = data?.page.sections.find(
    (section) => section.internal_name === SOLUTION_SECTION_CARDS_INTERNAL_NAME,
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

  const descriptionHtmlFromAdmin =
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

  const cards = fallback.items.map((fallbackCard, index) => {
    const adminCard = cardsLocale?.cards[index];
    const meta = cardMeta[index];

    return {
      id: fallbackCard.id,
      title: adminCard?.title.trim() ? adminCard.title : null,
      descriptionHtml: adminCard?.description.trim()
        ? adminCard.description
        : null,
      badgeLabel: pick(adminCard?.buttonLabel, fallback.badge),
      illustration: adminCard?.images[0]?.url.trim() || meta.illustration,
      elevated: meta.elevated,
      fallbackTitleParts: {
        titleBefore: fallbackCard.titleBefore,
        titleHighlight: fallbackCard.titleHighlight,
        titleAfter: fallbackCard.titleAfter,
      },
      fallbackDescription: fallbackCard.description,
    };
  });

  return {
    fallback,
    titleFromAdmin,
    descriptionHtmlFromAdmin,
    cta,
    cards,
  };
};
