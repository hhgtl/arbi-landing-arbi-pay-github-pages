import type { Language } from "../../../../contexts/LanguageContext";

const acquiringIllustrationSectionLocales = {
  RU: {
    heading: {
      before: "Почему нам ",
      highlight: "доверяют",
    },
    items: [
      {
        id: "faq-1",
        question: "Как долго занимает процесс обмена обычно?",
      },
      {
        id: "faq-2",
        question: "Есть ли какие-либо комиссии или скрытые платежи при обмене?",
      },
      {
        id: "faq-3",
        question: "Как обеспечивается безопасность во время операций обмена?",
      },
      {
        id: "faq-4",
        question: "Как быстро реагируете на заявки по техподдержке?",
      },
      {
        id: "faq-5",
        question:
          "Какие способы связи с вами доступны для получения дополнительной информации?",
      },
    ],
    cta: "Оставить заявку",
  },
  ENG: {
    heading: {
      before: "Why they ",
      highlight: "trust us",
    },
    items: [
      {
        id: "faq-1",
        question: "How long does the exchange process usually take?",
      },
      {
        id: "faq-2",
        question: "Are there any fees or hidden charges during the exchange?",
      },
      {
        id: "faq-3",
        question: "How is security ensured during exchange operations?",
      },
      {
        id: "faq-4",
        question: "How quickly do you respond to support requests?",
      },
      {
        id: "faq-5",
        question:
          "What contact methods are available for additional information?",
      },
    ],
    cta: "Submit application",
  },
  TH: {
    heading: {
      before: "ทำไมจึง",
      highlight: "ไว้วางใจเรา",
    },
    items: [
      {
        id: "faq-1",
        question: "กระบวนการแลกเปลี่ยนใช้เวลานานเท่าใดโดยทั่วไป?",
      },
      {
        id: "faq-2",
        question: "มีค่าธรรมเนียมหรือค่าใช้จ่ายแอบแฝงระหว่างการแลกเปลี่ยนหรือไม่?",
      },
      {
        id: "faq-3",
        question: "ความปลอดภัยระหว่างการแลกเปลี่ยนได้รับการรับประกันอย่างไร?",
      },
      {
        id: "faq-4",
        question: "คุณตอบกลับคำขอฝ่ายสนับสนุนเร็วแค่ไหน?",
      },
      {
        id: "faq-5",
        question: "มีช่องทางติดต่อใดบ้างสำหรับข้อมูลเพิ่มเติม?",
      },
    ],
    cta: "ส่งใบสมัคร",
  },
} as const satisfies Record<
  Language,
  (typeof acquiringIllustrationSectionLocales)["RU"]
>;

export const getAcquiringIllustrationSectionLocale = (lang: Language) =>
  acquiringIllustrationSectionLocales[lang];
