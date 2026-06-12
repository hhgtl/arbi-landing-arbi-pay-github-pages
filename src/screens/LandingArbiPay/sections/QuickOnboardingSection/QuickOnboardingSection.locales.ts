import type { Language } from "../../../../contexts/LanguageContext";

const quickOnboardingSectionLocales = {
  RU: {
    heading: {
      before: "Почему нам ",
      highlight: "доверяют",
    },
    introHeading: {
      brand: "ARBI Pay",
      after: " — это команда экспертов в платежах и Юго-Восточной Азии",
    },
    introDescription:
      "ARBI Pay - команда экспертов\nв сфере платежей, Юго-Восточной Азии.\nПоддерживаем рост вашего бизнеса\nи сопровождаем вас на каждом этапе",
    items: [
      {
        id: "market",
        title: "Понимаем рынок Юго-Восточной Азии",
        description:
          "Знаем, как работает бизнес в Юго-Восточной Азии, в особенности с русскими туристами",
      },
      {
        id: "onboarding",
        title: "Сопровождаем подключение",
        description:
          "Помогаем пройти путь от заявки до обучения персонала и остаемся на связи после подключения",
      },
      {
        id: "automation",
        title: "Автоматизируем платежи",
        description:
          "Работая с нами, вы получаете полноценную цифровую структуру, а также адаптацию под задачи конкретно вашего бизнеса",
      },
      {
        id: "support",
        title: "Работаем 24/7",
        description:
          "Наш сервис и поддержка работают без выходных и помогают принимать оплаты по всему миру 24/7",
      },
    ],
  },
  ENG: {
    heading: {
      before: "Why they ",
      highlight: "trust us",
    },
    introHeading: {
      brand: "ARBI Pay",
      after: " is a team of experts in payments and Southeast Asia",
    },
    introDescription:
      "ARBI Pay is a team of experts\nin payments and Southeast Asia.\nWe support your business growth\nand guide you at every step",
    items: [
      {
        id: "market",
        title: "We understand the Southeast Asian market",
        description:
          "We know how business works in Southeast Asia, especially with Russian tourists",
      },
      {
        id: "onboarding",
        title: "We guide onboarding",
        description:
          "We help you go from application to staff training and stay in touch after launch",
      },
      {
        id: "automation",
        title: "We automate payments",
        description:
          "Working with us, you get a full digital structure plus customization for your specific business needs",
      },
      {
        id: "support",
        title: "We work 24/7",
        description:
          "Our service and support run without days off and help you accept payments worldwide 24/7",
      },
    ],
  },
  TH: {
    heading: {
      before: "ทำไมจึง",
      highlight: "ไว้วางใจเรา",
    },
    introHeading: {
      brand: "ARBI Pay",
      after: " คือทีมผู้เชี่ยวชาญด้านการชำระเงินและเอเชียตะวันออกเฉียงใต้",
    },
    introDescription:
      "ARBI Pay คือทีมผู้เชี่ยวชาญ\nด้านการชำระเงินและเอเชียตะวันออกเฉียงใต้\nเราสนับสนุนการเติบโตของธุรกิจคุณ\nและดูแลคุณในทุกขั้นตอน",
    items: [
      {
        id: "market",
        title: "เราเข้าใจตลาดเอเชียตะวันออกเฉียงใต้",
        description:
          "เรารู้ว่าธุรกิจทำงานอย่างไรในเอเชียตะวันออกเฉียงใต้ โดยเฉพาะกับนักท่องเที่ยวรัสเซีย",
      },
      {
        id: "onboarding",
        title: "เราดูแลการเชื่อมต่อ",
        description:
          "ช่วยคุณตั้งแต่ส่งใบสมัครจนถึงการฝึกอบรมพนักงาน และยังคงติดต่อหลังเปิดใช้งาน",
      },
      {
        id: "automation",
        title: "เราทำให้การชำระเงินเป็นอัตโนมัติ",
        description:
          "เมื่อทำงานกับเรา คุณได้โครงสร้างดิจิทัลครบถ้วน พร้อมปรับให้เหมาะกับธุรกิจของคุณ",
      },
      {
        id: "support",
        title: "เราทำงาน 24/7",
        description:
          "บริการและฝ่ายสนับสนุนของเราทำงานไม่หยุด และช่วยรับชำระเงินทั่วโลกตลอด 24 ชั่วโมง",
      },
    ],
  },
} as const satisfies Record<
  Language,
  (typeof quickOnboardingSectionLocales)["RU"]
>;

export const getQuickOnboardingSectionLocale = (lang: Language) =>
  quickOnboardingSectionLocales[lang];
