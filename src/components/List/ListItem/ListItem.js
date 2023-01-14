import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BookmarkIcon,
  GovernmentIcon,
  ImportantIcon,
  KeyIcon,
  MoneyRubleIcon,
  PlaneIcon,
  ShoppingCartIcon,
  TicketIcon,
} from "../../Icons";
import { Avatar } from "../../Avatar";
import { Attaches } from "./Attaches";
import styles from "./ListItem.module.css";

const months = [
  "months.january",
  "months.february",
  "months.march",
  "months.april",
  "months.may",
  "months.june",
  "months.july",
  "months.august",
  "months.september",
  "months.october",
  "months.november",
  "months.december",
];
const formatDate = (date, t) => {
  const d = new Date(date);

  const today = new Date().toISOString().slice(0, 10);
  if (date.slice(0, 10) === today) {
    return (
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0")
    );
  }

  return d.getDate() + " " + t(months[d.getMonth()]);
};

const icons = new Map([
  ["Заказы", ShoppingCartIcon],
  ["Финансы", MoneyRubleIcon],
  ["Регистрации", KeyIcon],
  ["Путешевствия", PlaneIcon],
  ["Билеты", TicketIcon],
  ["Штрафы и налоги", GovernmentIcon],
]);

export const ListItem = ({ item }) => {
  const { t } = useTranslation();

  const TagIcon = icons.get(item.flag);

  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setChecked((prev) => !prev);
  };

  const itemClassNames = [
    styles.item,
    item.read && styles.itemRead,
    checked && styles.checked,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={itemClassNames} to={item.id}>
      <div className={styles.itemReadStatus}></div>

      <div className={styles.itemUser}>
        <Avatar account={item.author} className={styles.avatar} />

        <div className={styles.checkBox}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {}}
            onClick={handleChange}
          />
        </div>

        <div className={styles.itemUserName}>
          {item.author.name} {item.author.surname}
        </div>
      </div>

      <div className={styles.itemIcon}>
        {item.bookmark ? (
          <BookmarkIcon />
        ) : item.important ? (
          <ImportantIcon />
        ) : null}
      </div>

      <div className={styles.itemMessageAndIcons}>
        <div className={styles.itemMessage}>
          <span className={styles.itemTitle}>{item.title}</span>
          <span className={styles.itemText}>{item.text}</span>
        </div>
      </div>

      <div className={styles.itemIcons}>
        {TagIcon && <TagIcon />}
        {item.doc && <Attaches items={[item.doc]} />}
      </div>

      <div className={styles.itemDate}>{formatDate(item.date, t)}</div>
    </Link>
  );
};
