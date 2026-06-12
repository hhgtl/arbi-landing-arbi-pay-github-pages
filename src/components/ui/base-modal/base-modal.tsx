import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./base-modal.module.scss";
import clsx from "clsx";

type BaseModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  titleId?: string;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  shellClassName?: string;
  bodyClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  closeBtnClassName?: string;
};

export function BaseModal({
  open,
  onClose,
  title,
  titleId = "app-modal-title",
  subtitle,
  children,
  footer,
  shellClassName = "",
  bodyClassName = "",
  headerClassName = "",
  titleClassName = "",
  closeBtnClassName = "",
}: BaseModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div aria-hidden="true" className={styles.backdrop} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`${styles.shell} ${shellClassName}`.trim()}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={clsx(styles.header, headerClassName)}>
          <div className={styles.headerContent}>
            <h2
              id={titleId}
              className={clsx(styles.title, titleClassName)}
            >
              {title}
            </h2>
            {subtitle ? (
              <div className={styles.subtitle}>{subtitle}</div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className={clsx(styles.closeButton, closeBtnClassName)}
          >
            <span className={styles.closeIcon}>×</span>
          </button>
        </div>

        <div className={bodyClassName || styles.bodyDefault}>{children}</div>

        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
