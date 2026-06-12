import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { Button } from "../../../../components/ui/button";
import { parseAccentText } from "../../../../lib/parseAccentText";
import styles from "./FaqSection.module.scss";
import { useFaqSectionContent } from "./lib";
import { DesktopStepSlider } from "./ui/desktop-step-slider";
import { MobileStepSlider } from "./ui/mobile-step-slider";

export const FaqSection = (): JSX.Element => {
  const { fallback, titleFromAdmin, sidebarHtmlFromAdmin, cta } =
    useFaqSectionContent();

  const ctaLinkProps =
    cta.target === "_blank"
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : { target: cta.target };

  return (
    <section className={styles.section}>
      <div className={styles.pageContainer}>
        <div className={styles.panel}>
          <header className={styles.panelHeader}>
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
          </header>
          <div className={styles.contentLayout}>
            <div className={styles.mobileSliderOnly}>
              <MobileStepSlider />
            </div>
            <div className={styles.desktopSliderOnly}>
              <DesktopStepSlider />
            </div>
            <aside className={styles.sidebar}>
              {sidebarHtmlFromAdmin ? (
                <div
                  className={styles.sidebarText}
                  dangerouslySetInnerHTML={{ __html: sidebarHtmlFromAdmin }}
                />
              ) : (
                <p className={styles.sidebarText}>{fallback.sidebarText}</p>
              )}
              <a href={cta.href} {...ctaLinkProps} className={styles.ctaLink}>
                <Button type="button" className={styles.ctaButton}>
                  {cta.label}
                </Button>
              </a>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};
