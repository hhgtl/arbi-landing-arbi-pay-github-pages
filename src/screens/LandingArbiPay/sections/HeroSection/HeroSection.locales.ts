import type { Language } from "../../../../contexts/LanguageContext";

const heroSectionLocales = {
  RU: {
    nav: [
      { id: "how-it-works", sectionId: "profit-steps", label: "Как это работает" },
      { id: "for-whom", sectionId: "ideal-customers", label: "Для кого" },
      { id: "advantages", sectionId: "solution-cards", label: "Преимущества" },
      { id: "reviews", sectionId: "reviews", label: "Отзывы" },
      { id: "faq", sectionId: "new-faq", label: "FAQ" },
    ],
    cta: "Оставить заявку",
    aria: {
      logo: "ArbiPay",
      logoAlt: "Logo",
      mainNav: "Основная навигация",
    },
  },
  ENG: {
    nav: [
      { id: "how-it-works", sectionId: "profit-steps", label: "How it works" },
      { id: "for-whom", sectionId: "ideal-customers", label: "Who it's for" },
      { id: "advantages", sectionId: "solution-cards", label: "Benefits" },
      { id: "reviews", sectionId: "reviews", label: "Reviews" },
      { id: "faq", sectionId: "new-faq", label: "FAQ" },
    ],
    cta: "Submit application",
    aria: {
      logo: "ArbiPay",
      logoAlt: "Logo",
      mainNav: "Main navigation",
    },
  },
  TH: {
    nav: [
      { id: "how-it-works", sectionId: "profit-steps", label: "วิธีการทำงาน" },
      { id: "for-whom", sectionId: "ideal-customers", label: "เหมาะกับใคร" },
      { id: "advantages", sectionId: "solution-cards", label: "ข้อดี" },
      { id: "reviews", sectionId: "reviews", label: "รีวิว" },
      { id: "faq", sectionId: "new-faq", label: "FAQ" },
    ],
    cta: "ส่งใบสมัคร",
    aria: {
      logo: "ArbiPay",
      logoAlt: "โลโก้",
      mainNav: "การนำทางหลัก",
    },
  },
} as const satisfies Record<Language, (typeof heroSectionLocales)["RU"]>;

export const getHeroSectionLocale = (lang: Language) => heroSectionLocales[lang];
