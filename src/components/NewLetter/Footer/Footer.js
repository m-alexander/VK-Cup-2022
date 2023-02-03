import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = ({ isSubmitting, onSend, onSave }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={[styles.button, styles.primary].join(" ")}
        onClick={onSend}
      >
        {t("compose.footer.send")}
      </button>
      <button
        type="button"
        className={[styles.button, styles.secondary].join(" ")}
        onClick={onSave}
      >
        {t("compose.footer.save")}
      </button>
      <Link to="/inbox" className={[styles.button, styles.secondary].join(" ")}>
        {t("compose.footer.cancel")}
      </Link>
    </div>
  );
};
