import { useTranslation } from "react-i18next";
import styles from "./Tabs.module.css";
import RuFlagSrc from "../flags/ru.png";
import USAFlagSrc from "../flags/usa.png";

const langs = {
  ru: {
    title: "Русский",
    img: RuFlagSrc,
  },
  en: {
    title: "English",
    img: USAFlagSrc,
  },
};

export const Tabs = ({ active, onSelect }) => {
  const { i18n, t } = useTranslation();

  const lang = langs[i18n.language] ?? langs.ru;

  const getClassNames = (tab) =>
    `${styles.tab} ${active === tab ? styles.active : ""}`;

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={getClassNames("appearance")}
        onClick={() => onSelect("appearance")}
      >
        {t("settings.tabs.appearance")}
      </button>

      <button
        type="button"
        className={getClassNames("lang")}
        onClick={() => onSelect("lang")}
      >
        {t("settings.tabs.language")}: {lang.title}{" "}
        <img className={styles.flag} src={lang.img} alt="" />
      </button>
    </div>
  );
};
