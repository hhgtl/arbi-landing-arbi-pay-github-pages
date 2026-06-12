import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import styles from "./LanguageSelector.module.scss";

export interface LanguageSelectorProps {
  languages?: string[];
  defaultLanguage?: string;
  value?: string;
  onChange?: (language: string) => void;
  className?: string;
}

type DropdownState = "closed" | "opening" | "open" | "closing";

const DEFAULT_LANGUAGES = ["RU", "ENG", "TH"];

export const LanguageSelector = ({
  languages = DEFAULT_LANGUAGES,
  defaultLanguage = "RU",
  value,
  onChange,
  className,
}: LanguageSelectorProps): JSX.Element => {
  const [internalSelected, setInternalSelected] = useState(defaultLanguage);
  const selected = value ?? internalSelected;

  const [dropdownState, setDropdownState] = useState<DropdownState>("closed");
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = dropdownState === "open" || dropdownState === "opening";

  const openDropdown = () => {
    setDropdownState("opening");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDropdownState("open"));
    });
  };

  const closeDropdown = () => {
    setDropdownState("closing");
    const el =
      containerRef.current?.querySelector<HTMLElement>("[data-dropdown]");
    const onEnd = () => {
      setDropdownState("closed");
      el?.removeEventListener("transitionend", onEnd);
    };
    el?.addEventListener("transitionend", onEnd);
    setTimeout(() => setDropdownState("closed"), 220);
  };

  const toggle = () => (isOpen ? closeDropdown() : openDropdown());

  const handleSelect = (lang: string) => {
    if (!value) setInternalSelected(lang);
    onChange?.(lang);
    closeDropdown();
  };

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) closeDropdown();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const triggerIsActive = isOpen || dropdownState === "closing";

  return (
    <div ref={containerRef} className={clsx(styles.container, className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={clsx(
          styles.trigger,
          triggerIsActive || isHovered
            ? styles.triggerActive
            : styles.triggerDefault,
        )}
      >
        {selected}
      </button>

      <div
        data-dropdown
        role="listbox"
        aria-label="Select language"
        className={clsx(
          styles.dropdown,
          dropdownState === "open"
            ? styles.dropdownOpen
            : styles.dropdownClosed,
        )}
      >
        <div className={styles.optionsList}>
          {languages.map((lang) => {
            const isSelected = selected === lang;
            return (
              <LanguageOption
                key={lang}
                lang={lang}
                isSelected={isSelected}
                onSelect={handleSelect}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface LanguageOptionProps {
  lang: string;
  isSelected: boolean;
  onSelect: (lang: string) => void;
}

const LanguageOption = ({
  lang,
  isSelected,
  onSelect,
}: LanguageOptionProps): JSX.Element => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(lang)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        styles.option,
        isSelected && styles.optionSelected,
        !isSelected && hovered && styles.optionHovered,
        !isSelected && !hovered && styles.optionDefault,
      )}
    >
      {lang}
    </button>
  );
};

export default LanguageSelector;
