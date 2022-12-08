import styles from "./Avatar.module.css";

export const Avatar = ({ account, className }) => {
  const classNames = [styles.wrapper, className].filter(Boolean).join(" ");

  return (
    <div className={classNames}>
      {account?.avatar ? (
        <img src={account.avatar} className={styles.image} alt="" />
      ) : (
        <div className={styles.noImage}>{account?.name?.[0]}</div>
      )}
    </div>
  );
};
