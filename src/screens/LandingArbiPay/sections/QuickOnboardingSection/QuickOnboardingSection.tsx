import { type ReactNode } from "react";
import automationIcon from "../../../../assets/img/trust-section/automation-icon.png";
import marketIcon from "../../../../assets/img/trust-section/market-icon.png";
import onboardingIcon from "../../../../assets/img/trust-section/onboarding-icon.svg";
import stepTitleDivider from "../../../../assets/img/trust-section/step-title-divider.svg";
import supportIcon from "../../../../assets/img/trust-section/support-icon.svg";
import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  applyAccentSpansToHtml,
  parseAccentText,
} from "../../../../lib/parseAccentText";
import { useQuickOnboardingSectionContent } from "./lib";
import styles from "./QuickOnboardingSection.module.scss";
import { StepConnector } from "./StepConnector";

const itemMeta = [
  {
    iconSrc: marketIcon,
    hasConnector: true,
    align: "right" as const,
  },
  {
    iconSrc: onboardingIcon,
    hasConnector: true,
    align: "left" as const,
  },
  {
    iconSrc: automationIcon,
    hasConnector: true,
    align: "right" as const,
    highlighted: true,
  },
  {
    iconSrc: supportIcon,
    align: "left" as const,
  },
];

const ItemIcon = ({
  src,
  alt,
  highlighted,
}: {
  src: string;
  alt: string;
  highlighted?: boolean;
}) => {
  return (
      <div className={styles.itemIconWrapper}>
        <img className={styles.itemIcon} alt={alt} src={src} />
      </div>
  );
};

const OnboardingItem = ({
  title,
  titleAlt,
  descriptionHtml,
  fallbackDescription,
  iconSrc,
  hasConnector,
  connectorIndex,
  align,
  highlighted,
}: {
  title: ReactNode;
  titleAlt: string;
  descriptionHtml: string | null;
  fallbackDescription: string;
  iconSrc: string;
  hasConnector?: boolean;
  connectorIndex: number;
  align: "left" | "right";
  highlighted?: boolean;
}) => {
  const connector = hasConnector ? (
    <StepConnector align={align} index={connectorIndex} />
  ) : null;

  return (
    <div
      className={
        align === "left" ? styles.itemRowLeft : styles.itemRowRight
      }
    >
      {align === "right" ? connector : null}

      <article className={styles.itemArticle}>
        <ItemIcon src={iconSrc} alt={titleAlt} highlighted={highlighted} />
        <div className={styles.itemContent}>
          <header className={styles.itemHeader}>
            <h3 className={styles.itemTitle}>{title}</h3>
            <img
              className={styles.itemDivider}
              alt=""
              aria-hidden="true"
              src={stepTitleDivider}
            />
          </header>
          {descriptionHtml ? (
            <div
              className={styles.itemDescription}
              dangerouslySetInnerHTML={{
                __html: applyAccentSpansToHtml(
                  descriptionHtml,
                  styles.gradientText,
                ),
              }}
            />
          ) : (
            <p className={styles.itemDescription}>{fallbackDescription}</p>
          )}
        </div>
      </article>
      {align === "left" ? connector : null}
    </div>
  );
};

export const QuickOnboardingSection = (): JSX.Element => {
  const {
    fallback,
    titleFromAdmin,
    descriptionHtmlFromAdmin,
    items,
  } = useQuickOnboardingSectionContent();

  return (
    <section className={styles.section}>
      <div className={styles.pageContainer}>
        <AnimatedHeader className={styles.sectionHeading}>
          {titleFromAdmin ? (
            parseAccentText(titleFromAdmin, styles.gradientText)
          ) : (
            <>
              {fallback.heading.before}
              <span className={styles.gradientText}>
                {fallback.heading.highlight}
              </span>
            </>
          )}
        </AnimatedHeader>
        <div className={styles.contentGrid}>
          <div className={styles.introColumn}>
            {descriptionHtmlFromAdmin ? (
              <div
                className={styles.introHtml}
                dangerouslySetInnerHTML={{
                  __html: applyAccentSpansToHtml(
                    descriptionHtmlFromAdmin,
                    styles.gradientText,
                  ),
                }}
              />
            ) : (
              <>
                <h3 className={styles.introHeading}>
                  <span className={styles.gradientText}>
                    {fallback.introHeading.brand}
                  </span>
                  {fallback.introHeading.after}
                </h3>
                <Card className={styles.introCard}>
                  <CardContent className={styles.introCardContent}>
                    <p className={styles.introDescription}>
                      {fallback.introDescription
                        .split("\n")
                        .map((line, index, lines) => (
                          <span key={index}>
                            {line}
                            {index < lines.length - 1 ? <br /> : null}
                          </span>
                        ))}
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          <div className={styles.itemsList}>
            {items.map((item, index) => {
              const meta = itemMeta[index];
              const title = item.title
                ? parseAccentText(item.title, styles.gradientText)
                : item.fallbackTitle;

              return (
                <OnboardingItem
                  key={item.id}
                  title={title}
                  titleAlt={item.fallbackTitle}
                  descriptionHtml={item.descriptionHtml}
                  fallbackDescription={item.fallbackDescription}
                  iconSrc={meta.iconSrc}
                  hasConnector={meta.hasConnector}
                  connectorIndex={index}
                  align={meta.align}
                  highlighted={meta.highlighted}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
