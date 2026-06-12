import trustAutomationIcon from "../../../../assets/icons/trust-automation-icon.svg";
import trustConnector from "../../../../assets/icons/trust-connector.svg";
import trustConnectorHighlighted from "../../../../assets/icons/trust-connector-highlighted.svg";
import trustMarketIcon from "../../../../assets/icons/trust-market-icon.svg";
import trustOnboardingIcon from "../../../../assets/icons/trust-onboarding-icon.svg";
import trustSupportIcon from "../../../../assets/icons/trust-support-icon.svg";
import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { getWhyTrustUsSectionLocale } from "./WhyTrustUsSection.locales";
import styles from "./WhyTrustUsSection.module.scss";

const trustItemMeta = [
  {
    iconSrc: trustMarketIcon,
    left: 840,
    top: 124,
    width: 520,
  },
  {
    iconSrc: trustOnboardingIcon,
    left: 310,
    top: 248,
    width: 506,
  },
  {
    iconSrc: trustAutomationIcon,
    left: 840,
    top: 372,
    width: 520,
    highlighted: true,
  },
  {
    iconSrc: trustSupportIcon,
    left: 310,
    top: 516,
    width: 506,
  },
];

const connectors = [
  {
    src: trustConnector,
    left: 536,
    top: 188,
    width: 280,
    height: 80,
  },
  {
    src: trustConnectorHighlighted,
    left: 836,
    top: 308,
    width: 280,
    height: 80,
  },
  {
    src: trustConnector,
    left: 536,
    top: 452,
    width: 280,
    height: 80,
  },
];

export const WhyTrustUsSection = (): JSX.Element => {
  const { language } = useLanguage();
  const t = getWhyTrustUsSectionLocale(language);

  return (
    <section className={styles.section}>
      <div
        className={styles.canvas}
        style={{ width: "1440px", height: "600px", overflow: "visible" }}
      >
        <AnimatedHeader
          style={{
            position: "absolute",
            left: 80,
            top: 0,
            width: 420,
            height: 44,
            margin: 0,
            padding: 0,
            fontFamily: "Manrope, Helvetica",
            fontWeight: 600,
            fontSize: 40,
            lineHeight: "110%",
            letterSpacing: "-1px",
            color: "#07041E",
            whiteSpace: "nowrap",
          }}
        >
          {t.heading.before}
          <span style={{ color: "#537CE3" }}>{t.heading.highlight}</span>
        </AnimatedHeader>

        <p
          style={{
            position: "absolute",
            left: 80,
            top: 68,
            width: 405,
            margin: 0,
            padding: 0,
            fontFamily: "Manrope, Helvetica",
            fontWeight: 700,
            fontSize: 20,
            lineHeight: "110%",
            letterSpacing: "-1px",
            color: "#07041E",
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #2758D4 0%, #5AA0EC 33.65%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.intro.brand}
          </span>
          {t.intro.lines.map((line, index) => (
            <span key={index}>
              {line}
              {index < t.intro.lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>

        {connectors.map((c, i) => (
          <div
            key={`connector-${i}`}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: c.left,
              top: c.top - 20,
              width: c.width,
              height: c.height,
              pointerEvents: "none",
            }}
          >
            <img
              src={c.src}
              alt=""
              style={{ width: "100%", height: "100%", display: "block" }}
            />
          </div>
        ))}

        {t.items.map((item, index) => {
          const meta = trustItemMeta[index];
          return (
            <div
              key={item.id}
              style={{
                position: "absolute",
                left: meta.left,
                top: meta.top,
                width: meta.width,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              {meta.highlighted ? (
                <div
                  style={{
                    width: 72,
                    height: 72,
                    padding: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(137.23deg, rgba(223, 238, 255, 0.2) 16.43%, rgba(79, 151, 229, 0.2) 85.29%)",
                    borderRadius: 50,
                    boxSizing: "border-box",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={meta.iconSrc}
                    alt=""
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              ) : (
                <img
                  src={meta.iconSrc}
                  alt=""
                  style={{
                    width: 72,
                    height: 72,
                    objectFit: "contain",
                    flexShrink: 0,
                    display: "block",
                  }}
                />
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      padding: 0,
                      fontFamily: "Manrope, Helvetica",
                      fontWeight: 700,
                      fontSize: 22,
                      lineHeight: "110%",
                      color: "#07041E",
                    }}
                  >
                    {item.title}
                  </h3>
                  <div
                    style={{
                      width: 32,
                      borderTop: "2px solid #A7D1FF",
                      marginTop: 8,
                    }}
                  />
                </div>

                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    fontFamily: "Manrope, Helvetica",
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: "140%",
                    color: "#3F4A68",
                    maxWidth: meta.width - 72 - 12,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
