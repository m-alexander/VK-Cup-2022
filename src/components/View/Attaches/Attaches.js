import { useTranslation } from "react-i18next";
import styles from "./Attaches.module.css";
import { DownloadIcon } from "../../Icons";

export const Attaches = ({ attaches }) => {
  const { t } = useTranslation();

  if (!attaches) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.images}>
        <div className={styles.item}>
          <img className={styles.image} src={attaches.img} alt="" />
          <a className={styles.caption} download href={attaches.img}>
            <DownloadIcon />
            {t("letter.download")}
          </a>
        </div>
      </div>

      <div className={styles.action}>
        <span>1 {t("letter.file")}</span>
        <a href={attaches.img} download>
          {t("letter.download")} <span className={styles.fileSize}>5Mb</span>
        </a>
      </div>
    </div>
  );
};
