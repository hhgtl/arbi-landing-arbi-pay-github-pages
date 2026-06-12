import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { Card, CardContent } from "../../../../components/ui/card";
import { parseAccentText } from "../../../../lib/parseAccentText";
import { useSolutionCardsSectionContent } from "./lib";
import styles from "./SolutionCardsSection.module.scss";

const GreenGradient = ({ children }: { children: React.ReactNode }) => (
  <span className={styles.greenGradient}>{children}</span>
);

const renderCardTitle = (card: {
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
}) => (
  <>
    {card.titleBefore}
    {card.titleHighlight ? (
      <GreenGradient>{card.titleHighlight}</GreenGradient>
    ) : null}
    {card.titleAfter}
  </>
);

export const SolutionCardsSection = (): JSX.Element => {
  const {
    fallback,
    titleFromAdmin,
    descriptionHtmlFromAdmin,
    cta,
    cards,
  } = useSolutionCardsSectionContent();

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
      <div className={styles.pageContainer}>
        <header className={styles.contentHeader}>
          <AnimatedHeader className={styles.sectionHeading}>
            {titleFromAdmin ? (
              parseAccentText(titleFromAdmin, styles.headingGradient)
            ) : (
              <>
                {fallback.heading.line1Before}
                <span className={styles.headingGradient}>
                  {fallback.heading.line1Highlight}
                </span>
                <br />
                {fallback.heading.line2}
                <br />
                <span className={styles.headingGradient}>
                  {fallback.heading.line3Highlight}
                </span>
              </>
            )}
          </AnimatedHeader>

          {descriptionHtmlFromAdmin ? (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: descriptionHtmlFromAdmin }}
            />
          ) : (
            <p className={styles.description}>{fallback.description}</p>
          )}

          <a
            href={cta.href}
            {...ctaLinkProps}
            className={styles.ctaLink}
          >
            <button type="button" className={styles.ctaButton}>
              {cta.label}
            </button>
          </a>
        </header>

        <div ref={cardsRef} className={styles.cardsWrapper}>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              className={clsx(
                styles.solutionCard,
                inView && styles.solutionCardVisible,
                // card.elevated && styles.solutionCardElevated,
              )}
              style={{ "--card-reveal-delay": `${index * 120}ms` } as React.CSSProperties}
            >
              <CardContent className={styles.cardContent}>
                <div className={styles.cardTopRow}>
                  <img
                    className={styles.cardIllustration}
                    alt=""
                    src={card.illustration}
                  />

                  <div className={styles.cardTextBlock}>
                    <h3 className={styles.cardTitle}>
                      {card.title
                        ? parseAccentText(card.title, styles.greenGradient)
                        : renderCardTitle(card.fallbackTitleParts)}
                    </h3>

                    <div className={styles.divider} />

                    {card.descriptionHtml ? (
                      <div
                        className={styles.cardDescription}
                        dangerouslySetInnerHTML={{
                          __html: card.descriptionHtml,
                        }}
                      />
                    ) : (
                      <p className={styles.cardDescription}>
                        {card.fallbackDescription}
                      </p>
                    )}
                  </div>
                </div>

                <div className={styles.badgeRow}>
                  <div className={styles.badgeIcon}>
                    <svg
                      width="12"
                      height="9"
                      viewBox="0 0 12 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 4L4.5 7.5L11 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className={styles.badgeLabel}>{card.badgeLabel}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
