import { useTranslation } from "react-i18next";
import { EditIcon } from "../../Icons";
import styles from "./Header.module.css";

export const Header = () => {
  const { t } = useTranslation();
  return (
    <a href="/compose" className={styles.newLetterButton}>
      <EditIcon /> <span>{t("sidebar.newLetter")}</span>
    </a>
  );
};
