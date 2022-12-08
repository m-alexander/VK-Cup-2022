import { EditIcon } from "../../Icons";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <button type="button" className={styles.newLetterButton}>
      <EditIcon /> <span>Написать письмо</span>
    </button>
  );
};
