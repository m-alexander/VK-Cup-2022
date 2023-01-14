import { useTranslation } from "react-i18next";
import { Avatar } from "../../Avatar";
import { BookmarkIcon, ImportantIcon } from "../../Icons";
import styles from "./Head.module.css";

const formatDate = (date, t, lang) => {
  const d = new Date(date);

  const today = new Date().toISOString().slice(0, 10);
  if (date.slice(0, 10) === today) {
    return (
      t("dates.today") +
      ", " +
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0")
    );
  }

  return d.toLocaleTimeString(lang ?? "ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getUsersListStr = (to = [], t) => {
  const joinName = (account) =>
    [account.name, account.surname].filter(Boolean).join(" ");

  const names = to.slice(0, 3).map(joinName);
  let result = [t("letter.you"), ...names].join(", ");

  if (to.length > 3) {
    const len = to.length - 3;
    result += ` ${t("letter.more")} ${len} ${t("letter.receivers")}`;
  }

  return result;
};

export const Head = ({ item }) => {
  const { t, i18n } = useTranslation();

  const users = getUsersListStr(item.to, t);

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
            <span className={styles.date}>
              {formatDate(item.date, t, i18n.language)}
            </span>
            <span className={styles.icon}>
              {item.bookmark ? (
                <BookmarkIcon />
              ) : item.important ? (
                <ImportantIcon />
              ) : null}
            </span>
          </div>
          <div className={styles.users}>
            {t("letter.to")}: {users}
          </div>
        </div>
      </div>
    </div>
  );
};
