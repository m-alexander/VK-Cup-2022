import { useTranslation } from "react-i18next";
import { useTheme } from "../../../store";
import styles from "./Appearance.module.css";
import LightThemeImageSrc from "./themes/light.png";
import DarkThemeImageSrc from "./themes/dark.png";
import AnimeThemeImageSrc from "./themes/anime.png";

const colors = [
  { name: "4e342e", color: "#4e342e" },
  { name: "424242", color: "#424242" },
  { name: "5a355a", color: "#5a355a" },
  { name: "35385a", color: "#35385a" },
  { name: "646ecb", color: "#646ECB" },
  { name: "e73672", color: "#e73672" },
  { name: "f44336", color: "#f44336" },
  { name: "388e3c", color: "#388e3c" },
  { name: "81d8d0", color: "#81d8d0" },
  { name: "e2dcd5", color: "#e2dcd5" },
  { name: "ffebdc", color: "#ffebdc" },
  { name: "e7eed2", color: "#e7eed2" },
  { name: "d0f0f7", color: "#d0f0f7" },
  { name: "c9d0fb", color: "#c9d0fb" },
  { name: "ddf3ff", color: "#ddf3ff" },
  { name: "f0f0f0", color: "#f0f0f0" },
];

const themes = [
  { name: "dark", image: DarkThemeImageSrc },
  { name: "light", image: LightThemeImageSrc },
  { name: "anime", image: AnimeThemeImageSrc },
];

export const Appearance = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useTheme();

  const getColorClassNames = (name) =>
    `${styles.color} ${theme === name ? styles.selected : ""}`;

  const getThemeClassNames = (name) =>
    `${styles.theme} ${theme === name ? styles.selected : ""}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{t("settings.appearance.header")}</div>

      <div>
        <div className={styles.colors}>
          {colors.map((item) => (
            <div
              key={item.name}
              className={getColorClassNames(item.name)}
              style={{ background: item.color }}
              onClick={() => setTheme(item.name)}
            />
          ))}
        </div>
        <div className={styles.themes}>
          {themes.map((item) => (
            <div
              key={item.name}
              className={getThemeClassNames(item.name)}
              style={{ backgroundImage: `url(${item.image})` }}
              onClick={() => setTheme(item.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
