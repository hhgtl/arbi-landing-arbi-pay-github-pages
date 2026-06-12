import { useState } from "react";
import TelegramIcon from "../../assets/icons/telegram-big.svg?react";
import { ContactQuestionsModal } from "../ContactQuestionsModal/ContactQuestionsModal.tsx";
import { useContactQuestionsModalContent } from "../ContactQuestionsModal/lib";
import styles from "./SupportWidget.module.scss";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import telegram from "../../assets/img/telegramLitle.webp";
import whatsApp from "../../assets/img/whatsappLitle.webp";

export type ContactModalContent = {
    title?: string;
    description?: string;
    badge?: string;
    qrImage?: string;
    telegramLabel?: string;
    telegramHref?: string;
    whatsappLabel?: string;
    whatsappHref?: string;
};

type FloatingContactWidgetProps = {
    contactModal?: ContactModalContent;
    urlPath?: string;
    theme?: "light" | "dark";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

const FLOATING_CYCLE_DURATION = 5.5;

const FLOATING_PHASE_TIMES = [0, 0.16, 0.34, 0.42, 0.52, 0.68, 0.82, 1] as const;

const floatingCycleTransition = {
    duration: FLOATING_CYCLE_DURATION,
    repeat: Infinity,
    ease: "easeInOut" as const,
    times: [...FLOATING_PHASE_TIMES],
};

const floatingBreathTransition = {
    duration: 3.2,
    repeat: Infinity,
    ease: "easeInOut" as const,
};


const TELEGRAM_ICON_SRC = "/img/icons/telegramLitle.webp";
const WHATSAPP_ICON_SRC = "/img/icons/whatsappLitle.webp";

const telegramIconKeyframes = {
    scale: [1, 1, 0.08, 0.06, 0.06, 0.06, 0.08, 1],
    rotate: [0, 0, 360, 360, 360, -240, -60, 0],
    opacity: [1, 1, 0.2, 0, 0, 0, 0.25, 1],
    x: [0, 0, 3, 0, 0, 0, 0, 0],
    y: [0, 0, 4, 0, 0, 0, 0, 0],
};

const whatsappIconKeyframes = {
    scale: [0.06, 0.06, 0.06, 0.08, 1, 1, 0.08, 0.06],
    rotate: [-240, -240, -240, -240, 0, 0, 360, 360],
    opacity: [0, 0, 0, 0.25, 1, 1, 0.2, 0],
    x: [0, 0, 0, 0, 0, 0, -3, 0],
    y: [0, 0, 0, 0, 0, 0, -4, 0],
};

const greenBackgroundKeyframes = {
    opacity: [0, 0, 0, 0.35, 1, 1, 0.35, 0],
};


export const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contactModalContent = useContactQuestionsModalContent();

  return (
    <>
      {/*<button className={styles.widgetBtn} onClick={() => setIsOpen(true)}>*/}
      {/*  <TelegramIcon />*/}
      {/*</button>*/}
        <div className={clsx(styles.floatingWidgetRoot)}>
            <motion.div
                aria-hidden="true"
                className={styles.floatingWidgetGlow}
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.5, 0.82, 0.5],
                }}
                transition={floatingBreathTransition}
            />
            <motion.button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open ARBI Exchange contact widget"
                className={styles.floatingWidgetButton}
                animate={{ scale: [1, 1.035, 1] }}
                transition={floatingBreathTransition}
                whileHover={{
                    scale: 1.06,
                    boxShadow: "0px 8px 28px rgba(26,143,212,0.55), 0px 14px 36px rgba(4,194,145,0.32), inset 0 2px 8px rgba(255,255,255,0.42)",
                }}
                whileTap={{ scale: 1.02 }}
            >
                <div
                    aria-hidden="true"
                    className={styles.floatingWidgetBlueLayer}
                />
                <motion.div
                    aria-hidden="true"
                    className={styles.floatingWidgetGreenLayer}
                    animate={greenBackgroundKeyframes}
                    transition={floatingCycleTransition}
                />
                <div className={styles.floatingWidgetIconShell}>
                    <motion.div
                        aria-hidden="true"
                        className={styles.floatingWidgetIconLayer}
                        animate={{
                            x: telegramIconKeyframes.x,
                            y: telegramIconKeyframes.y,
                        }}
                        transition={floatingCycleTransition}
                    >
                        <motion.img
                            src={telegram}
                            alt=""
                            className={styles.floatingWidgetIconImage}
                            style={{ transformOrigin: "center center" }}
                            animate={{
                                scale: telegramIconKeyframes.scale,
                                rotate: telegramIconKeyframes.rotate,
                                opacity: telegramIconKeyframes.opacity,
                            }}
                            transition={floatingCycleTransition}
                        />
                    </motion.div>
                    <motion.div
                        aria-hidden="true"
                        className={styles.floatingWidgetIconLayer}
                        animate={{
                            x: whatsappIconKeyframes.x,
                            y: whatsappIconKeyframes.y,
                        }}
                        transition={floatingCycleTransition}
                    >
                        <motion.img
                            src={whatsApp}
                            alt=""
                            className={styles.floatingWidgetIconImage}
                            style={{ transformOrigin: "center center" }}
                            animate={{
                                scale: whatsappIconKeyframes.scale,
                                rotate: whatsappIconKeyframes.rotate,
                                opacity: whatsappIconKeyframes.opacity,
                            }}
                            transition={floatingCycleTransition}
                        />
                    </motion.div>
                </div>
            </motion.button>
        </div>
      <ContactQuestionsModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        {...contactModalContent}
      />
    </>
  );
};