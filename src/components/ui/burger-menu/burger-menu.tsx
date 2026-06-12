import { clsx } from "clsx";
import { useEffect, useMemo } from "react";
import ArbiLogo from "../../../assets/img/arbi-logo.png";
import { getSectionIdFromHref } from "./getSectionIdFromHref";
import s from "./burger-menu.module.scss";
import { useActiveSection } from "./useActiveSection";

type BurgerNavLink = {
  id: string;
  label: string;
  href: string;
  target: string;
};

type BurgerCta = {
  label: string;
  href: string;
  target: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  navLinks: BurgerNavLink[];
  cta: BurgerCta;
};

export const BurgerMenu = ({
  isOpen,
  onClose,
  navLinks,
  cta,
}: Props) => {
  const sectionIds = useMemo(
    () =>
      navLinks
        .map((item) => getSectionIdFromHref(item.href))
        .filter((id): id is string => id !== null),
    [navLinks],
  );

  const activeSectionId = useActiveSection(sectionIds);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleNavClick = (href: string, target: string) => {
    const sectionId = getSectionIdFromHref(href);

    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      onClose();
      return;
    }

    if (target === "_blank") {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.assign(href);
    }
  };

  return (
    <div className={clsx(s.burgerMenu, isOpen && s.isOpen)} onClick={onClose}>
      <div
        className={clsx(s.content, isOpen && s.isOpen)}
        onClick={(e) => e.stopPropagation()}
      >
        <img className={s.logo} src={ArbiLogo} alt="" />
        <div className={s.navMenu}>
          {navLinks.map((item) => {
            const sectionId = getSectionIdFromHref(item.href);
            const isActive =
              sectionId !== null && sectionId === activeSectionId;

            return (
              <button
                key={item.id}
                type="button"
                className={clsx(s.navMenuButton, isActive && s.active)}
                onClick={() => handleNavClick(item.href, item.target)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <a
          className={s.submitButton}
          href={cta.href}
          target={cta.target}
          {...(cta.target === "_blank"
            ? { rel: "noopener noreferrer" }
            : {})}
        >
          {cta.label}
        </a>
      </div>
    </div>
  );
};
