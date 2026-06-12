import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import idealCustomersSectionLogo from "../../../../assets/icons/ideal-customers-section-logo.svg";
import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { Button } from "../../../../components/ui/button";
import { parseAccentText } from "../../../../lib/parseAccentText";
import { useIdealCustomersSectionContent } from "./lib";
import styles from "./IdealCustomersSection.module.scss";

const ARBI_PAY_LOGO = idealCustomersSectionLogo;

const ACCENT_PATTERN = /\/accent\/([^/]*?)\/accent\//;

export const IdealCustomersSection = (): JSX.Element => {
  const { fallback, titleFromAdmin, cta, items } =
    useIdealCustomersSectionContent();

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
      { threshold: 0.15 },
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
        <header className={styles.header}>
          <AnimatedHeader className={styles.heading}>
            {titleFromAdmin ? (
              parseAccentText(titleFromAdmin, styles.headingHighlight)
            ) : (
              <>
                {fallback.heading.before}
                <span className={styles.headingHighlight}>
                  {fallback.heading.highlight}
                </span>
                {fallback.heading.after}
              </>
            )}
          </AnimatedHeader>

          <span className={styles.logoWrap}>
            <img
              src={ARBI_PAY_LOGO}
              alt={fallback.logoAlt}
              className={styles.logo}
            />
          </span>
        </header>

        <div ref={cardsRef} className={styles.cardsGrid}>
          {items.map((item, index) => (
            <BusinessCard
              key={item.id}
              item={item}
              inView={inView}
              revealDelayMs={index * 110}
            />
          ))}
        </div>

        <div className={styles.ctaWrap}>
          <a href={cta.href} {...ctaLinkProps}>
            <Button type="button" className={styles.submitButton}>
              {cta.label}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

interface BusinessItem {
  id: string;
  title: string | null;
  descriptionHtml: string | null;
  iconSrc: string;
  fallbackTitle: string;
  fallbackDescription: string;
}

interface BusinessCardProps {
  item: BusinessItem;
  inView: boolean;
  revealDelayMs: number;
}

const BusinessCard = ({
  item,
  inView,
  revealDelayMs,
}: BusinessCardProps): JSX.Element => {
  const displayTitle = item.title ?? item.fallbackTitle;

  return (
    <div
      className={clsx(styles.card, inView && styles.cardVisible)}
      style={
        { "--card-reveal-delay": `${revealDelayMs}ms` } as React.CSSProperties
      }
    >
      <img
        src={item.iconSrc}
        alt={displayTitle}
        className={styles.cardIcon}
      />

      <div className={styles.cardContent}>
        <div>
          <h3 className={styles.cardTitle}>
            {item.title && ACCENT_PATTERN.test(item.title)
              ? parseAccentText(item.title, styles.headingHighlight)
              : displayTitle}
          </h3>
          <div className={styles.cardTitleUnderline} />
        </div>

        {item.descriptionHtml ? (
          <div
            className={styles.cardDescription}
            dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
          />
        ) : (
          <p className={styles.cardDescription}>{item.fallbackDescription}</p>
        )}
      </div>
    </div>
  );
};
