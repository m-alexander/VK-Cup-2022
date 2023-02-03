import { useTranslation } from "react-i18next";
import { Avatar } from "../../Avatar";
import styles from "./Head.module.css";

export const Head = ({ onChange }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    onChange?.(e.target.name, e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarAndInfo}>
        <div className={styles.avatarWrapper}>
          <Avatar account={{ name: "A" }} />
        </div>

        <div className={styles.info}>
          <label className={styles.infoLine}>
            <span>{t("compose.to")}</span>
            <input type="text" name="to" onChange={handleChange} />
          </label>

          <label className={styles.infoLine}>
            <span>{t("compose.subject")}</span>
            <input type="text" name="subject" onChange={handleChange} />
          </label>
        </div>
      </div>
    </div>
  );
};
