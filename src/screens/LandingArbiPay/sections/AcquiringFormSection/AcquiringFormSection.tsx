import acquiringFormSubmitIcon from "../../../../assets/icons/acquiring-form-submit-icon.svg";
import acquiringFormIllustration from "../../../../assets/img/acquiring-form-illustration.png";
import clsx from "clsx";
import { useState } from "react";
import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { getAcquiringFormSectionLocale } from "./AcquiringFormSection.locales";
import styles from "./AcquiringFormSection.module.scss";

const requiredMarkSrc = acquiringFormSubmitIcon;

const formFieldIds = ["name", "contact", "location", "businessType"] as const;

export const AcquiringFormSection = (): JSX.Element => {
  const { language } = useLanguage();
  const t = getAcquiringFormSectionLocale(language);
  const [contactType, setContactType] = useState("email");

  const formFields = [
    { id: formFieldIds[0], type: "input" as const },
    { id: formFieldIds[1], type: "contact" as const },
    { id: formFieldIds[2], type: "input" as const },
    { id: formFieldIds[3], type: "select" as const },
  ];

  const fieldLabels = {
    name: t.fields.name,
    contact: t.fields.email,
    location: t.fields.location,
    businessType: t.fields.businessType,
  };

  return (
    <section className={styles.section}>
      <div className={styles.pageContainer}>
        <div className={styles.visualColumn}>
          <AnimatedHeader className={styles.sectionHeading}>
            {t.heading.before}
            <span className={styles.gradientText}>{t.heading.highlight}</span>
          </AnimatedHeader>
          <div className={styles.illustrationWrapper}>
            <div className={styles.illustrationInner}>
              <div className={styles.illustrationBackground}>
                <img
                  className={styles.illustrationImage}
                  alt={t.aria.illustration}
                  src={acquiringFormIllustration}
                />
              </div>
              <div className={styles.illustrationGlow} />
            </div>
          </div>
        </div>
        <Card className={styles.formCard}>
          <CardContent className={styles.formCardContent}>
            <header>
              <AnimatedHeader className={styles.formTitle}>
                {t.formTitle}
              </AnimatedHeader>
            </header>
            <form
              className={styles.form}
              onSubmit={(e) => e.preventDefault()}
            >
              {formFields.map((field) => {
                const fieldConfig =
                  fieldLabels[field.id as keyof typeof fieldLabels];

                return (
                  <div key={field.id} className={styles.fieldGroup}>
                    <label htmlFor={field.id} className={styles.fieldLabel}>
                      <span className={styles.labelText}>
                        {field.id === "contact" && contactType === "phone"
                          ? t.fields.phone.label
                          : fieldConfig.label}
                      </span>
                      <img
                        className={styles.requiredMark}
                        alt={t.aria.required}
                        src={requiredMarkSrc}
                      />
                    </label>
                    {field.type === "input" && (
                      <Input
                        id={field.id}
                        defaultValue=""
                        placeholder={fieldConfig.placeholder}
                        className={styles.textInput}
                      />
                    )}

                    {field.type === "contact" && (
                      <div className={styles.contactField}>
                        <Input
                          id={field.id}
                          defaultValue=""
                          placeholder={
                            contactType === "email"
                              ? t.fields.email.placeholder
                              : t.fields.phone.placeholder
                          }
                          className={styles.contactInput}
                        />
                        <div className={styles.contactTabs}>
                          {t.contactTabs.map((tab) => {
                            const isActive = contactType === tab.value;

                            return (
                              <button
                                key={tab.value}
                                type="button"
                                onClick={() => setContactType(tab.value)}
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
                                  {tab.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {field.type === "select" && (
                      <Select>
                        <SelectTrigger
                          id={field.id}
                          className={styles.selectTrigger}
                        >
                          <SelectValue placeholder={fieldConfig.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="placeholder">
                            {fieldConfig.placeholder}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                );
              })}

              <Button
                type="submit"
                onClick={() =>
                  window.open(
                    "https://arbipay.online/onboarding/",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className={styles.submitButton}
              >
                {t.submit}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
