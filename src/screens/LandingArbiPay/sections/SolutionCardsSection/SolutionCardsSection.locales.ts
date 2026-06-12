import type { Language } from "../../../../contexts/LanguageContext";

const solutionCardsSectionLocales = {
  RU: {
    heading: {
      line1Before: "Как ",
      line1Highlight: "мы помогаем",
      line2: "сделать прием",
      line3Highlight: "оплаты удобнее",
    },
    description:
      "Клиент оплачивает покупку через СБП привычным способом, а вы получаете быстрые выплаты, удобный процесс расчетов и возможность увеличивать средний чек",
    cta: "Оставить заявку",
    badge: "Решение",
    items: [
      {
        id: "sbp-payment",
        titleBefore: "Оплата ",
        titleHighlight: "через СБП",
        titleAfter: "",
        description:
          "Клиент оплачивает покупку через приложение своего банка по СБП",
      },
      {
        id: "payment-control",
        titleBefore: "",
        titleHighlight: "Контроль платежей",
        titleAfter: " в одном месте",
        description: "Все операции и статусы платежей доступны в личном кабинете",
      },
      {
        id: "fast-crediting",
        titleBefore: "",
        titleHighlight: "Быстрое зачисление",
        titleAfter: " средств",
        description: "После оплаты вы получаете средства в локальной валюте",
      },
      {
        id: "transparent-process",
        titleBefore: "",
        titleHighlight: "Прозрачный",
        titleAfter: " платежный процесс",
        description:
          "Бизнес работает через понятную модель без ручных переводов и лишней операционной нагрузки",
      },
    ],
  },
  ENG: {
    heading: {
      line1Before: "How we ",
      line1Highlight: "help make",
      line2: "payment acceptance",
      line3Highlight: "more convenient",
    },
    description:
      "Customers pay via SBP in a familiar way, while you get fast payouts, a smooth settlement process, and the ability to increase average check",
    cta: "Submit application",
    badge: "Solution",
    items: [
      {
        id: "sbp-payment",
        titleBefore: "Payment ",
        titleHighlight: "via SBP",
        titleAfter: "",
        description:
          "The customer pays for the purchase through their bank app via SBP",
      },
      {
        id: "payment-control",
        titleBefore: "",
        titleHighlight: "Payment control",
        titleAfter: " in one place",
        description:
          "All transactions and payment statuses are available in your personal account",
      },
      {
        id: "fast-crediting",
        titleBefore: "",
        titleHighlight: "Fast crediting",
        titleAfter: " of funds",
        description: "After payment, you receive funds in local currency",
      },
      {
        id: "transparent-process",
        titleBefore: "",
        titleHighlight: "Transparent",
        titleAfter: " payment process",
        description:
          "Your business operates through a clear model without manual transfers or extra operational burden",
      },
    ],
  },
  TH: {
    heading: {
      line1Before: "เราช่วย",
      line1Highlight: "ทำให้",
      line2: "การรับชำระเงิน",
      line3Highlight: "สะดวกขึ้นอย่างไร",
    },
    description:
      "ลูกค้าชำระผ่าน SBP อย่างคุ้นเคย ขณะที่คุณได้รับเงินเร็ว กระบวนการชำระที่ราบรื่น และโอกาสเพิ่มยอดเฉลี่ยต่อบิล",
    cta: "ส่งใบสมัคร",
    badge: "โซลูชัน",
    items: [
      {
        id: "sbp-payment",
        titleBefore: "ชำระ ",
        titleHighlight: "ผ่าน SBP",
        titleAfter: "",
        description: "ลูกค้าชำระการซื้อผ่านแอปธนาคารด้วย SBP",
      },
      {
        id: "payment-control",
        titleBefore: "",
        titleHighlight: "ควบคุมการชำระเงิน",
        titleAfter: " ในที่เดียว",
        description:
          "ธุรกรรมและสถานะการชำระเงินทั้งหมดอยู่ในบัญชีส่วนตัวของคุณ",
      },
      {
        id: "fast-crediting",
        titleBefore: "",
        titleHighlight: "เครดิตเงินเร็ว",
        titleAfter: "",
        description: "หลังชำระเงิน คุณจะได้รับเงินในสกุลเงินท้องถิ่น",
      },
      {
        id: "transparent-process",
        titleBefore: "",
        titleHighlight: "กระบวนการชำระเงิน",
        titleAfter: " ที่โปร่งใส",
        description:
          "ธุรกิจทำงานผ่านโมเดลที่ชัดเจน โดยไม่ต้องโอนเงินด้วยมือหรือภาระงานเพิ่ม",
      },
    ],
  },
} as const satisfies Record<
  Language,
  (typeof solutionCardsSectionLocales)["RU"]
>;

export const getSolutionCardsSectionLocale = (lang: Language) =>
  solutionCardsSectionLocales[lang];
