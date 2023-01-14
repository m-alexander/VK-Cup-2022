import { AttachIcon, BookmarkIcon, ReadIcon } from "../../../Icons";
import styles from "./Filters.module.css";

const icons = {
  unread: <ReadIcon />,
  bookmark: <BookmarkIcon />,
  attaches: <AttachIcon />,
};

export const Icon = ({ name }) => (
  <div className={styles.filterItemIcon}>{icons[name] ?? null}</div>
);
