<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>
## 2026-05-18 (FaqSection — BottomCardFade layering fix all 4 cards)
- Changed content wrapper from `overflow-hidden` → `overflow-visible` so fade isn't clipped by intermediate div
- Raised all BottomCardFade z-indices from 1/2 → 20 (above images/notifications, card button clips at h-[350px])
- Affected: Step01Content (z:1→20), Step02Content (z:2→20), Step03Content (z:2→20), Step04Content (z:1→20)
- Card button (`overflow-hidden h-[350px]`) remains the true clip boundary — no card layout changes

## 2026-05-18 (FaqSection card03 — laptop resize + badge removal)
- Laptop image: width 374.78px→412px, left 130px→50px, bottom -81px→-30px
- Green check badge div (72×72, z:3, rgba(30,151,120,0.6)) deleted entirely from DOM
- BottomCardFade at z:2 kept unchanged; image src/alt unchanged
- Confirmed FaqSection.tsx is the only rendered file for "Быстрое подключение"

## 2026-05-18 (FaqSection card03 laptop image 404 fix)
- Root cause of "no visual change": laptop URL used orphaned CDN session `mpatua5wzUG9bA` (not present anywhere else in project)
- Fixed: changed to `mpasof7qcoaeQT/img/group-337017.png` (same CDN session as card02 assets)
- Confirmed FaqSection.tsx IS the correct "Быстрое подключение" renderer (QuickOnboardingSection = "Почему нам доверяют")
- BottomCardFade imported and used correctly; Step03Content layer order (z1 laptop, z2 fade, z3 badge) confirmed correct

## 2026-05-18 (WhyTrustUsSection – Автоматизируем платежи icon wrapper)
- Added 72px circle wrapper (gradient bg + padding:16px + borderRadius:50px) only for "Автоматизируем платежи"
- Inner icon set to 40×40px; other 3 icons remain as direct 72×72 img elements (untouched)

## 2026-05-18 (WhyTrustUsSection icon fix)
- Removed `iconCircleStyle` wrapper div (gradient bg + padding + boxShadow + border-radius) around trust icons
- Icon now renders directly as `<img>` at 72×72px with `object-fit: contain`, no double circle
- No layout, text, heading, connector, or spacing changes

## 2026-05-18 (IdealCustomersSection icon fix)
- Removed extra circular wrapper div (gradient bg + padding + boxShadow) around each icon
- Icon now renders directly as `<img>` at 72×72px with `object-fit: contain`
- No layout, text, spacing, or heading changes

## 2026-05-18 (WhyTrustUsSection polish)
- Section bg changed from `bg-[#f7f7f8]` → `bg-white`
- Left description: gradient applied only to "ARBI Pay" span; rest of text uses `color: #07041E`
- Connector arcs shifted up 20px via `top: c.top - 20` (no layout change to items/headings)

## 2026-05-18 (WhyTrustUsSection heading logo)
- Replaced plain "ARBI Pay" text in "Кому особенно полезен" heading with inline logo img
- Logo: `logo-1.svg` from animaapp CDN, height 54px, aligned flex-start to top of heading
- Heading uses flex layout with gap:10px; "особенно" keeps blue gradient span; layout unchanged
- Only the `<header>` block inside WhyTrustUsSection was touched

