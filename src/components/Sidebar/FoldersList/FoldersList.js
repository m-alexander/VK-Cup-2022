import { NavLink } from "react-router-dom";
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

const FolderItem = ({ href, icon, title }) => (
  <li className={styles.item}>
    <NavLink
      to={href}
      className={({ isActive }) => (isActive ? styles.active : undefined)}
    >
      {icon}
      <span>{title}</span>
    </NavLink>
  </li>
);

export const FoldersList = () => {
  return (
    <>
      <ul className={styles.wrapper}>
        <FolderItem href="/inbox" icon={<InboxIcon />} title="Входящие" />
        <FolderItem
          href="/important"
          icon={<ImportantFolderIcon />}
          title="Важное"
        />
        <FolderItem href="/sent" icon={<SentIcon />} title="Отправленные" />
        <FolderItem href="/drafts" icon={<DraftsIcon />} title="Черновики" />
        <FolderItem href="/archive" icon={<ArchiveIcon />} title="Архив" />
        <FolderItem href="/spam" icon={<SpamIcon />} title="Спам" />
        <FolderItem href="/trash" icon={<TrashIcon />} title="Корзина" />
      </ul>

      <div className={styles.divider} />

      <button type="button" className={styles.newFolderButton}>
        <AddSmallIcon />
        <span>Новая папка</span>
      </button>
    </>
  );
};
