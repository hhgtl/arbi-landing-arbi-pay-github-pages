import type { Language } from "../../../../contexts/LanguageContext";

const whyTrustUsSectionLocales = {
  RU: {
    heading: {
      before: "Почему нам ",
      highlight: "доверяют",
    },
    intro: {
      brand: "ARBI Pay",
      lines: [
        " - команда экспертов",
        "в сфере платежей в Юго-Восточной Азии.",
        "Понимаем регион, технологии",
        "и потребности бизнеса",
      ],
    },
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
    intro: {
      brand: "ARBI Pay",
      lines: [
        " is a team of experts",
        "in payments across Southeast Asia.",
        "We understand the region, technology,",
        "and business needs",
      ],
    },
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
    intro: {
      brand: "ARBI Pay",
      lines: [
        " คือทีมผู้เชี่ยวชาญ",
        "ด้านการชำระเงินในเอเชียตะวันออกเฉียงใต้",
        "เราเข้าใจภูมิภาค เทคโนโลยี",
        "และความต้องการของธุรกิจ",
      ],
    },
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
} as const satisfies Record<Language, (typeof whyTrustUsSectionLocales)["RU"]>;

export const getWhyTrustUsSectionLocale = (lang: Language) =>
  whyTrustUsSectionLocales[lang];
