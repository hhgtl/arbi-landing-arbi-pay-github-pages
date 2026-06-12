import applicationFormSubmitIcon from "../../../../assets/icons/application-form-submit-icon.svg";
import applicationFormIllustration from "../../../../assets/img/application-form-illustration.png";
import applicationFormBg from "../../../../assets/img/application-form-bg.png";
import clsx from "clsx";
import { type FormEvent, useEffect, useState } from "react";
import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import type { ArbiPayLandingFormField } from "../../../../lib/useGetArbiPayLandingData";
import { submitArbiBusinessApplication } from "../../../../lib/arbiBusinessApplication";
import { applyAccentSpansToHtml } from "../../../../lib/parseAccentText";
import { useApplicationFormSectionContent } from "./lib";
import styles from "./ApplicationFormSection.module.scss";
import {ApplicationAnimatedDecore} from "./ui/application-animated-decore/application-animated-decore.tsx";

const requiredMarkSrc = applicationFormSubmitIcon;

const getInputType = (field: ArbiPayLandingFormField): string => {
  if (field.type === "phone") {
    return "tel";
  }

  if (field.validationType === "email") {
    return "email";
  }

  return "text";
};

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;
type ContactType = "email" | "phone";

const getFieldMessage = (
  field: ArbiPayLandingFormField,
  fallbackMessage: string,
) => field.helpText.trim() || fallbackMessage;

const isValidPattern = (pattern: string, value: string): boolean => {
  try {
    return new RegExp(pattern).test(value);
  } catch {
    return true;
  }
};

const validateField = (
  field: ArbiPayLandingFormField,
  value: string,
  fallbackMessage: string,
): string => {
  if (field.disabled) {
    return "";
  }

  const trimmedValue = value.trim();

  if (field.required && !trimmedValue) {
    return getFieldMessage(field, fallbackMessage);
  }

  if (trimmedValue && field.pattern && !isValidPattern(field.pattern, value)) {
    return getFieldMessage(field, fallbackMessage);
  }

  return "";
};

const isEmailField = (field: ArbiPayLandingFormField): boolean =>
  field.validationType === "email";

const isPhoneField = (field: ArbiPayLandingFormField): boolean =>
  field.type === "phone" || field.validationType === "phone";

const isNameField = (field: ArbiPayLandingFormField): boolean =>
  field.key.includes("name") && !isEmailField(field) && !isPhoneField(field);

const isCityField = (field: ArbiPayLandingFormField): boolean =>
  field.key.includes("city") || field.key.includes("location");

const isBusinessTypeField = (field: ArbiPayLandingFormField): boolean =>
  field.type === "select" || field.key.includes("business");

const FieldLabel = ({
  htmlFor,
  label,
  required,
  requiredAlt,
}: {
  htmlFor: string;
  label: string;
  required: boolean;
  requiredAlt: string;
}) => (
  <label htmlFor={htmlFor} className={styles.fieldLabel}>
    <span className={styles.labelText}>{label}</span>
    {required ? (
      <img
        className={styles.requiredMark}
        alt={requiredAlt}
        src={requiredMarkSrc}
      />
    ) : null}
  </label>
);

