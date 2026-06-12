import { useLanguage } from "../../../../../contexts/LanguageContext";
import { mapLanguageToAdminLocale } from "../../../../../lib/mapLanguageToAdminLocale";
import {
  type ArbiPayLandingCustomItem,
  type ArbiPayLandingCustomItemButton,
  type ArbiPayLandingCustomLocale,
  useGetArbiPayLandingData,
} from "../../../../../lib/useGetArbiPayLandingData";
import { getFooterSectionLocale } from "../FooterSection.locales";

const DEFAULT_DOCUMENT_HREF = "#";

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

const parseFooterItems = (items: ArbiPayLandingCustomItem[]) => {
  let mode: "before" | "info" | "docs" = "before";
  let informationTitle: string | null = null;
  let documentsTitle: string | null = null;
  const informationButtons: ArbiPayLandingCustomItemButton[] = [];
  const documentButtons: ArbiPayLandingCustomItemButton[] = [];
  let copyrightHtml: string | null = null;

  for (const item of items) {
    if (item.type === "title") {
      if (!informationTitle) {
        informationTitle = item.text.trim() ? item.text : null;
        mode = "info";
      } else {
        documentsTitle = item.text.trim() ? item.text : null;
        mode = "docs";
      }
    } else if (isButtonItem(item)) {
      if (mode === "info") {
        informationButtons.push(item);
      } else if (mode === "docs") {
        documentButtons.push(item);
      }
    } else if (item.type === "description") {
      copyrightHtml = item.html.trim() ? item.html : null;
    }
  }

  return {
    informationTitle,
    documentsTitle,
    informationButtons,
    documentButtons,
    copyrightHtml,
  };
};

const buildFallbackCopyrightHtml = (
  copyright: string,
  terms: string,
  conjunction: string,
  privacy: string,
): string =>
  `<p><span>${copyright}</span></p><p>/link/${terms}/link/${conjunction}/link/${privacy}/link/</p>`;

export const useFooterSectionContent = () => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetArbiPayLandingData();
  const fallback = getFooterSectionLocale(language);

  const footerSection = data?.page.sections.find(
    (section) => section.internal_name === "footer-section",
  );

  const rawLocale = !isLoading
    ? footerSection?.locales[mapLanguageToAdminLocale(language)]
    : undefined;
  const adminLocale = isCustomLocale(rawLocale) ? rawLocale : undefined;

  const parsed = adminLocale
    ? parseFooterItems(adminLocale.items)
    : {
        informationTitle: null,
        documentsTitle: null,
        informationButtons: [],
        documentButtons: [],
        copyrightHtml: null,
      };

  const informationTitle = pick(
    parsed.informationTitle ?? undefined,
    fallback.nav.information,
  );
  const documentsTitle = pick(
    parsed.documentsTitle ?? undefined,
    fallback.nav.documents,
  );

  const informationLinks = fallback.informationLinks.map((fallbackLink, index) => {
    const adminButton = parsed.informationButtons[index];

    return {
      id: fallbackLink.id,
      label: pick(adminButton?.label, fallbackLink.label),
      href: pick(adminButton?.href, `#${fallbackLink.sectionId}`),
    };
  });

  const documentLinks = fallback.documentLinks.map((fallbackLink, index) => {
    const adminButton = parsed.documentButtons[index];

    return {
      id: fallbackLink.id,
      label: pick(adminButton?.label, fallbackLink.label),
      href: pick(adminButton?.href, DEFAULT_DOCUMENT_HREF),
    };
  });

  const copyrightHtmlFromAdmin = parsed.copyrightHtml;
  const copyrightHtml =
    copyrightHtmlFromAdmin ??
    buildFallbackCopyrightHtml(
      fallback.copyright,
      fallback.terms,
      fallback.conjunction,
      fallback.privacy,
    );

  return {
    fallback,
    informationTitle,
    documentsTitle,
    informationLinks,
    documentLinks,
    copyrightHtmlFromAdmin,
    copyrightHtml,
  };
};
