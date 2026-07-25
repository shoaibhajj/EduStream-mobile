import { I18n } from "i18n-js";
import { I18nManager } from "react-native";
import * as ExpoLocalization from "expo-localization";
import ar from "./ar";
import en from "./en";

const i18n = new I18n({ ar, en });

// Arabic is always the default. Device locale is ignored.
// Change this to ExpoLocalization.locale if you want device-based switching later.
i18n.locale = "ar";
i18n.defaultLocale = "ar";
i18n.enableFallback = true; // falls back to Arabic if a key is missing in English

// Force RTL for the entire app layout.
// This must run as early as possible — before any component renders.
if (!I18nManager.isRTL) {
  I18nManager.forceRTL(true);
}

export { i18n };

// Convenience shorthand used everywhere: t("student.no_years")
export const t = (key: string, options?: object) => i18n.t(key, options);

// Export current locale for conditional logic if needed
export const currentLocale = () => i18n.locale;

// Language switcher (for testing only — remove or gate behind a dev flag later)
export function setLanguage(lang: "ar" | "en") {
  i18n.locale = lang;
  I18nManager.forceRTL(lang === "ar");
}
