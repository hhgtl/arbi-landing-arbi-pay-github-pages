import type { Language } from "../../../../contexts/LanguageContext";

const faqSectionLocales = {
  RU: {
    heading: {
      before: "Быстрое ",
      highlight: "подключение",
    },
    sidebarText:
      "Поможем пройти путь от заявки до запуска без лишних сложностей",
    cta: "Оставить заявку",
    aria: {
      tablist: "Шаги быстрого подключения",
      stepLabel: "Шаг",
      step01Image: "Интерфейс формы регистрации компании",
      step02Image: "Смартфон с сообщением",
      step03Image: "Интерфейс личного кабинета на ноутбуке",
      step04Image: "Смартфон с уведомлениями об оплате",
    },
    progress: {
      title: "Ваш прогресс",
      stepCounter: "Шаг 5 из 5",
      percent: "100%",
      items: [
        { id: "company", title: "Компании", description: "Основные сведения о компании" },
        { id: "owner", title: "Владелец", description: "Данные о владельце компании" },
        {
          id: "payment",
          title: "Платежный профиль",
          description: "Настройка платежных параметров",
        },
        { id: "settings", title: "Настройки", description: "Дополнительные функции" },
        {
          id: "confirmation",
          title: "Подтверждение",
          description: "Проверка и отправка заявки",
        },
      ],
    },
    step02: {
      brand: "ARBI Pay",
      time: "сейчас",
      message:
        "Здравствуйте! Меня зовут Александра, я менеджер ARBI PAY. Мы получили вашу заявку на подключение. Я помогу вам пройти все шаги - от уточнения деталей до запуска приёма оплат.",
    },
    paymentCards: [
      {
        id: "card-1",
        number: "№123731",
        date: "01.05.2026",
        amount: "+ 4 999 RUB",
        account: "Счёт по СберКарта ***0123",
        balance: "Баланс: 83 149,47 ₽",
      },
      {
        id: "card-2",
        number: "№123456",
        date: "12.03.2026",
        amount: "+ 7 089 RUB",
        account: "Счёт по СберКарта ***3232",
        balance: "Баланс: 55 593,23 ₽",
      },
      {
        id: "card-3",
        number: "№148919",
        date: "05.05.2026",
        amount: "+ 5 782 RUB",
        account: "Счёт по СберКарта ***4409",
        balance: "Баланс: 105 882,08 ₽",
      },
      {
        id: "card-4",
        number: "№150082",
        date: "сейчас",
        amount: "+ 13 045 RUB",
        account: "Счёт по СберКарта ***9095",
        balance: "Баланс: 125 005,99 ₽",
      },
    ],
    steps: [
      { id: "step-1", number: "01.", title: "Вы оставляете заявку" },
      { id: "step-2", number: "02.", title: "Менеджер связывается с вами" },
      { id: "step-3", number: "03.", title: "Открывает доступ в личный кабинет" },
      { id: "step-4", number: "04.", title: "Прием оплаты в рублях запущен" },
    ],
  },
  ENG: {
    heading: {
      before: "Fast ",
      highlight: "onboarding",
    },
    sidebarText:
      "We'll help you go from application to launch without unnecessary complexity",
    cta: "Submit application",
    aria: {
      tablist: "Fast onboarding steps",
      stepLabel: "Step",
      step01Image: "Company registration form interface",
      step02Image: "Smartphone with message",
      step03Image: "Personal account interface on laptop",
      step04Image: "Smartphone with payment notifications",
    },
    progress: {
      title: "Your progress",
      stepCounter: "Step 5 of 5",
      percent: "100%",
      items: [
        { id: "company", title: "Company", description: "Basic company information" },
        { id: "owner", title: "Owner", description: "Company owner details" },
        {
          id: "payment",
          title: "Payment profile",
          description: "Payment settings configuration",
        },
        { id: "settings", title: "Settings", description: "Additional features" },
        {
          id: "confirmation",
          title: "Confirmation",
          description: "Review and submit application",
        },
      ],
    },
    step02: {
      brand: "ARBI Pay",
      time: "now",
      message:
        "Hello! My name is Alexandra, I'm an ARBI PAY manager. We received your onboarding application. I'll help you through every step — from clarifying details to launching payment acceptance.",
    },
    paymentCards: [
      {
        id: "card-1",
        number: "№123731",
        date: "05/01/2026",
        amount: "+ 4,999 RUB",
        account: "SberCard account ***0123",
        balance: "Balance: 83,149.47 ₽",
      },
      {
        id: "card-2",
        number: "№123456",
        date: "03/12/2026",
        amount: "+ 7,089 RUB",
        account: "SberCard account ***3232",
        balance: "Balance: 55,593.23 ₽",
      },
      {
        id: "card-3",
        number: "№148919",
        date: "05/05/2026",
        amount: "+ 5,782 RUB",
        account: "SberCard account ***4409",
        balance: "Balance: 105,882.08 ₽",
      },
      {
        id: "card-4",
        number: "№150082",
        date: "now",
        amount: "+ 13,045 RUB",
        account: "SberCard account ***9095",
        balance: "Balance: 125,005.99 ₽",
      },
    ],
    steps: [
      { id: "step-1", number: "01.", title: "You submit an application" },
      { id: "step-2", number: "02.", title: "A manager contacts you" },
      { id: "step-3", number: "03.", title: "Access to your account is opened" },
      { id: "step-4", number: "04.", title: "Ruble payment acceptance is live" },
    ],
  },
  TH: {
    heading: {
      before: "การเชื่อมต่อ",
      highlight: "ที่รวดเร็ว",
    },
    sidebarText:
      "เราช่วยคุณตั้งแต่ส่งใบสมัครจนถึงเปิดใช้งาน โดยไม่ซับซ้อนเกินไป",
    cta: "ส่งใบสมัคร",
    aria: {
      tablist: "ขั้นตอนการเชื่อมต่อที่รวดเร็ว",
      stepLabel: "ขั้นตอน",
      step01Image: "อินเทอร์เฟซฟอร์มลงทะเบียนบริษัท",
      step02Image: "สมาร์ทโฟนพร้อมข้อความ",
      step03Image: "อินเทอร์เฟซบัญชีส่วนตัวบนแล็ปท็อป",
      step04Image: "สมาร์ทโฟนพร้อมการแจ้งเตือนการชำระเงิน",
    },
    progress: {
      title: "ความคืบหน้าของคุณ",
      stepCounter: "ขั้นตอน 5 จาก 5",
      percent: "100%",
      items: [
        { id: "company", title: "บริษัท", description: "ข้อมูลพื้นฐานของบริษัท" },
        { id: "owner", title: "เจ้าของ", description: "ข้อมูลเจ้าของบริษัท" },
        {
          id: "payment",
          title: "โปรไฟล์การชำระเงิน",
          description: "การตั้งค่าพารามิเตอร์การชำระเงิน",
        },
        { id: "settings", title: "การตั้งค่า", description: "ฟีเจอร์เพิ่มเติม" },
        {
          id: "confirmation",
          title: "ยืนยัน",
          description: "ตรวจสอบและส่งใบสมัคร",
        },
      ],
    },
    step02: {
      brand: "ARBI Pay",
      time: "ตอนนี้",
      message:
        "สวัสดีค่ะ! ฉันชื่ออเล็กซานดรา ผู้จัดการ ARBI PAY เราได้รับใบสมัครเชื่อมต่อของคุณแล้ว ฉันจะช่วยคุณในทุกขั้นตอน ตั้งแต่ยืนยันรายละเอียดจนถึงเปิดรับชำระเงิน",
    },
    paymentCards: [
      {
        id: "card-1",
        number: "№123731",
        date: "01.05.2026",
        amount: "+ 4,999 RUB",
        account: "บัญชี SberCard ***0123",
        balance: "ยอดคงเหลือ: 83,149.47 ₽",
      },
      {
        id: "card-2",
        number: "№123456",
        date: "12.03.2026",
        amount: "+ 7,089 RUB",
        account: "บัญชี SberCard ***3232",
        balance: "ยอดคงเหลือ: 55,593.23 ₽",
      },
      {
        id: "card-3",
        number: "№148919",
        date: "05.05.2026",
        amount: "+ 5,782 RUB",
        account: "บัญชี SberCard ***4409",
        balance: "ยอดคงเหลือ: 105,882.08 ₽",
      },
      {
        id: "card-4",
        number: "№150082",
        date: "ตอนนี้",
        amount: "+ 13,045 RUB",
        account: "บัญชี SberCard ***9095",
        balance: "ยอดคงเหลือ: 125,005.99 ₽",
      },
    ],
    steps: [
      { id: "step-1", number: "01.", title: "คุณส่งใบสมัคร" },
      { id: "step-2", number: "02.", title: "ผู้จัดการติดต่อคุณ" },
      { id: "step-3", number: "03.", title: "เปิดสิทธิ์เข้าบัญชีส่วนตัว" },
      { id: "step-4", number: "04.", title: "เปิดรับชำระรูเบิลแล้ว" },
    ],
  },
} as const satisfies Record<Language, (typeof faqSectionLocales)["RU"]>;

export const getFaqSectionLocale = (lang: Language) => faqSectionLocales[lang];
