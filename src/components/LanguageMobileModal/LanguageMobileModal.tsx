import {ModalOverlay} from "../ui/modal-overlay/ModalOverlay.tsx";
import s from "./LanguageMobileModal.module.scss";
import clsx from "clsx";


export const LANGUAGE_OPTIONS = ["RU", "EN", "TH"];
const TITLE_TRANSLATIONS: Record<string, string> = {
    RU: "Выберите язык",
    EN: "Choose language",
    TH: "เลือกภาษา",
};

type Props = {
    open: boolean;
    onClose: () => void;
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

export const LanguageMobileModal = ({open, onClose, selectedLanguage, onLanguageChange}: Props) => {
    const title = TITLE_TRANSLATIONS[selectedLanguage] ?? TITLE_TRANSLATIONS.RU;

    return (
        <ModalOverlay isHomeIndicator contentClassName={s.content} classNamePanel={s.panel}  open={open} onClose={onClose}>
            <h2 className={s.title}>{title}</h2>
            <div className={s.languageWrapper}>
                {
                    LANGUAGE_OPTIONS.map((item) => (
                        <button
                            key={item}
                            className={clsx(s.langBtn, selectedLanguage === item && s.active)}
                            type="button"
                            onClick={() => {
                                onLanguageChange(item);
                                onClose();
                            }}
                        >
                            {item}
                        </button>
                    ))
                }
            </div>
        </ModalOverlay>
    )
};