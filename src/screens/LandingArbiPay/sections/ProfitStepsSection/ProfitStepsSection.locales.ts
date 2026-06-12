import type { Language } from "../../../../contexts/LanguageContext";

const profitStepsSectionLocales = {
  RU: {
    heading: {
      before: "Четыре ",
      highlight1: "простых",
      middle: " шага к ",
      highlight2: "увеличению прибыли",
    },
    items: [
      {
        id: "step-1",
        number: "1",
        title: "Сканирование",
        description:
          "Клиент сканирует QR-код на вашем столе или в счёте",
      },
      {
        id: "step-2",
        number: "2",
        title: "СБП оплата",
        description: "Выбирает свой российский банк и оплачивает через СБП",
      },
      {
        id: "step-3",
        number: "3",
        title: "Уведомление",
        description: "Вы получаете мгновенное уведомление о платеже",
      },
      {
        id: "step-4",
        number: "4",
        title: "Поступление",
        description:
          "Деньги мгновенно поступают на счет в батах и доступны к выводу",
      },
    ],
    cta: "Оставить заявку",
  },
  ENG: {
    heading: {
      before: "Four ",
      highlight1: "simple",
      middle: " steps to ",
      highlight2: "increase profit",
    },
    items: [
      {
        id: "step-1",
        number: "1",
        title: "Scanning",
        description: "The customer scans the QR code on your table or bill",
      },
      {
        id: "step-2",
        number: "2",
        title: "SBP payment",
        description:
          "They choose their Russian bank and pay via the SBP system",
      },
      {
        id: "step-3",
        number: "3",
        title: "Notification",
        description: "You receive an instant payment notification",
      },
      {
        id: "step-4",
        number: "4",
        title: "Settlement",
        description:
          "Funds are instantly credited to your baht account and available for withdrawal",
      },
    ],
    cta: "Submit application",
  },
  TH: {
    heading: {
      before: "สี่ ",
      highlight1: "ขั้นตอนง่ายๆ",
      middle: " สู่ ",
      highlight2: "การเพิ่มกำไร",
    },
    items: [
      {
        id: "step-1",
        number: "1",
        title: "สแกน",
        description: "ลูกค้าสแกน QR code บนโต๊ะหรือในใบเสร็จของคุณ",
      },
      {
        id: "step-2",
        number: "2",
        title: "ชำระผ่าน SBP",
        description: "เลือกธนาคารรัสเซียและชำระผ่านระบบ SBP",
      },
      {
        id: "step-3",
        number: "3",
        title: "การแจ้งเตือน",
        description: "คุณได้รับการแจ้งเตือนการชำระเงินทันที",
      },
      {
        id: "step-4",
        number: "4",
        title: "การรับเงิน",
        description:
          "เงินเข้าบัญชีบาททันทีและพร้อมถอนได้",
      },
    ],
    cta: "ส่งใบสมัคร",
  },
} as const satisfies Record<
  Language,
  (typeof profitStepsSectionLocales)["RU"]
>;

export const getProfitStepsSectionLocale = (lang: Language) =>
  profitStepsSectionLocales[lang];
