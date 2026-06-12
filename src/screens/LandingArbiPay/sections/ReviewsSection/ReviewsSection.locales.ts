import type { Language } from "../../../../contexts/LanguageContext";

const reviewsSectionLocales = {
  RU: {
    heading: {
      before: "Отзывы",
      middle: " наших ",
      after: "клиентов",
    },
    aria: {
      prev: "Предыдущий отзыв",
      next: "Следующий отзыв",
    },
    items: [
      {
        id: "review-1",
        name: "Даниил Соколов",
        company: 'Ресторан "Пик"',
        date: "15 марта 2026 г.",
        text: "ARBI Pay помог нам увеличить средний чек на 25%. После подключения клиенты стали чаще выбирать удобную оплату, а средний чек заметно вырос.",
      },
      {
        id: "review-2",
        name: "Екатерина Смирнова",
        company: 'SPA "Prime"',
        date: "15 марта 2026 г.",
        text: "Расчёты в ТНВ без потерь и сложностей. ARBI Pay упростил приём платежей от туристов и помог избежать проблем с конвертацией.",
      },
      {
        id: "review-3",
        name: "Алексей Романов",
        company: 'Агентство "Real House"',
        date: "15 марта 2026 г.",
        text: "Подключились за час и начали зарабатывать сразу. Настройка прошла быстро, без сложной технической подготовки.",
      },
      {
        id: "review-4",
        name: "Мария Иванова",
        company: 'Бутик "Azure"',
        date: "16 марта 2026 г.",
        text: "Покупателям стало проще оплачивать заказы, а команда быстрее видит поступления. Это заметно ускорило ежедневную работу.",
      },
      {
        id: "review-5",
        name: "Игорь Волков",
        company: 'Отель "Sun Bay"',
        date: "17 марта 2026 г.",
        text: "Сервис помог принимать платежи от гостей без лишних шагов. Количество успешных оплат выросло уже в первую неделю.",
      },
    ],
  },
  ENG: {
    heading: {
      before: "Reviews",
      middle: " from our ",
      after: "clients",
    },
    aria: {
      prev: "Previous review",
      next: "Next review",
    },
    items: [
      {
        id: "review-1",
        name: "Daniil Sokolov",
        company: 'Restaurant "Pik"',
        date: "March 15, 2026",
        text: "ARBI Pay helped us increase the average check by 25%. After onboarding, customers chose convenient payment more often, and the average check grew noticeably.",
      },
      {
        id: "review-2",
        name: "Ekaterina Smirnova",
        company: 'SPA "Prime"',
        date: "March 15, 2026",
        text: "Settlements in THB without losses or complications. ARBI Pay simplified accepting payments from tourists and helped avoid conversion issues.",
      },
      {
        id: "review-3",
        name: "Alexey Romanov",
        company: 'Agency "Real House"',
        date: "March 15, 2026",
        text: "We connected in an hour and started earning right away. Setup was fast, with no complex technical preparation.",
      },
      {
        id: "review-4",
        name: "Maria Ivanova",
        company: 'Boutique "Azure"',
        date: "March 16, 2026",
        text: "It became easier for buyers to pay for orders, and the team sees incoming payments faster. This noticeably sped up daily operations.",
      },
      {
        id: "review-5",
        name: "Igor Volkov",
        company: 'Hotel "Sun Bay"',
        date: "March 17, 2026",
        text: "The service helped accept guest payments without extra steps. The number of successful payments grew in the first week.",
      },
    ],
  },
  TH: {
    heading: {
      before: "รีวิว",
      middle: " จาก",
      after: "ลูกค้าของเรา",
    },
    aria: {
      prev: "รีวิวก่อนหน้า",
      next: "รีวิวถัดไป",
    },
    items: [
      {
        id: "review-1",
        name: "ดาเนียล โซโคลอฟ",
        company: 'ร้านอาหาร "Pik"',
        date: "15 มีนาคม 2026",
        text: "ARBI Pay ช่วยให้เราเพิ่มยอดเฉลี่ยต่อบิลได้ 25% หลังเชื่อมต่อ ลูกค้าเลือกชำระเงินที่สะดวกมากขึ้น และยอดเฉลี่ยเพิ่มขึ้นอย่างชัดเจน",
      },
      {
        id: "review-2",
        name: "เอกาเทอรินา สมิร์นอวา",
        company: 'สปา "Prime"',
        date: "15 มีนาคม 2026",
        text: "การชำระเป็นบาทโดยไม่สูญเสียและไม่ซับซ้อน ARBI Pay ทำให้รับชำระจากนักท่องเที่ยวง่ายขึ้นและหลีกเลี่ยงปัญหาการแปลงสกุลเงิน",
      },
      {
        id: "review-3",
        name: "อเล็กซีย์ โรมานอฟ",
        company: 'เอเจนซี่ "Real House"',
        date: "15 มีนาคม 2026",
        text: "เชื่อมต่อภายในหนึ่งชั่วโมงและเริ่มทำรายได้ทันที การตั้งค่าเร็ว ไม่ต้องเตรียมทางเทคนิคที่ซับซ้อน",
      },
      {
        id: "review-4",
        name: "มาเรีย อีวานอวา",
        company: 'บูติก "Azure"',
        date: "16 มีนาคม 2026",
        text: "ลูกค้าชำระคำสั่งซื้อง่ายขึ้น และทีมเห็นเงินเข้าเร็วขึ้น ช่วยเร่งการทำงานประจำวันได้อย่างชัดเจน",
      },
      {
        id: "review-5",
        name: "อิกอร์ โวลคอฟ",
        company: 'โรงแรม "Sun Bay"',
        date: "17 มีนาคม 2026",
        text: "บริการช่วยรับชำระจากแขกโดยไม่ต้องมีขั้นตอนเพิ่ม จำนวนการชำระที่สำเร็จเพิ่มขึ้นในสัปดาห์แรก",
      },
    ],
  },
} as const satisfies Record<Language, (typeof reviewsSectionLocales)["RU"]>;

export const getReviewsSectionLocale = (lang: Language) =>
  reviewsSectionLocales[lang];
