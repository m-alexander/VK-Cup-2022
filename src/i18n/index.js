import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import ru from "./ru.json";
import en from "./en.json";

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: "ru",
    supportedLngs: ["ru", "en"],
  });

export default i18n;
