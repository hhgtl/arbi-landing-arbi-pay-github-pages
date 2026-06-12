import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { parseAccentText } from "../../../../lib/parseAccentText";
import { useProfitStepsSectionContent } from "./lib";
import styles from "./ProfitStepsSection.module.scss";

const badgePositionClass = {
  first: styles.badgePositionFirst,
  second: styles.badgePositionSecond,
  default: styles.badgePositionDefault,
};

export const ProfitStepsSection = (): JSX.Element => {
  const { fallback, titleFromAdmin, cta, steps } =
    useProfitStepsSectionContent();

  const cardsRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = cardsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const ctaLinkProps =
    cta.target === "_blank"
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : {};

  return (
    <section className={styles.section}>
      <div className={styles.headingWrapper}>
        <AnimatedHeader className={styles.heading}>
          {titleFromAdmin ? (
            parseAccentText(titleFromAdmin, styles.headingHighlight)
          ) : (
            <>
              {fallback.heading.before}
              <span className={styles.headingHighlight}>
                {fallback.heading.highlight1}
              </span>
              {fallback.heading.middle}
              <span className={styles.headingHighlight}>
                {fallback.heading.highlight2}
              </span>
            </>
          )}
        </AnimatedHeader>
      </div>

      <div className={styles.cardsContainer}>
        <div ref={cardsRef} className={styles.cardsRow}>
          {steps.map((step, index) => (
            <article
              key={step.id}
              className={clsx(
                styles.stepArticle,
                inView && styles.stepArticleVisible,
              )}
              style={
                { "--step-reveal-delay": `${index * 140}ms` } as React.CSSProperties
              }
            >
              <div
                className={`${badgePositionClass[step.badgePosition]} ${styles.stepBadge}`}
              >
                <span className={styles.stepBadgeNumber}>{step.number}</span>
              </div>

              <Card className={styles.stepCard}>
                <CardContent className={styles.stepCardContent}>
                  <div className={styles.stepImageWrapper}>
                    <img
                      src={step.phoneImage}
                      alt={step.title ?? step.fallbackTitle}
                      className={styles.stepImage}
                    />

                    <div className={styles.stepImageFade} />
                  </div>

                  <div className={styles.stepTextWrapper}>
                    <h3 className={styles.stepTitle}>
                      {step.title ?? step.fallbackTitle}
                    </h3>
                    {step.descriptionHtml ? (
                      <div
                        className={styles.stepDescription}
                        dangerouslySetInnerHTML={{
                          __html: step.descriptionHtml,
                        }}
                      />
                    ) : (
                      <p className={styles.stepDescription}>
                        {step.fallbackDescription}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.ctaWrapper}>
        <a href={cta.href} {...ctaLinkProps}>
          <Button type="button" className={styles.submitButton}>
            {cta.label}
          </Button>
        </a>
      </div>
    </section>
  );
};
