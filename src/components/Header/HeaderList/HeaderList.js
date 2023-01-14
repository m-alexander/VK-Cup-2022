import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { Filters } from "./Filters";
import styles from "./HeaderList.module.css";

export const HeaderList = () => {
  return (
    <div className={styles.wrapper}>
      <NavLink to="/" className={styles.logoLink}>
        <Logo />
      </NavLink>

      <Filters />
    </div>
  );
};
