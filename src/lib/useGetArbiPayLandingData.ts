import { useGetArbiPayLandingDataQuery } from "./arbiPayApi";

export type ArbiPayLandingLocaleKey = "en" | "ru" | "th";

export interface ArbiPayLandingButton {
  href: string;
  label: string;
  variant?: string;
}

export interface ArbiPayLandingMediaImage {
  alt: string;
  url: string;
}

export interface ArbiPayLandingLocale {
  badge: string;
  headline: string;
  descriptionHtml: string;
  mediaImage: ArbiPayLandingMediaImage;
  primaryButton: ArbiPayLandingButton;
  secondaryButton: ArbiPayLandingButton;
  socialLinks: unknown[];
}

export type ArbiPayLandingLocales = Record<
  ArbiPayLandingLocaleKey,
  ArbiPayLandingLocale
>;

export interface ArbiPayLandingCardImage {
  url: string;
  alt?: string;
}

export interface ArbiPayLandingCardsBlockCard {
  title: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
  images: ArbiPayLandingCardImage[];
}

export interface ArbiPayLandingCardsBlockLocale {
  label: string;
  title: string;
  subtitle: string;
  descriptionHtml: string;
  cards: ArbiPayLandingCardsBlockCard[];
}

export type ArbiPayLandingCardsBlockLocales = Record<
  ArbiPayLandingLocaleKey,
  ArbiPayLandingCardsBlockLocale
>;

export interface ArbiPayLandingCustomItemTitle {
  id: string;
  type: "title";
  text: string;
  headingLevel: string;
}

export interface ArbiPayLandingCustomItemDescription {
  id: string;
  type: "description";
  html: string;
}

export interface ArbiPayLandingCustomItemButton {
  id: string;
  type: "button";
  label: string;
  href: string;
  target: string;
  variant: string;
}

export interface ArbiPayLandingCustomItemLabel {
  id: string;
  type: "label";
  text: string;
}

export type ArbiPayLandingCustomItem =
  | ArbiPayLandingCustomItemTitle
  | ArbiPayLandingCustomItemDescription
  | ArbiPayLandingCustomItemButton
  | ArbiPayLandingCustomItemLabel;

export interface ArbiPayLandingCustomLocale {
  items: ArbiPayLandingCustomItem[];
}

export interface ArbiPayLandingFormFieldOption {
  label: string;
  value: string;
}

export interface ArbiPayLandingFormField {
  key: string;
  type: string;
  label: string;
  width: "full" | "half";
  fieldId: string;
  visible: boolean;
  disabled: boolean;
  helpText: string;
  required: boolean;
  rowGroup: string;
  placeholder: string;
  pattern?: string;
  defaultValue?: string;
  validationType: string;
  options?: ArbiPayLandingFormFieldOption[];
}

export interface ArbiPayLandingOnboardingFormLocale {
  formTitle: string;
  legalHtml: string;
  btnPrimary: string;
  fields: ArbiPayLandingFormField[];
}

export interface ArbiPayLandingSection {
  id: string;
  page_id: string;
  internal_name: string;
  section_type: string;
  sort_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
  locales: Partial<
    Record<
      ArbiPayLandingLocaleKey,
      | ArbiPayLandingLocale
      | ArbiPayLandingCardsBlockLocale
      | ArbiPayLandingCustomLocale
      | ArbiPayLandingOnboardingFormLocale
    >
  >;
}

export interface ArbiPayLandingPage {
  id: string;
  internal_name: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
  sections: ArbiPayLandingSection[];
}

export interface ArbiPayLandingPageResponse {
  page: ArbiPayLandingPage;
}

interface UseGetArbiPayLandingDataResult {
  data: ArbiPayLandingPageResponse | null;
  isLoading: boolean;
  error: Error | null;
}

const normalizeRtkQueryError = (error: unknown): Error | null => {
  if (!error) {
    return null;
  }

  if (error instanceof Error) {
    return error;
  }

  if (typeof error === "object" && error !== null) {
    if (
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
    ) {
      return new Error((error as { message: string }).message);
    }

    if ("status" in error) {
      return new Error(
        `Failed to fetch landing data: ${String(
          (error as { status: unknown }).status,
        )}`,
      );
    }
  }

  return new Error("Unknown fetch error");
};

export const useGetArbiPayLandingData = (): UseGetArbiPayLandingDataResult => {
  const { data, error, isLoading } = useGetArbiPayLandingDataQuery();

  return {
    data: data ?? null,
    isLoading,
    error: normalizeRtkQueryError(error),
  };
};
