import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { Button } from "../../../../components/ui/button";
import { parseAccentText } from "../../../../lib/parseAccentText";
import { useBusinessChallengesSectionContent } from "./lib";
import styles from "./BusinessChallengesSection.module.scss";
import { AnimationMap } from "./ui/animation-map/animation-map";

export const BusinessChallengesSection = (): JSX.Element => {
  const {
    fallback,
    headlineFromAdmin,
    descriptionHtmlFromAdmin,
    primaryCta,
    secondaryCta,
    regionCountries,
    russiaCountry,
  } = useBusinessChallengesSectionContent();

  return (
    <section className={styles.section}>
      <div className={styles.backgroundGlow} />
      <div className={styles.pageContainer}>
        <header className={styles.contentHeader}>
          <AnimatedHeader as="h1" className={styles.heroHeading}>
            {headlineFromAdmin ? (
              parseAccentText(headlineFromAdmin, styles.gradientText)
            ) : (
              <>
                {fallback.heading.line1Before}
                <span className={styles.gradientText}>
                  {fallback.heading.line1Highlight}
                </span>
                <br />
                {fallback.heading.line2}
                <br />
                <span className={styles.gradientText}>
                  {fallback.heading.line3Highlight}
                </span>
              </>
            )}
          </AnimatedHeader>
          {descriptionHtmlFromAdmin ? (
            <div
              className={styles.heroDescription}
              dangerouslySetInnerHTML={{ __html: descriptionHtmlFromAdmin }}
            />
          ) : (
            <p className={styles.heroDescription}>{fallback.description}</p>
          )}
          <div className={styles.actionsRow}>
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionLink}
            >
              <Button type="button" className={styles.primaryButton}>
                {primaryCta.label}
              </Button>
            </a>
            <a href={secondaryCta.href} className={styles.actionLink}>
              <Button
                type="button"
                variant="ghost"
                className={styles.secondaryButton}
              >
                <span className={styles.secondaryButtonLabel}>
                  {secondaryCta.label}
                </span>
              </Button>
            </a>
          </div>
        </header>
        <AnimationMap
          mapAlt={fallback.aria.mapAlt}
          logoAlt={fallback.aria.logoAlt}
          regionCountries={regionCountries}
          russiaCountry={russiaCountry}
        />
      </div>
    </section>
  );
};
