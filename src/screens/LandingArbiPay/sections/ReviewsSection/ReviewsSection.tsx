import s from "./ReviewsSection.module.scss";
import clsx from "clsx";
import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { useRef, useState } from "react";
import { ReviewsCard } from "./ui/reviews-card/reviews-card.tsx";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { getReviewsSectionLocale } from "./ReviewsSection.locales";
import "swiper/css";
import { useGetGoogleReviews } from "../../../../lib/useGetGoogleReviews.ts";

const MARQUEE_SPEED = 6000;
const MANUAL_SLIDE_SPEED = 500;

export const ReviewsSection = () => {
  const { language } = useLanguage();
  const t = getReviewsSectionLocale(language);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeReview, setActiveReview] = useState(0);
  const { data: reviewsData } = useGetGoogleReviews();
  const displayReviews = reviewsData?.length
    ? reviewsData.map((review) => ({
        id: review.id,
        name: review.authorName,
        company: review.source,
        date: review.relativeTimeDescription,
        text: review.text,
        reviewUrl: review.reviewUrl,
        authorPhotoUrl: review.authorPhotoUrl,
      }))
    : t.items.map((review) => ({
        ...review,
        reviewUrl: "",
        authorPhotoUrl: "",
      }));

  const isHoveredRef = useRef(false);

  // pauseOnMouseEnter doesn't freeze an in-flight transition when delay is 0
  // (the running CSS transition finishes first), so we freeze it manually.
  const pauseMarquee = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    isHoveredRef.current = true;
    swiper.autoplay.stop();
    swiper.setTranslate(swiper.getTranslate());
    swiper.setTransition(0);
    // The interrupted transition never fires `transitionend`, so this flag
    // would stay true and block the next slideNext() in loop mode.
    swiper.animating = false;
  };

  // Restarting autoplay straight from a position between snap points makes
  // slideNext() run loopFix(), which visibly jumps the slides. Instead we
  // first finish the interrupted transition at marquee velocity and hand
  // off to autoplay only once the slider is aligned to a snap point.
  const resumeMarquee = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    isHoveredRef.current = false;
    const currentTranslate = swiper.getTranslate();
    const targetTranslate = -swiper.snapGrid[swiper.snapIndex];
    const distance = Math.abs(targetTranslate - currentTranslate);
    if (distance < 1) {
      swiper.autoplay.start();
      return;
    }
    const step =
      Math.abs(
        swiper.snapGrid[swiper.snapIndex] -
          swiper.snapGrid[Math.max(swiper.snapIndex - 1, 0)],
      ) || distance;
    const catchUpSpeed = Math.max((distance / step) * MARQUEE_SPEED, 100);
    swiper.once("transitionEnd", () => {
      if (!isHoveredRef.current) swiper.autoplay.start();
    });
    swiper.slideTo(swiper.activeIndex, catchUpSpeed);
  };

  return (
    <section className={s.section}>
      <div className={s.pageContainer}>
        <div className={s.header}>
          <AnimatedHeader className={s.titleWrapper}>
            <span className={s.titleSpan}>{t.heading.before}</span>
            {t.heading.middle}
            <span className={s.titleSpan}>{t.heading.after}</span>
          </AnimatedHeader>

          {/*<div className={s.navigation}>*/}
          {/*  <button*/}
          {/*    className={`${s.sliderButton} ${s.sliderButtonPrev}`}*/}
          {/*    type="button"*/}
          {/*    aria-label={t.aria.prev}*/}
          {/*    onClick={() => swiperRef.current?.slidePrev(MANUAL_SLIDE_SPEED)}*/}
          {/*  />*/}
          {/*  <button*/}
          {/*    className={`${s.sliderButton} ${s.sliderButtonNext}`}*/}
          {/*    type="button"*/}
          {/*    aria-label={t.aria.next}*/}
          {/*    onClick={() => swiperRef.current?.slideNext(MANUAL_SLIDE_SPEED)}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>

        <div
          className={s.sliderWrapper}
          onMouseEnter={pauseMarquee}
          onMouseLeave={resumeMarquee}
        >
          <Swiper
            className={s.slider}
            modules={[Autoplay]}
            loop
            loopPreventsSliding={false}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper) => setActiveReview(swiper.realIndex)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={16}
            speed={MARQUEE_SPEED}
            slidesPerView="auto"
            watchOverflow
            breakpoints={{
              768: {
                spaceBetween: 32,
              },
            }}
          >
            {displayReviews.map((review) => (
              <SwiperSlide className={s.slide} key={review.id}>
                <ReviewsCard
                  name={review.name}
                  company={review.company}
                  date={review.date}
                  text={review.text}
                  reviewUrl={review.reviewUrl}
                  authorPhotoUrl={review.authorPhotoUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={s.rightBlur} />
          <div className={s.leftBlur} />
          <div className={s.pagination} aria-hidden="true">
            {displayReviews.map((review, index) => (
              <button
                key={review.id}
                type="button"
                className={clsx(
                  s.paginationBullet,
                  index === activeReview && s.paginationBulletActive,
                )}
                onClick={() =>
                  swiperRef.current?.slideToLoop(index, MANUAL_SLIDE_SPEED)
                }
                tabIndex={-1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
