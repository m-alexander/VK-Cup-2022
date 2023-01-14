import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "../../Icons";
import styles from "./HeaderItem.module.css";

export const HeaderItem = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <button onClick={goBack} className={styles.backButton}>
      <ChevronLeftIcon /> <span>{t("header.back")}</span>
    </button>
  );
};
