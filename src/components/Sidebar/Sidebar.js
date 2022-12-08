import { ThemeToggle } from "../ThemeToggle";
import { Header } from "./Header";
import { FoldersList } from "./FoldersList";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Header />

      <div className={styles.main}>
        <FoldersList />
      </div>

      <ThemeToggle />
    </aside>
  );
};
