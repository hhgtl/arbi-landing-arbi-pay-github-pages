import type { Language } from "../../../../contexts/LanguageContext";

const idealCustomersSectionLocales = {
  RU: {
    heading: {
      before: "Кому ",
      highlight: "особенно",
      after: " полезен",
    },
    logoAlt: "ARBI Pay",
    items: [
      {
        id: "restaurants",
        title: "Рестораны и кафе",
        description:
          "Принимайте оплату за счет и мероприятия удобным способом для туристов и экспатов",
      },
      {
        id: "spa",
        title: "SPA и салоны красоты",
        description:
          "Упростите оплату услуг и курсов без лишних вопросов и задержек на кассе",
      },
      {
        id: "tourism",
        title: "Туристические сервисы",
        description:
          "Принимайте оплату за экскурсии, трансферы и бронирования без потери клиентов на этапе обмена валюты",
      },
      {
        id: "rental",
        title: "Аренда байков и авто",
        description:
          "Удобное решение для оплаты аренды, депозита и дополнительных услуг в одном процессе",
      },
      {
        id: "real-estate",
        title: "Недвижимость",
        description:
          "Принимайте оплату за бронирование прямо из офиса застройщика всего за 1 минуту",
      },
      {
        id: "finance",
        title: "Финансовые сервисы",
        description:
          "Подходит для сервисов, которым важны прозрачность платежного процесса, скорость и удобство работы с клиентами",
      },
    ],
    cta: "Подходит моему бизнесу",
  },
  ENG: {
    heading: {
      before: "Who ",
      highlight: "benefits most",
      after: "",
    },
    logoAlt: "ARBI Pay",
    items: [
      {
        id: "restaurants",
        title: "Restaurants and cafes",
        description:
          "Accept payments for bills and events in a way that's convenient for tourists and expats",
      },
      {
        id: "spa",
        title: "SPAs and beauty salons",
        description:
          "Simplify payment for services and courses without extra questions or checkout delays",
      },
      {
        id: "tourism",
        title: "Tourism services",
        description:
          "Accept payments for tours, transfers, and bookings without losing customers during currency exchange",
      },
      {
        id: "rental",
        title: "Bike and car rental",
        description:
          "A convenient solution for paying rent, deposits, and add-on services in one flow",
      },
      {
        id: "real-estate",
        title: "Real estate",
        description:
          "Accept booking payments right from the developer's office in just 1 minute",
      },
      {
        id: "finance",
        title: "Financial services",
        description:
          "Ideal for services that need payment transparency, speed, and a smooth customer experience",
      },
    ],
    cta: "Fits my business",
  },
  TH: {
    heading: {
      before: "เหมาะกับ",
      highlight: "ใครเป็นพิเศษ",
      after: "",
    },
    logoAlt: "ARBI Pay",
    items: [
      {
        id: "restaurants",
        title: "ร้านอาหารและคาเฟ่",
        description:
          "รับชำระค่าบิลและอีเวนต์ด้วยวิธีที่สะดวกสำหรับนักท่องเที่ยวและชาวต่างชาติ",
      },
      {
        id: "spa",
        title: "สปาและร้านเสริมสวย",
        description:
          "ทำให้การชำระค่าบริการและคอร์สง่ายขึ้น โดยไม่ต้องถามซ้ำหรือรอที่เคาน์เตอร์",
      },
      {
        id: "tourism",
        title: "บริการท่องเที่ยว",
        description:
          "รับชำระค่าทัวร์ รถรับส่ง และการจอง โดยไม่สูญเสียลูกค้าในขั้นตอนแลกเงิน",
      },
      {
        id: "rental",
        title: "เช่ามอเตอร์ไซค์และรถยนต์",
        description:
          "โซลูชันที่สะดวกสำหรับชำระค่าเช่า มัดจำ และบริการเสริมในขั้นตอนเดียว",
      },
      {
        id: "real-estate",
        title: "อสังหาริมทรัพย์",
        description:
          "รับชำระค่าจองได้จากสำนักงานผู้พัฒนาโครงการภายใน 1 นาที",
      },
      {
        id: "finance",
        title: "บริการทางการเงิน",
        description:
          "เหมาะกับบริการที่ต้องการความโปร่งใส ความเร็ว และความสะดวกในการทำงานกับลูกค้า",
      },
    ],
    cta: "เหมาะกับธุรกิจของฉัน",
  },
} as const satisfies Record<
  Language,
  (typeof idealCustomersSectionLocales)["RU"]
>;

export const getIdealCustomersSectionLocale = (lang: Language) =>
  idealCustomersSectionLocales[lang];
