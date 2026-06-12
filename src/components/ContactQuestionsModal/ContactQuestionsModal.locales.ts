import type { Language } from "../../contexts/LanguageContext";

const DEFAULT_TELEGRAM_HREF = "https://t.me/ArbiFinancialBot";
const DEFAULT_WHATSAPP_HREF = "https://wa.me/66622716997";

const contactQuestionsModalLocales = {
  RU: {
    title: "Остались вопросы?",
    description:
      "Выберите удобный способ связи - менеджер ответит на вопросы и поможет с подключением",
    badge: "Сканируйте QR-код с помощью телефона",
    telegramLabel: "Telegram",
    telegramHref: DEFAULT_TELEGRAM_HREF,
    whatsappLabel: "Whatsapp",
    whatsappHref: DEFAULT_WHATSAPP_HREF,
  },
  ENG: {
    title: "Any questions left?",
    description:
      "Choose a convenient way to get in touch – a manager will answer your questions and assist with the connection",
    badge: "Scan the QR code with your phone",
    telegramLabel: "Telegram",
    telegramHref: DEFAULT_TELEGRAM_HREF,
    whatsappLabel: "Whatsapp",
    whatsappHref: DEFAULT_WHATSAPP_HREF,
  },
  TH: {
    title: "ยังมีคำถามไหม?",
    description:
      "เลือกวิธีการติดต่อที่สะดวก – ผู้จัดการจะตอบคำถามและช่วยเหลือในการเชื่อมต่อ",
    badge: "สแกนรหัส QR ด้วยโทรศัพท์ของคุณ",
    telegramLabel: "Telegram",
    telegramHref: DEFAULT_TELEGRAM_HREF,
    whatsappLabel: "วอทส์แอป",
    whatsappHref: DEFAULT_WHATSAPP_HREF,
  },
} as const satisfies Record<Language, (typeof contactQuestionsModalLocales)["RU"]>;

export const getContactQuestionsModalLocale = (lang: Language) =>
  contactQuestionsModalLocales[lang];
