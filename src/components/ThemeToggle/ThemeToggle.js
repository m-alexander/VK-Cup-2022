import { ThemeIcon } from "../Icons";
import styles from "./ThemeToggle.module.css";
import { useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const value = localStorage.getItem("theme") ?? "light";
    document.querySelector("html").dataset.theme = value;
    return value;
  });

  const toggleTheme = () => {
    const value = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", value);
    document.querySelector("html").dataset.theme = value;
    setTheme(value);
  };

  return (
    <button className={styles.button} onClick={toggleTheme}>
      <ThemeIcon />
      <span>Тема: {theme === "light" ? "светлая" : "темная"}</span>
    </button>
  );
};
