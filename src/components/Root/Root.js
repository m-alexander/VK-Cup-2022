import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import styles from "./Root.module.css";

export const Root = () => (
  <div className={styles.root}>
    <Header />
    <div className={styles.main}>
      <Sidebar />
      <Outlet />
    </div>
  </div>
);
