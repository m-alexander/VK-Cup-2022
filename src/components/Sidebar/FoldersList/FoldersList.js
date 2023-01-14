import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArchiveIcon,
  TrashIcon,
  DraftsIcon,
  ImportantFolderIcon,
  InboxIcon,
  SentIcon,
  SpamIcon,
  AddSmallIcon,
} from "../../Icons";
import styles from "./FoldersList.module.css";

const getFolderItemClassName = ({ isActive }) =>
  isActive ? styles.active : undefined;
const FolderItem = ({ href, icon, title }) => (
  <li className={styles.item}>
    <NavLink to={href} className={getFolderItemClassName}>
      {icon}
      <span>{title}</span>
    </NavLink>
  </li>
);

export const FoldersList = () => {
  const { t } = useTranslation();
  return (
    <>
      <ul className={styles.wrapper}>
        <FolderItem
          href="/inbox"
          icon={<InboxIcon />}
          title={t("sidebar.inbox")}
        />
        <FolderItem
          href="/important"
          icon={<ImportantFolderIcon />}
          title={t("sidebar.important")}
        />
        <FolderItem
          href="/sent"
          icon={<SentIcon />}
          title={t("sidebar.sent")}
        />
        <FolderItem
          href="/drafts"
          icon={<DraftsIcon />}
          title={t("sidebar.drafts")}
        />
        <FolderItem
          href="/archive"
          icon={<ArchiveIcon />}
          title={t("sidebar.archive")}
        />
        <FolderItem
          href="/spam"
          icon={<SpamIcon />}
          title={t("sidebar.spam")}
        />
        <FolderItem
          href="/trash"
          icon={<TrashIcon />}
          title={t("sidebar.trash")}
        />
      </ul>

      <div className={styles.divider} />

      <button type="button" className={styles.newFolderButton}>
        <AddSmallIcon />
        <span>{t("sidebar.newFolder")}</span>
      </button>
    </>
  );
};
