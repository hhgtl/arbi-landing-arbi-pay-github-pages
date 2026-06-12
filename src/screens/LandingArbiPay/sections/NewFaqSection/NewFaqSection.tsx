import { useState } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import { AnimatedHeader } from "../../../../components/ui/animated-header";
import { useNewFaqSectionContent } from "./lib";
import styles from "./NewFaqSection.module.scss";

export const NewFaqSection = (): JSX.Element => {
  const { fallback, headingFromAdmin, items } = useNewFaqSectionContent();
  const [openId, setOpenId] = useState<string>("");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section className={styles.section}>
      <div className={styles.pageContainer}>
        <AnimatedHeader className={styles.heading}>
          {headingFromAdmin ?? fallback.heading}
        </AnimatedHeader>

        <div className={styles.list}>
          {items.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={clsx(styles.item, isOpen && styles.itemOpen)}
                onClick={() => toggle(item.id)}
                role="button"
                aria-expanded={isOpen}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(item.id);
                  }
                }}
              >
                <div className={styles.header}>
                  <span className={styles.question}>{item.question}</span>
                  <ChevronDownIcon
                    className={clsx(
                      styles.chevron,
                      isOpen && styles.chevronOpen,
                    )}
                    aria-hidden="true"
                  />
                </div>

                <div
                  className={clsx(styles.body, isOpen && styles.bodyOpen)}
                >
                  <div className={styles.bodyInner}>
                    <div className={styles.bodyContent}>
                      <div className={styles.divider} />
                      <div
                        className={styles.answer}
                        dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
