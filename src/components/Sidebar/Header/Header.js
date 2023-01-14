import { useTranslation } from "react-i18next";
import { EditIcon } from "../../Icons";
import styles from "./Header.module.css";

export const Header = () => {
  const { t } = useTranslation();
  return (
    <button type="button" className={styles.newLetterButton}>
      <EditIcon /> <span>{t("sidebar.newLetter")}</span>
    </button>
  );
};
