import { useParams } from "react-router-dom";
import styles from "./Header.module.css";
import { HeaderItem } from "./HeaderItem";
import { HeaderList } from "./HeaderList";
import { Progress } from "./Progress";

export const Header = () => {
  const { letter } = useParams();

  return (
    <header className={styles.header}>
      {letter ? <HeaderItem /> : <HeaderList />}
      <Progress />
    </header>
  );
};
