import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const iconsDir = path.join(rootDir, "src/assets/icons");
const imgDir = path.join(rootDir, "src/assets/img");

/** @type {Array<{ url: string; dest: string }>} */
const assets = [
  // Hero / Footer
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/logo-1.svg",
    dest: "icons/arbi-logo-hero.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/logo.svg",
    dest: "icons/arbi-logo-footer.svg",
  },

  // BusinessChallengesSection
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/thailand.svg",
    dest: "icons/flag-th.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/frame-2131329557.svg",
    dest: "icons/currency-badge-th.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/thailand-3.svg",
    dest: "icons/flag-id.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/frame-2131329557-4.svg",
    dest: "icons/currency-badge-id.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/thailand-4.svg",
    dest: "icons/flag-vn.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/frame-2131329557-3.svg",
    dest: "icons/currency-badge-vn.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/thailand-2.svg",
    dest: "icons/flag-my.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/frame-2131329557-1.svg",
    dest: "icons/currency-badge-my.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/thailand-1.svg",
    dest: "icons/flag-sg.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/frame-2131329557-2.svg",
    dest: "icons/currency-badge-sg.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/thailand-5.svg",
    dest: "icons/flag-ru.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/frame-2131329558.svg",
    dest: "icons/currency-badge-ru.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/southeast-asia-map.png",
    dest: "img/southeast-asia-map.png",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/frame-2131329565.svg",
    dest: "icons/business-challenges-map-overlay.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/group-337004.png",
    dest: "img/business-challenges-illustration.png",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/vector-7.svg",
    dest: "icons/business-challenges-decor.svg",
  },

  // AcquiringFormSection
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/frame-1321316603.svg",
    dest: "icons/acquiring-form-submit-icon.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/---2--1.png",
    dest: "img/acquiring-form-bg.png",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/---2--2.png",
    dest: "img/acquiring-form-illustration.png",
  },

  // ApplicationFormSection
  {
    url: "https://c.animaapp.com/mpax3gdvDJMgRW/img/frame-1321316603.svg",
    dest: "icons/application-form-submit-icon.svg",
  },
  {
    url: "https://c.animaapp.com/mpax3gdvDJMgRW/img/---2--1.png",
    dest: "img/application-form-bg.png",
  },
  {
    url: "https://c.animaapp.com/mpax3gdvDJMgRW/img/---2--2.png",
    dest: "img/application-form-illustration.png",
  },

  // PaymentConvenienceSection
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/group-337008-1-1.png",
    dest: "img/payment-convenience-cash-limit.png",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/frame-2131329573-9.svg",
    dest: "icons/payment-convenience-cash-limit-badge.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/group-337008-1-1-1.png",
    dest: "img/payment-convenience-no-control.png",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/frame-2131329573-11.svg",
    dest: "icons/payment-convenience-no-control-badge.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/group-337008-1-2.png",
    dest: "img/payment-convenience-conversion-loss.png",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/frame-2131329573-14.svg",
    dest: "icons/payment-convenience-conversion-loss-badge.svg",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/group-337008-1-1-2.png",
    dest: "img/payment-convenience-gray-schemes.png",
  },
  {
    url: "https://c.animaapp.com/mpaiyf5zrsz8TG/img/frame-2131329573-10.svg",
    dest: "icons/payment-convenience-gray-schemes-badge.svg",
  },

  // SolutionCardsSection
  {
    url: "https://c.animaapp.com/mpap9f1wR204Dc/img/frame-2131329664.svg",
    dest: "icons/solution-card-sbp-payment.svg",
  },
  {
    url: "https://c.animaapp.com/mpap9f1wR204Dc/img/group-337015-1.png",
    dest: "img/solution-card-payment-control.png",
  },
  {
    url: "https://c.animaapp.com/mpap9f1wR204Dc/img/group-337014--2--1-1.png",
    dest: "img/solution-card-fast-crediting.png",
  },
  {
    url: "https://c.animaapp.com/mpap9f1wR204Dc/img/group-337011--3--1.png",
    dest: "img/solution-card-transparent-process.png",
  },

  // IdealCustomersSection
  {
    url: "https://c.animaapp.com/mpargaofIHwTTi/img/frame-2131329667.svg",
    dest: "icons/ideal-customers-section-logo.svg",
  },
  {
    url: "https://c.animaapp.com/mpargaofIHwTTi/img/frame-2131329573-5.svg",
    dest: "icons/ideal-customers-restaurants.svg",
  },
  {
    url: "https://c.animaapp.com/mpargaofIHwTTi/img/frame-2131329573-2.svg",
    dest: "icons/ideal-customers-spa.svg",
  },
  {
    url: "https://c.animaapp.com/mpargaofIHwTTi/img/frame-2131329573-1.svg",
    dest: "icons/ideal-customers-tourism.svg",
  },
  {
    url: "https://c.animaapp.com/mpargaofIHwTTi/img/frame-2131329573-4.svg",
    dest: "icons/ideal-customers-rental.svg",
  },
  {
    url: "https://c.animaapp.com/mpargaofIHwTTi/img/frame-2131329573-3.svg",
    dest: "icons/ideal-customers-real-estate.svg",
  },
  {
    url: "https://c.animaapp.com/mpargaofIHwTTi/img/frame-2131329573.svg",
    dest: "icons/ideal-customers-finance.svg",
  },

  // WhyTrustUsSection
  {
    url: "https://c.animaapp.com/mpaq89tilIvT8H/img/frame-2131329573-1.svg",
    dest: "icons/trust-market-icon.svg",
  },
  {
    url: "https://c.animaapp.com/mpaq89tilIvT8H/img/frame-2131329573.svg",
    dest: "icons/trust-onboarding-icon.svg",
  },
  {
    url: "https://c.animaapp.com/mpaq89tilIvT8H/img/frame-2131329682.svg",
    dest: "icons/trust-automation-icon.svg",
  },
  {
    url: "https://c.animaapp.com/mpaq89tilIvT8H/img/frame-2131329573-2.svg",
    dest: "icons/trust-support-icon.svg",
  },
  {
    url: "https://c.animaapp.com/mpaq89tilIvT8H/img/vector-17.svg",
    dest: "icons/trust-connector.svg",
  },
  {
    url: "https://c.animaapp.com/mpaq89tilIvT8H/img/vector-17-1.svg",
    dest: "icons/trust-connector-highlighted.svg",
  },

  // FAQ Desktop
  {
    url: "https://c.animaapp.com/mpasbevtq8TjeB/img/frame-2131329683-1.png",
    dest: "img/faq-step-01-illustration.png",
  },
  {
    url: "https://c.animaapp.com/mpasof7qcoaeQT/img/290-2.png",
    dest: "img/faq-step-02-phone.png",
  },
  {
    url: "https://c.animaapp.com/mpasof7qcoaeQT/img/group-1149-1.png",
    dest: "img/faq-step-02-brand-icon.png",
  },
  {
    url: "https://c.animaapp.com/mpau6tne1yNago/img/group-337017.png",
    dest: "img/faq-step-03-illustration.png",
  },
  {
    url: "https://c.animaapp.com/mpaw7uh6fCeAeh/img/290-2-1-1.png",
    dest: "img/faq-step-04-phone.png",
  },
  {
    url: "https://c.animaapp.com/mpaw7uh6fCeAeh/img/group-1149-1-3.png",
    dest: "img/faq-step-04-brand-icon.png",
  },
];

await mkdir(iconsDir, { recursive: true });
await mkdir(imgDir, { recursive: true });

let failed = 0;

for (const { url, dest } of assets) {
  const outputPath = path.join(rootDir, "src/assets", dest);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`FAIL ${dest}: HTTP ${response.status} ${url}`);
      failed += 1;
      continue;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(outputPath, buffer);
    console.log(`OK   ${dest}`);
  } catch (error) {
    console.error(`FAIL ${dest}: ${error instanceof Error ? error.message : error}`);
    failed += 1;
  }
}

console.log(`\nDone: ${assets.length - failed}/${assets.length} downloaded`);

if (failed > 0) {
  process.exit(1);
}
