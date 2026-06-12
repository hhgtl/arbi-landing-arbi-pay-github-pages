import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { applyLinkSpansToHtml } from "../../../../lib/parseAccentText";
import arbiLogoFooter from "../../../../assets/icons/arbi-logo-footer.svg";
import { useFooterSectionContent } from "./lib";
import styles from "./FooterSection.module.scss";

const normalizeLinkLabel = (value: string): string =>
  value.trim().replace(/\.$/, "").toLowerCase();

export const FooterSection = (): JSX.Element => {
  const {
    fallback,
    informationTitle,
    documentsTitle,
    informationLinks,
    documentLinks,
    copyrightHtmlFromAdmin,
    copyrightHtml,
  } = useFooterSectionContent();

  const resolveLinkHref = (linkText: string): string => {
    const normalized = normalizeLinkLabel(linkText);
    const match = documentLinks.find(
      (link) => normalizeLinkLabel(link.label) === normalized,
    );

    return match?.href ?? "#";
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.pageContainer}>
        <Card className={styles.footerCard}>
          <CardContent className={styles.footerCardContent}>
            <div className={styles.footerLayout}>
              <section className={styles.brandSection}>
                <img
                  className={styles.brandLogo}
                  alt={fallback.aria.logoAlt}
                  src={arbiLogoFooter}
                />
                <nav
                  aria-label={fallback.nav.ariaLabel}
                  className={styles.footerNavigation}
                >
                  <section className={styles.linkGroup}>
                    <h2 className={styles.linkGroupTitle}>{informationTitle}</h2>
                    <ul className={styles.linkList}>
                      {informationLinks.map((item) => (
                        <li key={item.id} className={styles.linkListItem}>
                          <a href={item.href} className={styles.footerLinkAnchor}>
                            <Button
                              variant="link"
                              className={styles.footerLink}
                            >
                              {item.label}
                            </Button>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section className={styles.linkGroup}>
                    <h2 className={styles.linkGroupTitle}>{documentsTitle}</h2>
                    <ul className={styles.linkList}>
                      {documentLinks.map((item) => (
                        <li key={item.id} className={styles.linkListItem}>
                          <a href={item.href} className={styles.footerLinkAnchor}>
                            <Button
                              variant="link"
                              className={styles.footerLink}
                            >
                              {item.label}
                            </Button>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                </nav>
              </section>

              {copyrightHtmlFromAdmin ? (
                <div
                  className={styles.copyrightText}
                  dangerouslySetInnerHTML={{
                    __html: applyLinkSpansToHtml(
                      copyrightHtml,
                      styles.legalLink,
                      resolveLinkHref,
                    ),
                  }}
                />
              ) : (
                <p className={styles.copyrightText}>
                  <span className={styles.copyrightBold}>
                    {fallback.copyright}
                    <br />
                  </span>
                  <a href={documentLinks[0]?.href ?? "#"} className={styles.legalLinkAnchor}>
                    <Button variant="link" className={styles.legalLink}>
                      {fallback.terms}
                    </Button>
                  </a>
                  <span className={styles.copyrightBold}>
                    {fallback.conjunction}
                  </span>
                  <a href={documentLinks[1]?.href ?? "#"} className={styles.legalLinkAnchor}>
                    <Button variant="link" className={styles.legalLink}>
                      {fallback.privacy}
                    </Button>
                  </a>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
};
