import { clsx } from "clsx";
import styles from "./ContactQuestionsModal.module.scss";
import { BaseModal } from "../ui/base-modal/base-modal.tsx";
import Telegram from "../../assets/icons/telegram.svg?react";
import Whatsapp from "../../assets/icons/whatsapp.svg?react";
import QrSupport from "../../assets/img/qr-support.png";

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}

type ContactQuestionsModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  badge: string;
  telegramLabel: string;
  telegramHref: string;
  whatsappLabel: string;
  whatsappHref: string;
  theme?: "light" | "dark";
};

export function ContactQuestionsModal({
  open,
  onClose,
  title,
  description,
  badge,
  telegramLabel,
  telegramHref,
  whatsappLabel,
  whatsappHref,
  theme = "light",
}: ContactQuestionsModalProps) {
  const cleanTitle = stripHtml(title);
  const cleanDescription = stripHtml(description);
  const isDarkTheme = theme === "dark";

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={cleanTitle}
      titleId="contact-modal-title"
      headerClassName={styles.modalHeader}
      titleClassName={isDarkTheme ? styles.darkTitle : undefined}
      closeBtnClassName={clsx(styles.closeButton, isDarkTheme && styles.darkCloseButton)}
      subtitle={
        <p className={clsx(styles.subtitle, isDarkTheme && styles.darkSubtitle)}>
          {cleanDescription}
        </p>
      }
      shellClassName={clsx(styles.modalShell, isDarkTheme && styles.darkModalShell)}
      bodyClassName={styles.modalBody}
    >
      <div className={styles.content}>
        <div className={styles.qrSection}>
          <div className={clsx(styles.badge, isDarkTheme && styles.darkBadge)}>
            {badge}
          </div>

          <div className={clsx(styles.qrFrame, isDarkTheme && styles.darkQrFrame)}>
            <img
              src={QrSupport}
              alt="QR code for Telegram"
              width={226}
              height={226}
              className={styles.qrImage}
            />
          </div>
        </div>

        <div className={clsx(styles.actions, isDarkTheme && styles.darkActions)}>
          <a
            href={telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.actionButton} ${styles.telegramButton}`}
          >
            <Telegram />
            {telegramLabel}
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.actionButton} ${styles.whatsappButton}`}
          >
            <Whatsapp />
            {whatsappLabel}
          </a>
        </div>
      </div>
    </BaseModal>
  );
}
