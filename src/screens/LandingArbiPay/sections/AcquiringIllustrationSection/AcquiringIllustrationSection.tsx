import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { Button } from "../../../../components/ui/button";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { getAcquiringIllustrationSectionLocale } from "./AcquiringIllustrationSection.locales";
import styles from "./AcquiringIllustrationSection.module.scss";

export const AcquiringIllustrationSection = (): JSX.Element => {
  const { language } = useLanguage();
  const t = getAcquiringIllustrationSectionLocale(language);

  return (
    <section className={styles.section}>
      <div className={styles.pageContainer}>
        <AnimatedHeader className={styles.sectionHeading}>
          {t.heading.before}
          <span className={styles.gradientText}>{t.heading.highlight}</span>
        </AnimatedHeader>
        <div className={styles.contentBlock}>
          <Accordion type="single" collapsible className={styles.accordion}>
            {t.items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className={styles.accordionItem}
              >
                <AccordionTrigger className={styles.accordionTrigger}>
                  <span className={styles.questionText}>{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className={styles.accordionContent} />
              </AccordionItem>
            ))}
          </Accordion>
          <div className={styles.ctaWrapper}>
            <a
              href="https://arbipay.online/onboarding/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="button" className={styles.ctaButton}>
                {t.cta}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
