import {
  NavLink,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import { Logo } from "./Logo";
import { ChevronLeftIcon } from "../Icons";
import styles from "./Header.module.css";

export const Header = () => {
  const { letter } = useParams();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <header className={styles.header}>
      {letter ? (
        <button onClick={goBack} className={styles.backButton}>
          <ChevronLeftIcon /> <span>Вернуться</span>
        </button>
      ) : (
        <NavLink to="/" className={styles.logoLink}>
          <Logo />
        </NavLink>
      )}

      <div
        className={`${styles.progress} ${
          navigation.state === "loading" ? styles.loading : ""
        }`}
      />
    </header>
  );
};
