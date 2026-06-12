import { useLanguage } from "../../../../../contexts/LanguageContext";
import { mapLanguageToAdminLocale } from "../../../../../lib/mapLanguageToAdminLocale";
import {
  type ArbiPayLandingFormField,
  type ArbiPayLandingOnboardingFormLocale,
  useGetArbiPayLandingData,
} from "../../../../../lib/useGetArbiPayLandingData";
import { getApplicationFormSectionLocale } from "../ApplicationFormSection.locales";
import { groupFormFieldsIntoRows } from "./groupFormFieldsIntoRows";

const pick = (value: string | undefined, fallback: string): string =>
  value?.trim() ? value.trim() : fallback;

const isOnboardingFormLocale = (
  locale: unknown,
): locale is ArbiPayLandingOnboardingFormLocale =>
  typeof locale === "object" &&
  locale !== null &&
  "fields" in locale &&
  Array.isArray((locale as ArbiPayLandingOnboardingFormLocale).fields) &&
  "legalHtml" in locale;

const buildFallbackFields = (
  fallback: ReturnType<typeof getApplicationFormSectionLocale>,
): ArbiPayLandingFormField[] => [
  {
    key: "name_field",
    type: "text",
    label: fallback.fields.name.label,
    width: "full",
    fieldId: "dcc289bd-1517-4762-a833-264ab79eee99",
    visible: true,
    disabled: false,
    helpText: "",
    required: true,
    rowGroup: "",
    placeholder: fallback.fields.name.placeholder,
    validationType: "text",
  },
  {
    key: "email_field",
    type: "text",
    label: fallback.fields.email.label,
    width: "half",
    fieldId: "64e69034-9c8a-43b9-94ca-65ffab21451c",
    visible: true,
    disabled: false,
    helpText: "",
    required: true,
    rowGroup: "",
    placeholder: fallback.fields.email.placeholder,
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    defaultValue: "",
    validationType: "email",
  },
  {
    key: "telephone_field",
    type: "phone",
    label: fallback.fields.phone.label,
    width: "half",
    fieldId: "fa301d34-c84b-426a-8878-c4df714c294d",
    visible: true,
    disabled: false,
    helpText: "",
    required: true,
    rowGroup: "",
    placeholder: fallback.fields.phone.placeholder,
    validationType: "phone",
  },
  {
    key: "city_field",
    type: "text",
    label: fallback.fields.location.label,
    width: "full",
    fieldId: "ee30a788-7585-4ef4-b34b-4049fbcc5213",
    visible: true,
    disabled: false,
    helpText: "",
    required: true,
    rowGroup: "",
    placeholder: fallback.fields.location.placeholder,
    validationType: "text",
  },
  {
    key: "business_type_field",
    type: "select",
    label: fallback.fields.businessType.label,
    width: "full",
    fieldId: "5d40f200-c10e-431b-92a4-d43f229c4a41",
    visible: true,
    disabled: false,
    helpText: "",
    required: true,
    rowGroup: "",
    placeholder: fallback.fields.businessType.placeholder,
    defaultValue: "",
    validationType: "none",
    options: fallback.fields.businessType.options.map((option) => ({
      label: option.label,
      value: option.value,
    })),
  },
];

export const useApplicationFormSectionContent = () => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetArbiPayLandingData();
  const fallback = getApplicationFormSectionLocale(language);

  const section = data?.page.sections.find(
    (item) => item.internal_name === "application-form",
  );
  const rawLocale = !isLoading
    ? section?.locales[mapLanguageToAdminLocale(language)]
    : undefined;
  const adminLocale = isOnboardingFormLocale(rawLocale) ? rawLocale : undefined;

  const legalHtmlFromAdmin = adminLocale?.legalHtml.trim()
    ? adminLocale.legalHtml
    : null;
  const formTitle = pick(adminLocale?.formTitle, fallback.formTitle);
  const submitLabel = pick(adminLocale?.btnPrimary, fallback.submit);

  const fields =
    adminLocale?.fields.length && adminLocale.fields.some((field) => field.visible)
      ? adminLocale.fields
      : buildFallbackFields(fallback);

  const fieldRows = groupFormFieldsIntoRows(fields);

  return {
    fallback,
    legalHtmlFromAdmin,
    formTitle,
    submitLabel,
    fieldRows,
  };
};
