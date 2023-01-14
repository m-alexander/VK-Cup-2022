import { useTranslation } from "react-i18next";
import { Header } from "./Header";
import { FoldersList } from "./FoldersList";
import { SettingsIcon } from "../Icons";
import styles from "./Sidebar.module.css";

export const Sidebar = ({ onOpenSettings }) => {
  const { t } = useTranslation();

  return (
    <aside className={styles.sidebar}>
      <Header />

      <div className={styles.main}>
        <FoldersList />
      </div>

      <button
        className={styles.settings}
        onClick={onOpenSettings}
        type="button"
      >
        <SettingsIcon />
        <span>{t("sidebar.settings")}</span>
      </button>
    </aside>
  );
};
