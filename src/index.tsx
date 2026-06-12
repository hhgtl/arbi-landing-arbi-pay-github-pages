import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/geist/600.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LandingArbiPay } from "./screens/LandingArbiPay";
import { store } from "./store/store";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <LandingArbiPay />
      </LanguageProvider>
    </Provider>
  </StrictMode>,
);
