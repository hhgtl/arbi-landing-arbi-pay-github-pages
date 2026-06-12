import type { Language } from "../../../../contexts/LanguageContext";

const paymentConvenienceSectionLocales = {
  RU: {
    heading: {
      line1: "Где бизнес",
      line2Highlight: "теряет выручку?",
    },
    items: [
      {
        id: "cash-limit",
        titleParts: [
          { text: "Клиенты", blue: false },
          { text: "\n" },
          { text: "ограничены наличными", blue: true },
        ],
        description:
          "Сумма покупки зависит от того, сколько батов у клиента уже на руках",
        badgeLabel: "Наличные",
      },
      {
        id: "no-control",
        titleParts: [
          { text: "Хаос и ", blue: false },
          { text: "отсутствие контроля", blue: true },
        ],
        description:
          "Без единой системы оплаты бизнесу сложнее отслеживать платежи и держать все под контролем",
        badgeLabel: "Управление",
      },
      {
        id: "conversion-loss",
        titleParts: [
          { text: "Потеря клиентов", blue: true },
          { text: " на этапе обмена", blue: false },
        ],
        description:
          "Пока клиент ищет, где обменять деньги, часть продаж срывается",
        badgeLabel: "Конверсия",
      },
      {
        id: "gray-schemes",
        titleParts: [
          { text: "Риски", blue: true },
          { text: " серых схем", blue: false },
        ],
        description:
          "Принимая деньги на карту или пользуясь услугами сомнительных партнеров вы рискуете блокировкой счета по 115 ФЗ и подвергаете риску своих клиентов",
        badgeLabel: "Безопасность",
      },
    ],
  },
  ENG: {
    heading: {
      line1: "Where does business",
      line2Highlight: "lose revenue?",
    },
    items: [
      {
        id: "cash-limit",
        titleParts: [
          { text: "Customers are", blue: false },
          { text: "\n" },
          { text: "limited to cash", blue: true },
        ],
        description:
          "Purchase amounts depend on how much baht the customer already has on hand",
        badgeLabel: "Cash",
      },
      {
        id: "no-control",
        titleParts: [
          { text: "Chaos and ", blue: false },
          { text: "lack of control", blue: true },
        ],
        description:
          "Without a unified payment system, it's harder to track payments and keep everything under control",
        badgeLabel: "Management",
      },
      {
        id: "conversion-loss",
        titleParts: [
          { text: "Lost customers", blue: true },
          { text: " during exchange", blue: false },
        ],
        description:
          "While customers look for a place to exchange money, some sales fall through",
        badgeLabel: "Conversion",
      },
      {
        id: "gray-schemes",
        titleParts: [
          { text: "Risks of", blue: true },
          { text: " gray schemes", blue: false },
        ],
        description:
          "Accepting money to a card or using questionable partners puts your account at risk of blocking and endangers your customers",
        badgeLabel: "Security",
      },
    ],
  },
  TH: {
    heading: {
      line1: "ธุรกิจ",
      line2Highlight: "สูญเสียรายได้ตรงไหน?",
    },
    items: [
      {
        id: "cash-limit",
        titleParts: [
          { text: "ลูกค้า", blue: false },
          { text: "\n" },
          { text: "ถูกจำกัดด้วยเงินสด", blue: true },
        ],
        description:
          "ยอดซื้อขึ้นอยู่กับจำนวนบาทที่ลูกค้ามีอยู่ในมือ",
        badgeLabel: "เงินสด",
      },
      {
        id: "no-control",
        titleParts: [
          { text: "ความวุ่นวายและ ", blue: false },
          { text: "ขาดการควบคุม", blue: true },
        ],
        description:
          "หากไม่มีระบบชำระเงินรวม ธุรกิจจะติดตามการชำระเงินและควบคุมทุกอย่างได้ยากขึ้น",
        badgeLabel: "การจัดการ",
      },
      {
        id: "conversion-loss",
        titleParts: [
          { text: "สูญเสียลูกค้า", blue: true },
          { text: " ในขั้นตอนแลกเงิน", blue: false },
        ],
        description:
          "ขณะที่ลูกค้าหาที่แลกเงิน ยอดขายบางส่วนจะหลุดไป",
        badgeLabel: "อัตราแปลง",
      },
      {
        id: "gray-schemes",
        titleParts: [
          { text: "ความเสี่ยง", blue: true },
          { text: " จากแผนสีเทา", blue: false },
        ],
        description:
          "การรับเงินเข้าบัตรหรือใช้พาร์ทเนอร์ที่น่าสงสัย อาจทำให้บัญชีถูกระงับและลูกค้าของคุณเสี่ยง",
        badgeLabel: "ความปลอดภัย",
      },
    ],
  },
} as const satisfies Record<
  Language,
  (typeof paymentConvenienceSectionLocales)["RU"]
>;

export const getPaymentConvenienceSectionLocale = (lang: Language) =>
  paymentConvenienceSectionLocales[lang];
