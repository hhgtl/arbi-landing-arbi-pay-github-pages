import clsx from "clsx";
import businessChallengesMapOverlay from "../../../../../../assets/icons/business-challenges-map-overlay.svg";
import currencyBadgeId from "../../../../../../assets/icons/currency-badge-id.svg";
import currencyBadgeMy from "../../../../../../assets/icons/currency-badge-my.svg";
import currencyBadgeRu from "../../../../../../assets/icons/currency-badge-ru.svg";
import currencyBadgeSg from "../../../../../../assets/icons/currency-badge-sg.svg";
import currencyBadgeTh from "../../../../../../assets/icons/currency-badge-th.svg";
import currencyBadgeVn from "../../../../../../assets/icons/currency-badge-vn.svg";
import flagId from "../../../../../../assets/icons/flag-id.svg";
import flagMy from "../../../../../../assets/icons/flag-my.svg";
import flagRu from "../../../../../../assets/icons/flag-ru.svg";
import flagSg from "../../../../../../assets/icons/flag-sg.svg";
import flagTh from "../../../../../../assets/icons/flag-th.svg";
import flagVn from "../../../../../../assets/icons/flag-vn.svg";
import southeastAsiaMap from "../../../../../../assets/img/hero-section-image.png";
import { Card, CardContent } from "../../../../../../components/ui/card";
import { MapFlowAnimation } from "../../MapFlowAnimation";
import styles from "./animation-map.module.scss";

const countryMeta = [
  {
    flagSrc: flagTh,
    codeIconSrc: currencyBadgeTh,
    positionClass: styles.cardThailand,
  },
  {
    flagSrc: flagId,
    codeIconSrc: currencyBadgeId,
    positionClass: styles.cardIndonesia,
  },
  {
    flagSrc: flagVn,
    codeIconSrc: currencyBadgeVn,
    positionClass: styles.cardVietnam,
  },
  {
    flagSrc: flagMy,
    codeIconSrc: currencyBadgeMy,
    positionClass: styles.cardMalaysia,
  },
  {
    flagSrc: flagSg,
    codeIconSrc: currencyBadgeSg,
    positionClass: styles.cardSingapore,
  },
];

const russiaMeta = {
  flagSrc: flagRu,
  codeIconSrc: currencyBadgeRu,
};

type AnimationMapProps = {
  mapAlt: string;
  logoAlt: string;
  regionCountries: Array<{ id: string; name: string; code: string }>;
  russiaCountry: { name: string; code: string };
};

export const AnimationMap = ({
  mapAlt,
  logoAlt,
  regionCountries,
  russiaCountry,
}: AnimationMapProps): JSX.Element => {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapStage}>
        <img
          className={styles.mapImage}
          alt={mapAlt}
          src={southeastAsiaMap}
        />

        <MapFlowAnimation />

        <img
          className={styles.arbiPayLogo}
          alt={logoAlt}
          src={businessChallengesMapOverlay}
        />

        <div className={styles.countryCardsContainer}>
          {regionCountries.map((country, index) => {
            const meta = countryMeta[index];
            return (
              <Card
                key={country.id}
                className={clsx(styles.floatingCard, meta.positionClass)}
              >
                <CardContent className={styles.floatingCardContent}>
                  <div className={styles.countryRow}>
                    <img
                      className={styles.countryFlag}
                      alt={country.name}
                      src={meta.flagSrc}
                    />
                    <span className={styles.countryName}>{country.name}</span>
                  </div>
                  <div className={styles.currencyRow}>
                    <img alt={country.code} src={meta.codeIconSrc} />
                    <span className={styles.currencyCode}>{country.code}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Card className={clsx(styles.floatingCard, styles.cardRussia)}>
          <CardContent className={styles.floatingCardContent}>
            <div className={styles.countryRow}>
              <img
                className={styles.countryFlag}
                alt={russiaCountry.name}
                src={russiaMeta.flagSrc}
              />
              <span className={styles.countryName}>{russiaCountry.name}</span>
            </div>
            <div className={styles.currencyRow}>
              <img alt={russiaCountry.code} src={russiaMeta.codeIconSrc} />
              <span className={styles.currencyCode}>{russiaCountry.code}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
