import { useNavigation } from "react-router-dom";
import styles from "./Header.module.css";

export const Progress = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className={`${styles.progress} ${isLoading ? styles.loading : ""}`} />
  );
};
