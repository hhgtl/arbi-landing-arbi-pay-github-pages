import clsx from "clsx";
import { AcquiringFormSection } from "./sections/AcquiringFormSection/AcquiringFormSection";
import { ApplicationFormSection } from "./sections/ApplicationFormSection";
import { AcquiringIllustrationSection } from "./sections/AcquiringIllustrationSection";
import { BusinessChallengesSection } from "./sections/BusinessChallengesSection";
import { FaqSection } from "./sections/FaqSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { PaymentConvenienceSection } from "./sections/PaymentConvenienceSection";
import { ProfitStepsSection } from "./sections/ProfitStepsSection";
import { SolutionCardsSection } from "./sections/SolutionCardsSection";
import { IdealCustomersSection } from "./sections/IdealCustomersSection";
import { NewFaqSection } from "./sections/NewFaqSection";
import { QuickOnboardingSection } from "./sections/QuickOnboardingSection/QuickOnboardingSection";
import { WhyTrustUsSection } from "./sections/WhyTrustUsSection";
import styles from "./LandingArbiPay.module.scss";
import {ReviewsSection} from "./sections/ReviewsSection/ReviewsSection.tsx";
import {SupportWidget} from "../../components/SupportWidget/SupportWidget.tsx";

const sections = [
  { id: "hero", component: HeroSection },
  { id: "business-challenges", component: BusinessChallengesSection },
  { id: "payment-convenience", component: PaymentConvenienceSection },
  { id: "solution-cards", component: SolutionCardsSection },
  { id: "profit-steps", component: ProfitStepsSection },
  { id: "ideal-customers", component: IdealCustomersSection },
  // { id: "why-trust-us", component: WhyTrustUsSection },
  { id: "faq", component: FaqSection },
  { id: "quick-onboarding", component: QuickOnboardingSection },
  { id: "reviews", component: ReviewsSection },
  { id: "new-faq", component: NewFaqSection },
  // { id: "acquiring-illustration", component: AcquiringIllustrationSection },
  // { id: "acquiring-form", component: AcquiringFormSection },
  { id: "application-form", component: ApplicationFormSection },
  { id: "footer", component: FooterSection },
] as const;

export const LandingArbiPay = (): JSX.Element => {
  return (
    <main className={styles.main} data-model-id="5065:8292">
      <div className={styles.contentWrapper}>
        {sections.map(({ id, component: SectionComponent }, index) => (
          <section
            key={id}
            id={id}
            className={clsx(
              styles.section,
              index === 0 && styles.sectionFirst,
              index > 0 &&
                index < sections.length - 1 &&
                styles.sectionSpaced,
            )}
          >
            <SectionComponent />
          </section>
        ))}
      </div>
      <SupportWidget />
    </main>
  );
};
