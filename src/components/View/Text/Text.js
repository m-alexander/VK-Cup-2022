import styles from "./Text.module.css";

export const Text = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
