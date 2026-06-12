import React from "react";
import styles from "./MapFlowAnimation.module.scss";

/**
 * SVG overlay — animated payment-flow dashed routes.
 *
 * ViewBox: 756 × 520  (matches the map container)
 *
 * Same visual language as the QuickOnboarding step connector:
 * a dashed line (6/6, gradient #2758D4 → #A1C4FF) flies towards each card.
 * The line is revealed through a travelling mask window, so its tail
 * progressively disappears as the head approaches the card. On arrival a
 * dot pops in, pulses once and fades away. Everything loops.
 *
 * Cards lie on the isometric plane of the map illustration
 * (transform: matrix(0.76, 0.18, -0.57, 0.53), origin top-left), so a
 * 122×70 card spans edge vectors H≈(93,22) and V≈(-40,37) from its
 * left/top anchor.
 *
 * Anchors (px, stage coords):
 *   Russia   card: anchor (95,170)  → right-mid  (168,211)
 *   ArbiPay  card: anchor (279,223) → left-mid (258,242), right-mid (350,264),
 *                  bottom-right corner (329,284), bottom-left corner (237,262)
 *   Thailand  card: anchor (573,117) → left-mid (553,136)
 *   Vietnam   card: anchor (557,196) → left-mid (537,215)
 *   Malaysia  card: anchor (529,274) → left-mid (509,293)
 *   Singapore card: anchor (419,331) → left-mid (399,350)
 *   Indonesia card: anchor (299,387) → left-mid (279,406)
 *
 * Outgoing paths start just outside the ArbiPay card edges so they never
 * appear to originate from under the card; they end exactly at each
 * destination card's left-mid edge point, so the line visibly "lands"
 * on the start of the card.
 */

interface Route {
  id: string;
  d: string;
  length: number;
  /** path start (origin card edge) */
  sx: number;
  sy: number;
  /** path end (destination card edge) */
  ex: number;
  ey: number;
  /** arrival dot/ring — defaults to path end, can sit slightly on the card */
  dotX?: number;
  dotY?: number;
  loopDur: number;
  travelDur: number;
  delay: number;
}

const STROKE = 1.5;
const DASH = "6 6";
const DOT_R = 3;
const COLOR = "#2758D4";
const COLOR_LIGHT = "#A1C4FF";


//    dotX: 266,
//     dotY: 245,


const routes: Route[] = [
  // ── Russia → ArbiPay ────────────────────────────────────────────────
  // Gentle curve from Russia right-mid to ArbiPay left edge
  {
    id: "russia",
    d: "M 168,211 C 197,220 229,232 258,242",
    length: 98,
    sx: 168,
    sy: 211,
    ex: 258,
    ey: 242,
    dotX: 262,
    dotY: 244,
    loopDur: 6,
    travelDur: 1.0,
    delay: 0,
  },

  // ── ArbiPay → Thailand THB (top-right, upward arc) ───────────────────
  {
    id: "thailand",
    d: "M 360,252 C 422,199 499,158 553,136",
    length: 240,
    sx: 360,
    sy: 252,
    ex: 553,
    ey: 136,
    loopDur: 7,
    travelDur: 2.4,
    delay: 1.3,
  },

  // ── ArbiPay → Vietnam VND (right, gentle upward diagonal) ────────────
  {
    id: "vietnam",
    d: "M 358,262 C 417,244 484,224 537,215",
    length: 194,
    sx: 358,
    sy: 262,
    ex: 537,
    ey: 215,
    loopDur: 7,
    travelDur: 2.2,
    delay: 1.65,
  },

  // ── ArbiPay → Malaysia MYR (right, almost flat) ──────────────────────
  {
    id: "malaysia",
    d: "M 356,270 C 407,277 462,285 509,293",
    length: 158,
    sx: 356,
    sy: 270,
    ex: 509,
    ey: 293,
    loopDur: 7,
    travelDur: 2.0,
    delay: 2.0,
  },

  // ── ArbiPay → Singapore SGD (down-right from bottom corner) ──────────
  {
    id: "singapore",
    d: "M 335,290 C 357,311 379,332 399,350",
    length: 92,
    sx: 335,
    sy: 290,
    ex: 399,
    ey: 350,
    loopDur: 7,
    travelDur: 1.6,
    delay: 2.35,
  },

  // ── ArbiPay → Indonesia IDR (sweeps down-left below the card) ────────
  {
    id: "indonesia",
    d: "M 270,280 C 239,321 246,379 279,406",
    length: 143,
    sx: 270,
    sy: 280,
    ex: 279,
    ey: 406,
    loopDur: 7,
    travelDur: 2.1,
    delay: 2.7,
  },
];

