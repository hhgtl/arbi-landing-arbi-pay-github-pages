import type { Language } from "../../../../contexts/LanguageContext";

const ruAnswerHtml =
  "<p>Обмен происходит моментально: клиент оплачивает счет в рублях официально через сервис СБП и деньги начисляются на ваш баланс в батах в личном кабинете. Мы платежное решение, а не традиционный обменный пункт.</p>";

const engAnswerHtml =
  "<p>The exchange happens instantly: the customer pays the bill in rubles officially via the SBP service, and funds are credited to your baht balance in your personal account. We are a payment solution, not a traditional exchange office.</p>";

const thAnswerHtml =
  "<p>การแลกเปลี่ยนเกิดขึ้นทันที: ลูกค้าชำระบิลเป็นรูเบิลอย่างเป็นทางการผ่านบริการ SBP และเงินจะถูกเครดิตเข้ายอดบาทในบัญชีส่วนตัวของคุณ เราเป็นโซลูชันการชำระเงิน ไม่ใช่ร้านแลกเงินแบบดั้งเดิม</p>";

const newFaqSectionLocales = {
  RU: {
    heading: "FAQ",
    items: [
      {
        id: "faq-1",
        question: "Как долго занимает процесс обмена обычно?",
        answerHtml: ruAnswerHtml,
      },
      {
        id: "faq-2",
        question: "Есть ли какие-либо комиссии или скрытые платежи при обмене?",
        answerHtml: ruAnswerHtml,
      },
      {
        id: "faq-3",
        question: "Как обеспечивается безопасность во время операций обмена?",
        answerHtml: ruAnswerHtml,
      },
      {
        id: "faq-4",
        question: "Как быстро реагируете на заявки по техподдержке?",
        answerHtml: ruAnswerHtml,
      },
      {
        id: "faq-5",
        question:
          "Какие способы связи с вами доступны для получения дополнительной информации?",
        answerHtml: ruAnswerHtml,
      },
    ],
  },
  ENG: {
    heading: "FAQ",
    items: [
      {
        id: "faq-1",
        question: "How long does the exchange process usually take?",
        answerHtml: engAnswerHtml,
      },
      {
        id: "faq-2",
        question: "Are there any fees or hidden charges during the exchange?",
        answerHtml: engAnswerHtml,
      },
      {
        id: "faq-3",
        question: "How is security ensured during exchange operations?",
        answerHtml: engAnswerHtml,
      },
      {
        id: "faq-4",
        question: "How quickly do you respond to support requests?",
        answerHtml: engAnswerHtml,
      },
      {
        id: "faq-5",
        question:
          "What contact methods are available for additional information?",
        answerHtml: engAnswerHtml,
      },
    ],
  },
  TH: {
    heading: "FAQ",
    items: [
      {
        id: "faq-1",
        question: "กระบวนการแลกเปลี่ยนใช้เวลานานเท่าใดโดยทั่วไป?",
        answerHtml: thAnswerHtml,
      },
      {
        id: "faq-2",
        question: "มีค่าธรรมเนียมหรือค่าใช้จ่ายแอบแฝงระหว่างการแลกเปลี่ยนหรือไม่?",
        answerHtml: thAnswerHtml,
      },
      {
        id: "faq-3",
        question: "ความปลอดภัยระหว่างการแลกเปลี่ยนได้รับการรับประกันอย่างไร?",
        answerHtml: thAnswerHtml,
      },
      {
        id: "faq-4",
        question: "คุณตอบกลับคำขอฝ่ายสนับสนุนเร็วแค่ไหน?",
        answerHtml: thAnswerHtml,
      },
      {
        id: "faq-5",
        question: "มีช่องทางติดต่อใดบ้างสำหรับข้อมูลเพิ่มเติม?",
        answerHtml: thAnswerHtml,
      },
    ],
  },
} as const satisfies Record<Language, (typeof newFaqSectionLocales)["RU"]>;

export const getNewFaqSectionLocale = (lang: Language) =>
  newFaqSectionLocales[lang];
