import clsx from "clsx";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import mobileStep01 from "../../../../../../assets/img/quick-section/mobile-1.png";
import mobileStep02 from "../../../../../../assets/img/quick-section/mobile-2.png";
import mobileStep03 from "../../../../../../assets/img/quick-section/mobile-3.png";
import mobileStep04 from "../../../../../../assets/img/quick-section/mobile-4.png";
import { getFaqSectionLocale } from "../../FaqSection.locales";
import { useFaqSectionContent } from "../../lib";
import styles from "./mobile-step-slider.module.scss";

import "swiper/css";

type Locale = ReturnType<typeof getFaqSectionLocale>;

const SLIDE_GAP = 8;

const mobileStepImages = [
  mobileStep01,
  mobileStep02,
  mobileStep03,
  mobileStep04,
];

const stepContentByIndex = (t: Locale) => [
  <img
    key="step-1"
    className={styles.stepImage}
    alt={t.aria.step01Image}
    src={mobileStepImages[0]}
  />,
  <img
    key="step-2"
    className={styles.stepImage}
    alt={t.aria.step02Image}
    src={mobileStepImages[1]}
  />,
  <img
    key="step-3"
    className={styles.stepImage}
    alt={t.aria.step03Image}
    src={mobileStepImages[2]}
  />,
  <img
    key="step-4"
    className={styles.stepImage}
    alt={t.aria.step04Image}
    src={mobileStepImages[3]}
  />,
];

export const MobileStepSlider = (): JSX.Element => {
  const { fallback, steps } = useFaqSectionContent();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const stepContents = stepContentByIndex(fallback);

  return (
    <div className={styles.root}>
      <Swiper
        className={styles.slider}
        onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView="auto"
        spaceBetween={SLIDE_GAP}
        speed={420}
        watchOverflow
      >
        {steps.map((step, index) => (
          <SwiperSlide className={styles.slide} key={step.id}>
            <article className={styles.card}>
              <header className={styles.cardHeader}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </header>
              {stepContents[index]}
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.rightBlur} />
      <div className={styles.leftBlur} />
      <div className={styles.pagination} aria-hidden="true">
        {steps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            className={clsx(
              styles.paginationBullet,
              index === activeStep && styles.paginationBulletActive,
            )}
            onClick={() => swiperRef.current?.slideTo(index)}
            tabIndex={-1}
          />
        ))}
      </div>
    </div>
  );
};
