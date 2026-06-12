import styles from "./application-animated-decore.module.scss";
import applicationFormBg from "../../../../../../assets/img/application-form-bg.png";
import applicationFormIllustration from "../../../../../../assets/img/application-form-illustration.png";

export const ApplicationAnimatedDecore = () => {
    return (
        <div className={styles.illustrationWrapper}>
            <div className={styles.illustrationInner}>
                <div className={styles.illustrationBackground}>
                    <img
                        className={styles.illustrationImageTop}
                        src={applicationFormBg}
                    />
                    <div className={styles.gradient}/>
                    <img
                        className={styles.illustrationImage}
                        src={applicationFormIllustration}
                    />
                </div>


                <div
                    aria-hidden="true"
                    className={styles.illustrationGlow}
                />
            </div>
        </div>
    )
}