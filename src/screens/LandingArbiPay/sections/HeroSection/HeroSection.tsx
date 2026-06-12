import { Button } from "../../../../components/ui/button";
import { LanguageSelector } from "../../../../components/LanguageSelector";
import {Language, useLanguage} from "../../../../contexts/LanguageContext";
import { useHeroSectionContent } from "./lib";
import styles from "./HeroSection.module.scss";
import {BurgerMenu} from "../../../../components/ui/burger-menu/burger-menu.tsx";
import {useState} from "react";
import BurgerMenuIcon from "../../../../assets/icons/burger-menu.svg?react";
import arbiLogoHero from "../../../../assets/icons/arbi-logo-hero.svg";
import {LanguageMobileModal} from "../../../../components/LanguageMobileModal/LanguageMobileModal.tsx";

export const HeroSection = (): JSX.Element => {
  const { language, setLanguage } = useLanguage();
  const { fallback, navLinks, cta } = useHeroSectionContent();
  const [ isOpenBurgerMenu, setIsOpenBurgerMenu ] = useState(false);
  const [ isOpenLanguageMenu, setIsOpenLanguageMenu ] = useState(false);

  return (
    <>
      <header className={styles.heroHeader}>
        <div className={styles.pageContainer}>
          <a href="/" className={styles.logoLink} aria-label={fallback.aria.logo}>
            <img
                className={styles.logoImage}
                alt={fallback.aria.logoAlt}
                src={arbiLogoHero}
            />
          </a>
          <nav
              aria-label={fallback.aria.mainNav}
              className={styles.mainNavigation}
          >
            <ul className={styles.navigationList}>
              {navLinks.map((item) => (
                  <li key={item.id}>
                    <a
                        href={item.href}
                        target={item.target}
                        className={styles.navLink}
                    >
                      {item.label}
                    </a>
                  </li>
              ))}
            </ul>
          </nav>
          <div className={styles.actionsGroup}>
            <div className={styles.languageSelectorDesctopWrapper}><LanguageSelector value={language} onChange={setLanguage} /></div>
            <button onClick={() => setIsOpenLanguageMenu(true)} className={styles.languageSelectorMobile}>{language}</button>
            <a
                className={styles.ctaButtonLink}
                href={cta.href}
                target={cta.target}
                {...(cta.target === "_blank"
                    ? { rel: "noopener noreferrer" }
                    : {})}
            >
              <Button type="button" className={styles.ctaButton}>
                {cta.label}
              </Button>
            </a>
            <button onClick={() => setIsOpenBurgerMenu(true)} className={styles.burgerMenu}>
              <BurgerMenuIcon/>
            </button>
          </div>
        </div>
      </header>
      <div className={styles.headerSpacer} aria-hidden="true" />
      <BurgerMenu
        isOpen={isOpenBurgerMenu}
        onClose={() => setIsOpenBurgerMenu(false)}
        navLinks={navLinks}
        cta={cta}
      />
      <LanguageMobileModal selectedLanguage={language} onLanguageChange={(lang) => setLanguage(lang as Language)} open={isOpenLanguageMenu} onClose={() => setIsOpenLanguageMenu(false)}/>
    </>
  );
};
