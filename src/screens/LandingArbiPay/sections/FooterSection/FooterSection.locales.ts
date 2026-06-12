import type { Language } from "../../../../contexts/LanguageContext";

const footerSectionLocales = {
  RU: {
    copyright: "© 2026 ARBI Pay. Все права защищены.",
    terms: "Условия использования",
    privacy: "Политика конфиденциальности.",
    conjunction: " и ",
    nav: {
      information: "Информация",
      documents: "Документы",
      social: "Социальные сети",
      ariaLabel: "Навигация в подвале",
    },
    informationLinks: [
      { id: "how-it-works", sectionId: "profit-steps", label: "Как это работает" },
      { id: "for-whom", sectionId: "ideal-customers", label: "Для кого" },
      { id: "advantages", sectionId: "solution-cards", label: "Преимущества" },
      { id: "reviews", sectionId: "reviews", label: "Отзывы" },
      { id: "faq", sectionId: "new-faq", label: "FAQ" },
    ],
    documentLinks: [
      { id: "terms", label: "Условия использования" },
      { id: "privacy", label: "Политика конфиденциальности" },
    ],
    aria: {
      logoAlt: "Logo",
      socialAlt: "Социальные сети",
    },
  },
  ENG: {
    copyright: "© 2026 ARBI Pay. All rights reserved.",
    terms: "Terms of use",
    privacy: "Privacy policy.",
    conjunction: " and ",
    nav: {
      information: "Information",
      documents: "Documents",
      social: "Social media",
      ariaLabel: "Footer navigation",
    },
    informationLinks: [
      { id: "how-it-works", sectionId: "profit-steps", label: "How it works" },
      { id: "for-whom", sectionId: "ideal-customers", label: "Who it's for" },
      { id: "advantages", sectionId: "solution-cards", label: "Benefits" },
      { id: "reviews", sectionId: "reviews", label: "Reviews" },
      { id: "faq", sectionId: "new-faq", label: "FAQ" },
    ],
    documentLinks: [
      { id: "terms", label: "Terms of use" },
      { id: "privacy", label: "Privacy policy" },
    ],
    aria: {
      logoAlt: "Logo",
      socialAlt: "Social media",
    },
  },
  TH: {
    copyright: "© 2026 ARBI Pay สงวนลิขสิทธิ์",
    terms: "ข้อกำหนดการใช้งาน",
    privacy: "นโยบายความเป็นส่วนตัว",
    conjunction: " และ ",
    nav: {
      information: "ข้อมูล",
      documents: "เอกสาร",
      social: "โซเชียลมีเดีย",
      ariaLabel: "การนำทางส่วนท้าย",
    },
    informationLinks: [
      { id: "how-it-works", sectionId: "profit-steps", label: "วิธีการทำงาน" },
      { id: "for-whom", sectionId: "ideal-customers", label: "เหมาะกับใคร" },
      { id: "advantages", sectionId: "solution-cards", label: "ข้อดี" },
      { id: "reviews", sectionId: "reviews", label: "รีวิว" },
      { id: "faq", sectionId: "new-faq", label: "FAQ" },
    ],
    documentLinks: [
      { id: "terms", label: "ข้อกำหนดการใช้งาน" },
      { id: "privacy", label: "นโยบายความเป็นส่วนตัว" },
    ],
    aria: {
      logoAlt: "โลโก้",
      socialAlt: "โซเชียลมีเดีย",
    },
  },
} as const satisfies Record<Language, (typeof footerSectionLocales)["RU"]>;

export const getFooterSectionLocale = (lang: Language) =>
  footerSectionLocales[lang];
