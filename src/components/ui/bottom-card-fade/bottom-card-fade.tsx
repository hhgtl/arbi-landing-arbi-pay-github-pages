import type { CSSProperties } from "react";

import styles from "./bottom-card-fade.module.scss";

/**
 * BottomCardFade — shared bottom fade overlay used by all expanded
 * accordion cards in the "Быстрое подключение" section.
 *
 * Figma spec (from Card 01):
 *   position: absolute
 *   width: 552px
 *   height: 60px
 *   left: calc(50% - 552px / 2)
 *   bottom: -4px
 *   background: linear-gradient(180deg, rgba(238, 246, 255, 0) 0%, #EEF6FF 77.4%)
 *   filter: blur(2px)
 *   pointer-events: none
 */
export const BottomCardFade = ({ zIndex = 2 }: { zIndex?: number }) => (
  <div
    className={styles.root}
    style={{ "--bottom-card-fade-z-index": zIndex } as CSSProperties}
    aria-hidden="true"
  />
);
