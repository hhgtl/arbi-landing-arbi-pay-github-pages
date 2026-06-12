import { useLanguage } from "../../../contexts/LanguageContext";
import { mapLanguageToAdminLocale } from "../../../lib/mapLanguageToAdminLocale";
import {
  type ArbiPayLandingCustomItemButton,
  type ArbiPayLandingCustomLocale,
  useGetArbiPayLandingData,
} from "../../../lib/useGetArbiPayLandingData";
import { getContactQuestionsModalLocale } from "../ContactQuestionsModal.locales";

const SUPPORT_MODAL_INTERNAL_NAME = "support-modal";

const pick = (value: string | undefined, fallback: string): string =>
  value?.trim() ? value.trim() : fallback;

const isCustomLocale = (locale: unknown): locale is ArbiPayLandingCustomLocale =>
  typeof locale === "object" &&
  locale !== null &&
  "items" in locale &&
  Array.isArray((locale as ArbiPayLandingCustomLocale).items);

const isButtonItem = (
  item: ArbiPayLandingCustomLocale["items"][number],
): item is ArbiPayLandingCustomItemButton => item.type === "button";

const stripHtml = (value: string): string =>
  value.replace(/<[^>]*>/g, "").trim();

export const useContactQuestionsModalContent = () => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetArbiPayLandingData();
  const fallback = getContactQuestionsModalLocale(language);

  const supportModalSection = data?.page.sections.find(
    (section) => section.internal_name === SUPPORT_MODAL_INTERNAL_NAME,
  );

  const rawLocale = !isLoading
    ? supportModalSection?.locales[mapLanguageToAdminLocale(language)]
    : undefined;
  const adminLocale = isCustomLocale(rawLocale) ? rawLocale : undefined;

  const titleItem = adminLocale?.items.find((item) => item.type === "title");
  const descriptionItem = adminLocale?.items.find(
    (item) => item.type === "description",
  );
  const labelItem = adminLocale?.items.find((item) => item.type === "label");
  const buttonItems =
    adminLocale?.items.filter(isButtonItem) ?? [];
  const telegramButton = buttonItems[0];
  const whatsappButton = buttonItems[1];

  const titleFromAdmin =
    titleItem?.type === "title" && titleItem.text.trim()
      ? titleItem.text
      : null;
  const descriptionFromAdmin =
    descriptionItem?.type === "description" && descriptionItem.html.trim()
      ? stripHtml(descriptionItem.html)
      : null;
  const badgeFromAdmin =
    labelItem?.type === "label" && labelItem.text.trim()
      ? labelItem.text
      : null;

  return {
    title: pick(titleFromAdmin ?? undefined, fallback.title),
    description: pick(descriptionFromAdmin ?? undefined, fallback.description),
    badge: pick(badgeFromAdmin ?? undefined, fallback.badge),
    telegramLabel: pick(telegramButton?.label, fallback.telegramLabel),
    telegramHref: pick(telegramButton?.href, fallback.telegramHref),
    whatsappLabel: pick(whatsappButton?.label, fallback.whatsappLabel),
    whatsappHref: pick(whatsappButton?.href, fallback.whatsappHref),
  };
};
