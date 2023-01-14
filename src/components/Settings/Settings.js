import { useRef, useState } from "react";
import { Appearance } from "./Appearance";
import { Lang } from "./Lang";
import { Tabs } from "./Tabs";
import { CloseIcon } from "../Icons";
import styles from "./Settings.module.css";

export const Settings = ({ onClose }) => {
  const [tab, setTab] = useState("appearance");

  const contentRef = useRef();

  const handleTintClick = (e) => {
    if (contentRef.current.contains(e.target)) return;
    onClose();
  };

  return (
    <div className={styles.wrapper} onClick={handleTintClick}>
      <div className={styles.content} ref={contentRef}>
        <Tabs active={tab} onSelect={setTab} />

        <div className={styles.tabContent}>
          {tab === "appearance" && <Appearance />}
          {tab === "lang" && <Lang />}
        </div>

        <button className={styles.closeIcon} type="button" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
