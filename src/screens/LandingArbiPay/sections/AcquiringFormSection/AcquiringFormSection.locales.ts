import type { Language } from "../../../../contexts/LanguageContext";

const acquiringFormSectionLocales = {
  RU: {
    heading: {
      before: "Оставьте заявку на подключение ",
      highlight: "рублевого эквайринга",
    },
    formTitle: "Форма заявки",
    contactTabs: [
      { value: "email", label: "Еmail" },
      { value: "phone", label: "Телефон" },
    ],
    fields: {
      name: { label: "Имя", placeholder: "Введите ваше имя" },
      email: { label: "Еmail", placeholder: "Введите email" },
      phone: { label: "Телефон", placeholder: "Введите телефон" },
      location: {
        label: "Город / Локация",
        placeholder: "Введите адрес локации",
      },
      businessType: {
        label: "Тип бизнеса",
        placeholder: "Выберите тип бизнеса",
      },
    },
    submit: "Оставить заявку",
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
    contactTabs: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
    ],
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
      },
    },
    submit: "Submit application",
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
    contactTabs: [
      { value: "email", label: "อีเมล" },
      { value: "phone", label: "โทรศัพท์" },
    ],
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
      },
    },
    submit: "ส่งใบสมัคร",
    aria: {
      required: "ช่องที่ต้องกรอก",
      illustration: "ภาพประกอบเหรียญ",
    },
  },
} as const satisfies Record<
  Language,
  (typeof acquiringFormSectionLocales)["RU"]
>;

export const getAcquiringFormSectionLocale = (lang: Language) =>
  acquiringFormSectionLocales[lang];
