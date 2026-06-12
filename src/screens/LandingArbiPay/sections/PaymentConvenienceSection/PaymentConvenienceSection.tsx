import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { parseAccentText } from "../../../../lib/parseAccentText";
import { usePaymentConvenienceSectionContent } from "./lib";
import styles from "./PaymentConvenienceSection.module.scss";

export const PaymentConvenienceSection = (): JSX.Element => {
  const { fallback, titleFromAdmin, cards } =
    usePaymentConvenienceSectionContent();

  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
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

  return (
    <section className={styles.section}>
      <div className={styles.pageContainer}>
        <header className={styles.sectionHeader}>
          <AnimatedHeader className={styles.sectionHeading}>
            {titleFromAdmin ? (
              parseAccentText(titleFromAdmin, styles.gradientText)
            ) : (
              <>
                {fallback.heading.line1}
                <br />
                <span className={styles.gradientText}>
                  {fallback.heading.line2Highlight}
                </span>
              </>
            )}
          </AnimatedHeader>
        </header>

        <div ref={gridRef} className={styles.cardsGrid}>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              className={clsx(
                styles.featureCard,
                inView && styles.featureCardVisible,
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
                        ? parseAccentText(card.title, styles.gradientText)
                        : card.fallbackTitleParts.map((part, i) =>
                            part.text === "\n" ? (
                              <br key={i} />
                            ) : part.blue ? (
                              <span key={i} className={styles.gradientText}>
                                {part.text}
                              </span>
                            ) : (
                              <span key={i}>{part.text}</span>
                            ),
                          )}
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
                  <Badge className={styles.categoryBadge}>
                    <span className={styles.badgeContent}>
                      <img
                        className={styles.badgeIcon}
                        alt=""
                        src={card.badgeIcon}
                      />
                      <span className={styles.badgeLabel}>
                        {card.badgeLabel}
                      </span>
                    </span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
