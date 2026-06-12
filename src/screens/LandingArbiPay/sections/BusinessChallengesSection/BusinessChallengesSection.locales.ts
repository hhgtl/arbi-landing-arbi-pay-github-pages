import type { Language } from "../../../../contexts/LanguageContext";

const businessChallengesSectionLocales = {
  RU: {
    heading: {
      line1Before: "Принимайте ",
      line1Highlight: "оплату в рублях",
      line2: "от клиентов из России в",
      line3Highlight: "Юго-Восточной Азии",
    },
    description:
      "Автоматизируем процесс оплаты рублями для бизнесов, которые работают за границей — быстро, прозрачно, без комиссии",
    cta: "Оставить заявку",
    secondaryCta: "Получить презентацию",
    aria: {
      mapAlt: "Southeast asia map",
      logoAlt: "Frame",
      russia: "Russia",
    },
    countries: [
      { id: "th", name: "Thailand", code: "THB" },
      { id: "id", name: "Indonesia", code: "IDR" },
      { id: "vn", name: "Vietnam", code: "VND" },
      { id: "my", name: "Malaysia", code: "MYR" },
      { id: "sg", name: "Singapore", code: "SGD" },
      { id: "ru", name: "Russia", code: "RUB" },
    ],
  },
  ENG: {
    heading: {
      line1Before: "Accept ",
      line1Highlight: "payments in rubles",
      line2: "from customers in Russia across",
      line3Highlight: "Southeast Asia",
    },
    description:
      "We automate ruble payments for businesses operating abroad — fast, transparent, with no commission",
    cta: "Submit application",
    secondaryCta: "Get presentation",
    aria: {
      mapAlt: "Southeast Asia map",
      logoAlt: "Frame",
      russia: "Russia",
    },
    countries: [
      { id: "th", name: "Thailand", code: "THB" },
      { id: "id", name: "Indonesia", code: "IDR" },
      { id: "vn", name: "Vietnam", code: "VND" },
      { id: "my", name: "Malaysia", code: "MYR" },
      { id: "sg", name: "Singapore", code: "SGD" },
      { id: "ru", name: "Russia", code: "RUB" },
    ],
  },
  TH: {
    heading: {
      line1Before: "รับ",
      line1Highlight: "ชำระเงินเป็นรูเบิล",
      line2: "จากลูกค้าในรัสเซียทั่ว",
      line3Highlight: "เอเชียตะวันออกเฉียงใต้",
    },
    description:
      "เราทำให้การชำระเงินรูเบิลเป็นอัตโนมัติสำหรับธุรกิจที่ทำงานต่างประเทศ — รวดเร็ว โปร่งใส ไม่มีค่าคอมมิชชัน",
    cta: "ส่งใบสมัคร",
    secondaryCta: "รับนำเสนอ",
    aria: {
      mapAlt: "แผนที่เอเชียตะวันออกเฉียงใต้",
      logoAlt: "Frame",
      russia: "รัสเซีย",
    },
    countries: [
      { id: "th", name: "ไทย", code: "THB" },
      { id: "id", name: "อินโดนีเซีย", code: "IDR" },
      { id: "vn", name: "เวียดนาม", code: "VND" },
      { id: "my", name: "มาเลเซีย", code: "MYR" },
      { id: "sg", name: "สิงคโปร์", code: "SGD" },
      { id: "ru", name: "รัสเซีย", code: "RUB" },
    ],
  },
} as const satisfies Record<
  Language,
  (typeof businessChallengesSectionLocales)["RU"]
>;

export const getBusinessChallengesSectionLocale = (lang: Language) =>
  businessChallengesSectionLocales[lang];
