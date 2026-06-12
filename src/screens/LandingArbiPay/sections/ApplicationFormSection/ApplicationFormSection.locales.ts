import type { Language } from "../../../../contexts/LanguageContext";

const applicationFormSectionLocales = {
  RU: {
    heading: {
      before: "Оставьте заявку на подключение ",
      highlight: "рублевого эквайринга",
    },
    formTitle: "Форма заявки",
    fields: {
      name: { label: "Имя", placeholder: "Введите ваше имя" },
      email: { label: "Email", placeholder: "Введите email" },
      phone: { label: "Телефон", placeholder: "Введите телефон" },
      location: {
        label: "Город / Локация",
        placeholder: "Введите адрес локации",
      },
      businessType: {
        label: "Тип бизнеса",
        placeholder: "Выберите тип бизнеса",
        options: [
          { value: "retail", label: "Розничная торговля" },
          { value: "restaurant", label: "Ресторан / Кафе" },
          { value: "hotel", label: "Отель / Гостиница" },
          { value: "tourism", label: "Туризм / Экскурсии" },
          { value: "other", label: "Другое" },
        ],
      },
    },
    submit: "Оставить заявку",
    status: {
      submitting: "Отправляем заявку…",
      success: "Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.",
      error: "Не удалось отправить заявку. Попробуйте еще раз позже.",
    },
    aria: {
      required: "Обязательное поле",
      illustration: "Иллюстрация монет",
    },
  },
  ENG: {
    heading: {
      before: "Submit an application for ",
      highlight: "ruble acquiring",
    },
    formTitle: "Application form",
    fields: {
      name: { label: "Name", placeholder: "Enter your name" },
      email: { label: "Email", placeholder: "Enter email" },
      phone: { label: "Phone", placeholder: "Enter phone number" },
      location: {
        label: "City / Location",
        placeholder: "Enter location address",
      },
      businessType: {
        label: "Business type",
        placeholder: "Select business type",
        options: [
          { value: "retail", label: "Retail" },
          { value: "restaurant", label: "Restaurant / Cafe" },
          { value: "hotel", label: "Hotel" },
          { value: "tourism", label: "Tourism / Tours" },
          { value: "other", label: "Other" },
        ],
      },
    },
    submit: "Submit application",
    status: {
      submitting: "Sending your application…",
      success: "Application sent successfully. We will contact you shortly.",
      error: "Failed to send the application. Please try again later.",
    },
    aria: {
      required: "Required field",
      illustration: "Coins illustration",
    },
  },
  TH: {
    heading: {
      before: "ส่งใบสมัครเพื่อเชื่อมต่อ ",
      highlight: "ระบบรับชำระรูเบิล",
    },
    formTitle: "แบบฟอร์มใบสมัคร",
    fields: {
      name: { label: "ชื่อ", placeholder: "กรอกชื่อของคุณ" },
      email: { label: "อีเมล", placeholder: "กรอกอีเมล" },
      phone: { label: "โทรศัพท์", placeholder: "กรอกเบอร์โทรศัพท์" },
      location: {
        label: "เมือง / สถานที่",
        placeholder: "กรอกที่อยู่สถานที่",
      },
      businessType: {
        label: "ประเภทธุรกิจ",
        placeholder: "เลือกประเภทธุรกิจ",
        options: [
          { value: "retail", label: "ค้าปลีก" },
          { value: "restaurant", label: "ร้านอาหาร / คาเฟ่" },
          { value: "hotel", label: "โรงแรม" },
          { value: "tourism", label: "ท่องเที่ยว / ทัวร์" },
          { value: "other", label: "อื่นๆ" },
        ],
      },
    },
    submit: "ส่งใบสมัคร",
    status: {
      submitting: "กำลังส่งใบสมัคร…",
      success: "ส่งใบสมัครเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด",
      error: "ส่งใบสมัครไม่สำเร็จ กรุณาลองใหม่อีกครั้งภายหลัง",
    },
    aria: {
      required: "ช่องที่ต้องกรอก",
      illustration: "ภาพประกอบเหรียญ",
    },
  },
} as const satisfies Record<
  Language,
  (typeof applicationFormSectionLocales)["RU"]
>;

export const getApplicationFormSectionLocale = (lang: Language) =>
  applicationFormSectionLocales[lang];
