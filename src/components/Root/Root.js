import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { Settings } from "../Settings";
import styles from "./Root.module.css";

export const Root = () => {
  const [isSettingsOpened, setSettingsOpened] = useState(false);

  return (
    <>
      <div
        className={`${styles.root} ${isSettingsOpened ? styles.scaled : ""}`}
      >
        <div className={styles.main}>
          <Sidebar onOpenSettings={() => setSettingsOpened(true)} />
          <Outlet />
        </div>
        <Header />
      </div>

      {isSettingsOpened && (
        <Settings onClose={() => setSettingsOpened(false)} />
      )}
    </>
  );
};
