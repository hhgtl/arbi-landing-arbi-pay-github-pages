const CRM_BASE_URL = "https://arbi-ex.com/landing";

export const crmApiUrl = (path: string): string => `${CRM_BASE_URL}${path}`;

export interface ArbiBusinessApplicationRequest {
  /** Ім'я з поля "Имя" — обов'язкове */
  name: string;
  /** Email — обов'язкове, якщо перемикач у позиції "Email" */
  email?: string;
  /** Телефон — обов'язковий, якщо перемикач у позиції "Телефон" */
  phone?: string;
  /** Поле "Город / Локация" — обов'язкове */
  city: string;
  /** Поле "Тип бизнеса" (вибране значення селекта) — обов'язкове */
  businessType: string;
  /** URL сторінки, з якої відправлено форму */
  page?: string;
  /** Назва джерела, дефолт на беку — "ARBI Exchange landing" */
  source?: string;
}

export const submitArbiBusinessApplication = async (
  request: ArbiBusinessApplicationRequest,
): Promise<void> => {
  const response = await fetch(
    crmApiUrl("/api/public/arbi-business-application"),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    throw new Error("Application request failed");
  }
};