const FormFieldControl = ({
  field,
  value,
  error,
  onValueChange,
}: {
  field: ArbiPayLandingFormField;
  value: string;
  error?: string;
  onValueChange: (value: string) => void;
}) => {
  if (field.type === "select") {
    return (
      <Select
        value={value || undefined}
        disabled={field.disabled}
        onValueChange={onValueChange}
      >
        <SelectTrigger
          id={field.fieldId}
          className={clsx(
            styles.selectTrigger,
            value && styles.selectTriggerHasValue,
            error && styles.fieldControlError,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${field.fieldId}-error` : undefined
          }
        >
          <SelectValue placeholder={field.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {(field.options ?? []).map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Input
      id={field.fieldId}
      type={getInputType(field)}
      placeholder={field.placeholder}
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      pattern={field.pattern}
      disabled={field.disabled}
      required={field.required}
      className={clsx(styles.textInput, error && styles.fieldControlError)}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${field.fieldId}-error` : undefined}
    />
  );
};

const FormField = ({
  field,
  requiredAlt,
  value,
  error,
  onValueChange,
}: {
  field: ArbiPayLandingFormField;
  requiredAlt: string;
  value: string;
  error?: string;
  onValueChange: (value: string) => void;
}) => (
  <div className={styles.fieldGroup}>
    <FieldLabel
      htmlFor={field.fieldId}
      label={field.label}
      required={field.required}
      requiredAlt={requiredAlt}
    />
    <FormFieldControl
      field={field}
      value={value}
      error={error}
      onValueChange={onValueChange}
    />
    {error ? (
      <span id={`${field.fieldId}-error`} className={styles.errorText}>
        {error}
      </span>
    ) : null}
  </div>
);

const ContactFormField = ({
  emailField,
  phoneField,
  contactType,
  requiredAlt,
  values,
  errors,
  onContactTypeChange,
  onValueChange,
}: {
  emailField: ArbiPayLandingFormField;
  phoneField: ArbiPayLandingFormField;
  contactType: ContactType;
  requiredAlt: string;
  values: FormValues;
  errors: FormErrors;
  onContactTypeChange: (contactType: ContactType) => void;
  onValueChange: (field: ArbiPayLandingFormField, value: string) => void;
}) => {
  const activeField = contactType === "email" ? emailField : phoneField;
  const activeError = errors[activeField.fieldId];
  const tabs = [
    { type: "email" as const, field: emailField },
    { type: "phone" as const, field: phoneField },
  ];

  return (
    <div className={styles.fieldGroup}>
      <FieldLabel
        htmlFor={activeField.fieldId}
        label={activeField.label}
        required={activeField.required}
        requiredAlt={requiredAlt}
      />
      <div
        className={clsx(
          styles.contactField,
          activeError && styles.fieldControlError,
        )}
      >
        <Input
          id={activeField.fieldId}
          type={getInputType(activeField)}
          placeholder={activeField.placeholder}
          value={values[activeField.fieldId] ?? ""}
          onChange={(event) => onValueChange(activeField, event.target.value)}
          pattern={activeField.pattern}
          disabled={activeField.disabled}
          required={activeField.required}
          className={styles.contactInput}
          aria-invalid={Boolean(activeError)}
          aria-describedby={
            activeError ? `${activeField.fieldId}-error` : undefined
          }
        />
        <div className={styles.contactTabs}>
          {tabs.map((tab) => {
            const isActive = contactType === tab.type;

            return (
              <button
                key={tab.type}
                type="button"
                onClick={() => onContactTypeChange(tab.type)}
                className={clsx(
                  styles.contactTab,
                  isActive && styles.contactTabActive,
                )}
              >
                <span
                  className={clsx(
                    styles.contactTabLabel,
                    isActive && styles.contactTabLabelActive,
                  )}
                >
                  {tab.field.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {activeError ? (
        <span id={`${activeField.fieldId}-error`} className={styles.errorText}>
          {activeError}
        </span>
      ) : null}
    </div>
  );
};

export const ApplicationFormSection = (): JSX.Element => {
  const {
    fallback,
    legalHtmlFromAdmin,
    formTitle,
    submitLabel,
    fieldRows,
  } = useApplicationFormSectionContent();
  const fields = fieldRows.flat();
  const fieldSignature = fields
    .map(
      (field) =>
        `${field.fieldId}:${field.label}:${field.helpText}:${field.required}:${field.pattern ?? ""}:${field.defaultValue ?? ""}`,
    )
    .join("|");
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [contactType, setContactType] = useState<ContactType>("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const emailField = fields.find(isEmailField);
  const phoneField = fields.find(isPhoneField);
  const shouldRenderContactField = Boolean(emailField && phoneField);
  const contactFieldIds = new Set(
    shouldRenderContactField
      ? [emailField?.fieldId, phoneField?.fieldId].filter(Boolean)
      : [],
  );

  useEffect(() => {
    const nextValues = fields.reduce<FormValues>((acc, field) => {
      acc[field.fieldId] = field.defaultValue ?? "";
      return acc;
    }, {});

    setValues(nextValues);
    setErrors({});
    setHasSubmitted(false);
    setSubmitStatus("idle");
  }, [fieldSignature]);

  const updateFieldValue = (field: ArbiPayLandingFormField, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field.fieldId]: value,
    }));

    if (!hasSubmitted) {
      return;
    }

    const nextError = validateField(field, value, fallback.aria.required);
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };

      if (nextError) {
        nextErrors[field.fieldId] = nextError;
      } else {
        delete nextErrors[field.fieldId];
      }

      return nextErrors;
    });
  };

  const getFieldValue = (
    field: ArbiPayLandingFormField | undefined,
  ): string => (field ? (values[field.fieldId] ?? "").trim() : "");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    setSubmitStatus("idle");

    const inactiveContactFieldId = shouldRenderContactField
      ? (contactType === "email" ? phoneField : emailField)?.fieldId
      : undefined;

    const nextErrors = fields.reduce<FormErrors>((acc, field) => {
      if (field.fieldId === inactiveContactFieldId) {
        return acc;
      }

      const error = validateField(
        field,
        values[field.fieldId] ?? "",
        fallback.aria.required,
      );

      if (error) {
        acc[field.fieldId] = error;
      }

      return acc;
    }, {});

    setErrors(nextErrors);

    if (emailField && nextErrors[emailField.fieldId]) {
      setContactType("email");
    } else if (phoneField && nextErrors[phoneField.fieldId]) {
      setContactType("phone");
    }

    if (Object.keys(nextErrors).length > 0 || isSubmitting) {
      return;
    }

    const emailValue = getFieldValue(emailField);
    const phoneValue = getFieldValue(phoneField);

    setIsSubmitting(true);

    try {
      await submitArbiBusinessApplication({
        name: getFieldValue(fields.find(isNameField)),
        email:
          shouldRenderContactField && contactType !== "email" ? "" : emailValue,
        phone:
          shouldRenderContactField && contactType !== "phone" ? "" : phoneValue,
        city: getFieldValue(fields.find(isCityField)),
        businessType: getFieldValue(fields.find(isBusinessTypeField)),
        page: window.location.href,
        source: "ARBI Pay Landing",
      });

      setSubmitStatus("success");
      setHasSubmitted(false);
      setErrors({});
      setValues(
        fields.reduce<FormValues>((acc, field) => {
          acc[field.fieldId] = field.defaultValue ?? "";
          return acc;
        }, {}),
      );
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.pageContainer}>
        <div className={styles.visualColumn}>
          <AnimatedHeader className={styles.sectionHeading}>
            {legalHtmlFromAdmin ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: applyAccentSpansToHtml(
                    legalHtmlFromAdmin,
                    styles.gradientText,
                  ),
                }}
              />
            ) : (
              <>
                {fallback.heading.before}
                <span className={styles.gradientText}>
                  {fallback.heading.highlight}
                </span>
              </>
            )}
          </AnimatedHeader>

          <ApplicationAnimatedDecore/>
          {/*<div className={styles.illustrationWrapper}>*/}
          {/*  <div className={styles.illustrationInner}>*/}
          {/*    <div className={styles.illustrationBackground}>*/}
          {/*      <img*/}
          {/*          className={styles.illustrationImageTop}*/}
          {/*          alt={fallback.aria.illustration}*/}
          {/*          src={applicationFormBg}*/}
          {/*      />*/}
          {/*      <img*/}
          {/*        className={styles.illustrationImage}*/}
          {/*        alt={fallback.aria.illustration}*/}
          {/*        src={applicationFormIllustration}*/}
          {/*      />*/}
          {/*    </div>*/}


          {/*    <div*/}
          {/*      aria-hidden="true"*/}
          {/*      className={styles.illustrationGlow}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

        <Card className={styles.formCard}>
          <CardContent className={styles.formCardContent}>
            <header>
              <h2 className={styles.formTitle}>{formTitle}</h2>
            </header>

            <form
              className={styles.form}
              noValidate
              onSubmit={handleSubmit}
            >
              {fieldRows.map((row, rowIndex) => {
                const contactFieldsInRow = row.filter((field) =>
                  contactFieldIds.has(field.fieldId),
                );
                const rowWithoutContactFields = row.filter(
                  (field) => !contactFieldIds.has(field.fieldId),
                );
                const shouldShowContactInRow =
                  shouldRenderContactField && contactFieldsInRow.length > 0;

                if (shouldShowContactInRow && rowWithoutContactFields.length === 0) {
                  return (
                    <ContactFormField
                      key="contact-field"
                      emailField={emailField!}
                      phoneField={phoneField!}
                      contactType={contactType}
                      requiredAlt={fallback.aria.required}
                      values={values}
                      errors={errors}
                      onContactTypeChange={setContactType}
                      onValueChange={updateFieldValue}
                    />
                  );
                }

                if (rowWithoutContactFields.length === 1) {
                  const field = rowWithoutContactFields[0];

                  return (
                    <FormField
                      key={field.fieldId}
                      field={field}
                      requiredAlt={fallback.aria.required}
                      value={values[field.fieldId] ?? ""}
                      error={errors[field.fieldId]}
                      onValueChange={(value) => updateFieldValue(field, value)}
                    />
                  );
                }

                return (
                  <div key={`row-${rowIndex}`} className={styles.halfWidthRow}>
                    {shouldShowContactInRow ? (
                      <div className={styles.halfWidthField}>
                        <ContactFormField
                          emailField={emailField!}
                          phoneField={phoneField!}
                          contactType={contactType}
                          requiredAlt={fallback.aria.required}
                          values={values}
                          errors={errors}
                          onContactTypeChange={setContactType}
                          onValueChange={updateFieldValue}
                        />
                      </div>
                    ) : null}
                    {rowWithoutContactFields.map((field) => (
                      <div key={field.fieldId} className={styles.halfWidthField}>
                        <FieldLabel
                          htmlFor={field.fieldId}
                          label={field.label}
                          required={field.required}
                          requiredAlt={fallback.aria.required}
                        />
                        <FormFieldControl
                          field={field}
                          value={values[field.fieldId] ?? ""}
                          error={errors[field.fieldId]}
                          onValueChange={(value) =>
                            updateFieldValue(field, value)
                          }
                        />
                        {errors[field.fieldId] ? (
                          <span
                            id={`${field.fieldId}-error`}
                            className={styles.errorText}
                          >
                            {errors[field.fieldId]}
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                );
              })}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? fallback.status.submitting : submitLabel}
              </button>

              {submitStatus !== "idle" ? (
                <p
                  role="status"
                  className={clsx(
                    styles.statusMessage,
                    submitStatus === "success"
                      ? styles.statusMessageSuccess
                      : styles.statusMessageError,
                  )}
                >
                  {submitStatus === "success"
                    ? fallback.status.success
                    : fallback.status.error}
                </p>
              ) : null}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