## 2026-05-18 (SolutionCardsSection bg fix)
- Changed section background from `bg-[#f6f6f7]` (grey) to `bg-white` (#FFFFFF)
- Only the `<section>` className was touched; layout, cards, text unchanged

## 2026-05-18 (section order fix)
- Restored missing "Как мы помогаем сделать прием оплаты удобнее" section as new `SolutionCardsSection`
- Removed `IdealCustomersSection` ("Как клиент платит через ARBI Pay" duplicate) from page entirely
- Correct order: Hero → BusinessChallenges → PaymentConvenience → SolutionCards → ProfitSteps → …
- SolutionCardsSection: left col (h2 + desc + CTA) + 2×2 green-accent cards with Решение badge
- Created `src/screens/LandingArbiPay/sections/SolutionCardsSection/SolutionCardsSection.tsx` + index.ts

## 2026-05-18 (ProfitStepsSection phone images + heading)
- Fixed broken local "iphone N.webp" references → replaced with 4 public arbipay.online/onboarding/site-library/*.webp URLs
- Heading: "Четыре <span>простых</span> шага к <span>увеличению прибыли</span>" — spans colored #537CE3
- Single `<img>` per card, no layer reconstruction; fade overlay kept (h=60px, z-index:1)

## 2026-05-18 (card typography + badge alignment)
- PaymentConvenienceSection: card title h3 bumped from 18px → 20px (Manrope 700)
- ProfitStepsSection: `cardTitle` string replaced with `titleParts[]` array; green colored spans via GREEN_GRADIENT; title size set to 20px
- ProfitStepsSection card titles: "Оплата <через СБП>", "<Контроль платежей> в одном месте", "<Быстрое зачисление> средств", "<Прозрачный> платёжный процесс"
- "Решение" badge wrapped in `flex justify-end` row so it pins to bottom-right; divider line changed to plain `<div>` with green tint
- `justify-between` removed from CardContent so badge row uses normal flow + mt-4 flush to bottom-right

## 2026-05-18 (PaymentConvenienceSection card width)
- Fixed card grid: `grid-template-columns: 411px 411px` with `gap: 24px` — cards no longer stretch beyond 411px
- Removed `flex-1` from grid wrapper so cards don't fill all available space
- Added `whitespace-nowrap` to the blue heading span so "теряет выручку?" stays on one line

## 2026-05-18 (PaymentConvenienceSection fix)
## 2026-05-18 (PaymentConvenienceSection fix)
- Fixed "Где бизнес теряет выручку?" section: left heading + right 2×2 grid layout with `flex justify-between`
- Card titles replaced with two-color `<h3>` using `titleParts[]` array — blue words use gradient spans
- Tags (Наличные/Управление/Конверсия/Безопасность) moved to bottom-right via `flex justify-end mt-4`
- Correct titles: "Клиенты / ограничены наличными", "Хаос и / отсутствие контроля", "Потеря клиентов / на этапе обмена", "Риски / серых схем"
- Divider line replaced with a plain `<div>` (no more broken SVG line image)

## 2026-05-18 (map animation path polish)
- Refined all 6 SVG path geometries in MapFlowAnimation.tsx for cleaner, more natural arcs
- ArbiPay fan-out start point moved to x=316 (8px outside card right edge at 308) — paths no longer originate under the card
- Russia→ArbiPay: gentle horizontal C-curve ending at ArbiPay left edge (x=186)
- Thailand arc sweeps wide & upward; Indonesia sweeps wide downward; Malaysia stays near-horizontal
- Endpoint dots repositioned to match country card left-center edges; layering/opacity unchanged

## 2026-05-18 (map flow animation)
- Created `MapFlowAnimation.tsx` — SVG overlay with 6 animated payment routes on hero map
- Routes: Russia→ArbiPay (first), then ArbiPay→Thailand/Vietnam/Malaysia/Singapore/Indonesia (staggered)
- Each route: static dashed base (opacity 0.28) + animated travelling highlight dash + pulsing endpoint dot
- Per-route CSS keyframes generated dynamically; all loops 6–7s, staggered 350ms delays
- Hid original static `group-337004.png` (opacity-0) since animated SVG replaces it; country cards + ArbiPay z-10

## 2026-05-18 (precise fixes)
- Hero section top gap: first section uses `lg:mb-[88px]`, all others keep `lg:mb-[160px]`
- Header order fixed: LanguageSelector now left of CTA → Logo → Nav → LangSelector → CTA
- All 7 "Оставить заявку" buttons now link to `https://arbipay.online/onboarding/` with `target="_blank" rel="noopener noreferrer"`
- Form submit button in AcquiringFormSection uses `window.open` on click (preserves `type="submit"`)

## 2026-05-18 (section spacing)
- Added `lg:mb-[160px]` to every section wrapper in `LandingArbiPay.tsx` except the footer (last item)
- Applied via index check in the sections.map — one consistent rule, no per-section manual margins
- Desktop only (lg: prefix), mobile spacing unchanged

## 2026-05-18 (layout fix)
- Unified all sections to `max-w-[1440px] px-4 lg:px-20` container pattern (80px desktop side padding)
- HeroSection: moved px from outer `<header>` to inner content div so header bg stays full-width
- Fixed PaymentConvenienceSection (81px→80px), ProfitStepsSection (82px→80px), WhyTrustUsSection (8px→80px), FaqSection (8px→80px), FooterSection (10px→80px)
- IdealCustomersSection and AcquiringIllustrationSection were missing l desktop padding — added lg:px-20

## 2026-05-18
- Replaced all text-as-image `<img>` headings with real semantic HTML (h1/h2/h3/p) across 8 sections
- Hero H1 now real text: "Принимайте оплату в рублях..." with blue gradient spans (BusinessChallengesSection)
- Section H2s fixed: WhyTrustUs, FaqSection, AcquiringForm, IdealCustomers, PaymentConvenience, ProfitSteps, AcquiringIllustration, QuickOnboarding
- Card titles in PaymentConvenienceSection and ProfitStepsSection replaced with real `<p>` text (added `cardTitle` field to data arrays)
- Fixed collapsed card width in FaqSection horizontal accordion from 72px → 110px
</changelog>
