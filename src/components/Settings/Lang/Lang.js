import { useTranslation } from "react-i18next";
import styles from "./Lang.module.css";
import RuFlagSrc from "../flags/ru.png";
import USAFlagSrc from "../flags/usa.png";

export const Lang = () => {
  const { i18n, t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const lang = e.target.lang.value;
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{t("settings.lang.header")}</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.item}>
          <input
            type="radio"
            name="lang"
            value="ru"
            className={styles.input}
            defaultChecked={i18n.language === "ru"}
          />
          <img className={styles.flag} src={RuFlagSrc} alt="" />
          Русский
        </label>

        <label className={styles.item}>
          <input
            type="radio"
            name="lang"
            value="en"
            className={styles.input}
            defaultChecked={i18n.language === "en"}
          />
          <img className={styles.flag} src={USAFlagSrc} alt="" />
          English
        </label>

        <button className={styles.submit}>
          {t("settings.lang.chooseLang")}
        </button>
      </form>
    </div>
  );
};
