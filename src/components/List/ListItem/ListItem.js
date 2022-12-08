import { Link } from "react-router-dom";
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
import { useState } from "react";

// prettier-ignore
const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const formatDate = (date) => {
  const d = new Date(date);

  const today = new Date().toISOString().slice(0, 10);
  if (date.slice(0, 10) === today) {
    return (
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0")
    );
  }

  return d.getDate() + " " + months[d.getMonth()];
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

      <div className={styles.itemDate}>{formatDate(item.date)}</div>
    </Link>
  );
};
