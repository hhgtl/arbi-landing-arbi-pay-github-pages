import desktopStep01 from "../../../../../../assets/img/quick-section/desktop-1.png";
import desktopStep02 from "../../../../../../assets/img/quick-section/desktop-2.png";
import desktopStep03 from "../../../../../../assets/img/quick-section/desktop-3.png";
import desktopStep04 from "../../../../../../assets/img/quick-section/desktop-4.png";
import clsx from "clsx";
import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { BottomCardFade } from "../../../../../../components/ui/bottom-card-fade";
import { getFaqSectionLocale } from "../../FaqSection.locales";
import { useFaqSectionContent } from "../../lib";
import styles from "./desktop-step-slider.module.scss";

type Locale = ReturnType<typeof getFaqSectionLocale>;

type SceneSize = {
  width: number;
  height: number;
};

const sceneSizes: SceneSize[] = [
  { width: 374, height: 194 },
  { width: 374, height: 181 },
  { width: 372, height: 203 },
  { width: 374, height: 197 },
];

const desktopStepImages = [
  desktopStep01,
  desktopStep02,
  desktopStep03,
  desktopStep04,
];

const stepImageAlts = (t: Locale) => [
  t.aria.step01Image,
  t.aria.step02Image,
  t.aria.step03Image,
  t.aria.step04Image,
];

const getSceneScale = (availableSize: SceneSize, sceneSize: SceneSize) => {
  if (!availableSize.width || !availableSize.height) {
    return 1;
  }

  return Math.min(
    availableSize.width / sceneSize.width,
    availableSize.height / sceneSize.height,
    1,
  );
};

const useElementSize = <T extends HTMLElement>(watchKey: unknown) => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<SceneSize>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      setSize((prevSize) => {
        if (prevSize.width === width && prevSize.height === height) {
          return prevSize;
        }

        return { width, height };
      });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [watchKey]);

  return { ref, size };
};

interface FixedSceneProps {
  children: ReactNode;
  scale: number;
  size: SceneSize;
}

const FixedScene = ({ children, scale, size }: FixedSceneProps) => {
  const innerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const element = innerRef.current;

    if (!element) {
      return;
    }

    element.style.setProperty("--scene-height", `${size.height}px`);
    element.style.setProperty("--scene-scale", String(scale));
    element.style.setProperty("--scene-width", `${size.width}px`);
  }, [scale, size.height, size.width]);

  return (
    <div className={styles.fixedScene}>
      <div ref={innerRef} className={styles.fixedSceneInner}>
        {children}
      </div>
      <BottomCardFade zIndex={20} />
    </div>
  );
};

interface StepContentProps {
  index: number;
  scale: number;
  t: Locale;
}

const StepContent = ({ index, scale, t }: StepContentProps) => (
  <FixedScene scale={scale} size={sceneSizes[index]}>
    <img
      className={styles.stepImage}
      alt={stepImageAlts(t)[index]}
      src={desktopStepImages[index]}
    />
  </FixedScene>
);

const stepContentByIndex = (t: Locale, sceneScale: number) =>
  sceneSizes.map((_, index) => (
    <StepContent key={`step-${index + 1}`} index={index} scale={sceneScale} t={t} />
  ));

export const DesktopStepSlider = (): JSX.Element => {
  const { fallback, steps } = useFaqSectionContent();
  const [activeStep, setActiveStep] = useState(0);
  const { ref: activeContentRef, size: activeContentSize } =
    useElementSize<HTMLDivElement>(activeStep);
  const sceneScale = useMemo(
    () => getSceneScale(activeContentSize, sceneSizes[activeStep]),
    [activeContentSize, activeStep],
  );
  const stepContents = stepContentByIndex(fallback, sceneScale);

  return (
    <div
      className={styles.stepsList}
      role="tablist"
      aria-label={fallback.aria.tablist}
    >
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const useFigmaCardLayout = index === 1 || index === 2 || index === 3;

        return (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`${fallback.aria.stepLabel} ${step.number} ${step.title}`}
            onClick={() => setActiveStep(index)}
            className={clsx(
              styles.glassCard,
              isActive ? styles.stepTabActive : styles.stepTabInactive,
            )}
          >
            <div
              aria-hidden={isActive}
              className={clsx(
                styles.collapsedState,
                isActive && styles.collapsedStateHidden,
              )}
            >
              <span className={styles.stepNumber}>{step.number}</span>
            </div>

            <div
              aria-hidden={!isActive}
              className={clsx(
                styles.expandedState,
                isActive && styles.expandedStateVisible,
                useFigmaCardLayout
                  ? styles.expandedStateFigma
                  : styles.expandedStateDefault,
              )}
            >
              <div
                className={
                  useFigmaCardLayout ? styles.figmaTitleRow : styles.titleRow
                }
              >
                <span className={styles.stepNumber}>{step.number}</span>
                <h3
                  className={
                    useFigmaCardLayout ? styles.figmaStepTitle : styles.stepTitle
                  }
                >
                  {step.title}
                </h3>
              </div>

              <div
                ref={isActive ? activeContentRef : undefined}
                className={styles.contentArea}
              >
                {stepContents[index]}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
