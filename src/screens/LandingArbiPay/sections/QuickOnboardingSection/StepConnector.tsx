import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import clsx from "clsx";
import connectorLineAnimation from "../../../../assets/lottie/connector-line.json";
import styles from "./QuickOnboardingSection.module.scss";

type ConnectorAlign = "left" | "right";

// End point of the lottie line (280x80 viewBox, "right" variant)
const DESKTOP_DOT = { cx: 3, cy: 76.7 };

// Slows the 2.41s lottie down to ~4s; keep in sync with $connector-draw-duration in the scss
const LINE_SPEED = 1.8;

// Frame at which the trim path finishes drawing the line
// (the lottie keeps animating the gradient until frame 241)
const LINE_END_FRAME = 160;

// Delay between consecutive connectors so the lines appear
// one after another from top to bottom (~ one line draw duration)
const STAGGER_MS = 400;

type MobileGeometry = {
  path: string;
  dot: { cx: number; cy: number };
  gradient: { x1: number; y1: number; x2: number; y2: number };
};

const MOBILE_GEOMETRY: Record<ConnectorAlign, MobileGeometry> = {
  left: {
    path: "M2.5 0.5 C24 6 43 28 44 74",
    dot: { cx: 44, cy: 77 },
    gradient: { x1: 44, y1: 77.3, x2: -1.5, y2: 75.9 },
  },
  right: {
    path: "M45.5 0.5 C24 6 5 28 4 74",
    dot: { cx: 4, cy: 77 },
    gradient: { x1: 4, y1: 77.3, x2: 49.5, y2: 75.9 },
  },
};

const PulsingDot = ({ cx, cy }: { cx: number; cy: number }) => (
  <>
    <circle
      className={styles.connectorDotPulse}
      cx={cx}
      cy={cy}
      r="2.67"
      fill="#2758D4"
    />
    <circle
      className={styles.connectorDot}
      cx={cx}
      cy={cy}
      r="2.67"
      fill="#2758D4"
    />
  </>
);

const MobileConnector = ({
  align,
  className,
  style,
}: {
  align: ConnectorAlign;
  className?: string;
  style?: CSSProperties;
}) => {
  const baseId = useId().replace(/:/g, "");
  const gradientId = `${baseId}-gradient`;
  const maskId = `${baseId}-mask`;
  const { path, dot, gradient } = MOBILE_GEOMETRY[align];

  return (
    <svg
      className={className}
      style={style}
      width="48"
      height="80"
      viewBox="0 0 48 80"
      fill="none"
      overflow="visible"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="80">
        <path
          className={styles.connectorMobileMaskPath}
          d={path}
          pathLength={1}
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </mask>
      <path
        d={path}
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="6 6"
        mask={`url(#${maskId})`}
      />
      <PulsingDot cx={dot.cx} cy={dot.cy} />
      <defs>
        <linearGradient
          id={gradientId}
          x1={gradient.x1}
          y1={gradient.y1}
          x2={gradient.x2}
          y2={gradient.y2}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.629808" stopColor="#2758D4" />
          <stop offset="0.850962" stopColor="#A1C4FF" />
          <stop offset="1" stopColor="#A7D1FF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const StepConnector = ({
  align,
  index = 0,
}: {
  align: ConnectorAlign;
  index?: number;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [inView, setInView] = useState(false);
  const [lineDone, setLineDone] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const timeoutId = window.setTimeout(() => {
      lottieRef.current?.setSpeed(LINE_SPEED);
      lottieRef.current?.play();
    }, index * STAGGER_MS);

    return () => window.clearTimeout(timeoutId);
  }, [inView, index]);

  return (
    <div ref={wrapperRef} className={styles.connectorWrapper}>
      <div
        className={clsx(
          styles.connectorImage,
          styles.connectorImageDesktop,
          styles.connectorLottie,
          align === "left" && styles.connectorMirrored,
          lineDone && styles.connectorDone,
        )}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={connectorLineAnimation}
          autoplay={false}
          loop={false}
          onEnterFrame={(event) => {
            const { currentTime } = event as unknown as { currentTime: number };
            if (currentTime >= LINE_END_FRAME) {
              setLineDone(true);
            }
          }}
          onComplete={() => setLineDone(true)}
        />
        <svg
          className={styles.connectorDotOverlay}
          viewBox="0 0 280 80"
          fill="none"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <PulsingDot cx={DESKTOP_DOT.cx} cy={DESKTOP_DOT.cy} />
        </svg>
      </div>
      <MobileConnector
        align={align}
        className={clsx(
          styles.connectorImage,
          styles.connectorImageMobile,
          styles[align],
          inView && styles.connectorInView,
        )}
        style={
          {
            "--connector-delay": `${index * STAGGER_MS}ms`,
          } as CSSProperties
        }
      />
    </div>
  );
};