/** length of the visible "comet" window revealed by the mask */
const windowFor = (length: number): number =>
  Math.min(Math.round(length * 0.6), 110);

function buildCSS(): string {
  return routes
    .map((r) => {
      const w = windowFor(r.length);
      // tail keeps the same speed while it collapses into the card
      const collapseDur = (r.travelDur * w) / r.length;
      const p = (t: number) => ((t / r.loopDur) * 100).toFixed(2);

      const pBeforeArrive = p(Math.max(r.travelDur - 0.05, 0));
      const pArrive = p(r.travelDur);
      const pCollapsed = p(r.travelDur + collapseDur);
      const pRingEnd = p(r.travelDur + 0.8);
      const pDotHold = p(r.travelDur + 0.7);
      const pDotGone = p(r.travelDur + 1.1);

      return `
        @keyframes flow-window-${r.id} {
          0%                 { stroke-dashoffset: ${w}; animation-timing-function: ease-in-out; }
          ${pArrive}%        { stroke-dashoffset: ${-(r.length - w)}; animation-timing-function: ease-out; }
          ${pCollapsed}%, 100% { stroke-dashoffset: ${-r.length}; }
        }
        @keyframes flow-dot-${r.id} {
          0%, ${pBeforeArrive}% { opacity: 0; }
          ${pArrive}%           { opacity: 1; }
          ${pDotHold}%          { opacity: 1; }
          ${pDotGone}%, 100%    { opacity: 0; }
        }
        @keyframes flow-ring-${r.id} {
          0%, ${pBeforeArrive}% { opacity: 0;   transform: scale(1); }
          ${pArrive}%           { opacity: 0.7; transform: scale(1); }
          ${pRingEnd}%, 100%    { opacity: 0;   transform: scale(2.8); }
        }
      `;
    })
    .join("\n");
}

export const MapFlowAnimation = (): JSX.Element => {
  const css = buildCSS();

  return (
    <>
      <svg
        className={styles.overlay}
        viewBox="0 0 756 520"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <style>{css}</style>

        <defs>
          {routes.map((r) => (
            <linearGradient
              key={r.id}
              id={`flow-grad-${r.id}`}
              x1={r.ex}
              y1={r.ey}
              x2={r.sx}
              y2={r.sy}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor={COLOR} />
              <stop offset="0.85" stopColor={COLOR_LIGHT} />
              <stop offset="1" stopColor={COLOR_LIGHT} stopOpacity="0.55" />
            </linearGradient>
          ))}
        </defs>

        {routes.map((r) => {
          const w = windowFor(r.length);

          return (
            <React.Fragment key={r.id}>
              {/* travelling mask window: head flies to the card, tail vanishes */}
              <mask id={`flow-mask-${r.id}`} maskUnits="userSpaceOnUse">
                <path
                  d={r.d}
                  stroke="#fff"
                  strokeWidth={STROKE + 5}
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${w} ${r.length + w}`}
                  strokeDashoffset={w}
                  style={{
                    animation: `flow-window-${r.id} ${r.loopDur}s linear ${r.delay}s infinite`,
                  }}
                />
              </mask>

              {/* dashed connector-style line, revealed by the mask */}
              <path
                d={r.d}
                stroke={`url(#flow-grad-${r.id})`}
                strokeWidth={STROKE}
                strokeDasharray={DASH}
                strokeLinecap="round"
                fill="none"
                mask={`url(#flow-mask-${r.id})`}
              />
            </React.Fragment>
          );
        })}
      </svg>

      {/* dots/rings in a separate overlay above the cards (SVG ignores z-index
          on inner elements, so they need their own stacked <svg>) */}
      <svg
        className={`${styles.overlay} ${styles.dotsOverlay}`}
        viewBox="0 0 756 520"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {routes.map((r) => {
          const dotX = r.dotX ?? r.ex;
          const dotY = r.dotY ?? r.ey;

          return (
          <React.Fragment key={r.id}>
            {/* single pulse ring on arrival */}
            <circle
              cx={dotX}
              cy={dotY}
              r={DOT_R}
              fill={COLOR}
              opacity="0"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: `flow-ring-${r.id} ${r.loopDur}s ease-out ${r.delay}s infinite`,
              }}
            />

            {/* arrival dot: appears with the pulse, then fades away */}
            <circle
              cx={dotX}
              cy={dotY}
              r={DOT_R}
              fill={COLOR}
              opacity="0"
              style={{
                animation: `flow-dot-${r.id} ${r.loopDur}s ease-out ${r.delay}s infinite`,
              }}
            />
          </React.Fragment>
          );
        })}
      </svg>
    </>
  );
};
