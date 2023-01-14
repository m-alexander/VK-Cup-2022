import { useTranslation } from "react-i18next";
import styles from "./NoItems.module.css";

export const NoItems = () => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.wrapper} no-items-block`}>
      <div className={`${styles.image} no-items-image`} />
      <div className={`${styles.text} no-items-text`}>
        {t("list.noLetters")}
      </div>
    </div>
  );
};
