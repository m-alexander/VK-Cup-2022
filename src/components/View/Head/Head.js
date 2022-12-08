import { Avatar } from "../../Avatar";
import styles from "./Head.module.css";
import { BookmarkIcon, ImportantIcon } from "../../Icons";

const formatDate = (date) => {
  const d = new Date(date);

  const today = new Date().toISOString().slice(0, 10);
  if (date.slice(0, 10) === today) {
    return (
      "Сегодня, " +
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0")
    );
  }

  return d.toLocaleTimeString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getUsersListStr = (to = []) => {
  const joinName = (account) =>
    [account.name, account.surname].filter(Boolean).join(" ");

  let result = ["Вы", ...to.slice(0, 3).map(joinName)].join(", ");

  if (to.length > 3) {
    result += ` еще ${to.length - 3} получателей`;
  }

  return result;
};

export const Head = ({ item }) => {
  const users = getUsersListStr(item.to);

  return (
    <div className={styles.wrapper}>
      <div className={styles.read}>
        {!item.read && <div className={styles.readIndicator} />}
      </div>

      <div className={styles.avatarAndInfo}>
        <Avatar account={item.author} />

        <div className={styles.info}>
          <div className={styles.title}>
            <span>
              {item.author.name} {item.author.surname}
            </span>
            <span className={styles.date}>{formatDate(item.date)}</span>
            <span className={styles.icon}>
              {item.bookmark ? (
                <BookmarkIcon />
              ) : item.important ? (
                <ImportantIcon />
              ) : null}
            </span>
          </div>
          <div className={styles.users}>Кому: {users}</div>
        </div>
      </div>
    </div>
  );
};
