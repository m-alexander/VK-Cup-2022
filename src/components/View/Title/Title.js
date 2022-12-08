import {
  GovernmentIcon,
  KeyIcon,
  MoneyRubleIcon,
  PlaneIcon,
  ShoppingCartIcon,
  TicketIcon,
} from "../../Icons";
import styles from "./Title.module.css";

const icons = new Map([
  ["Заказы", ShoppingCartIcon],
  ["Финансы", MoneyRubleIcon],
  ["Регистрации", KeyIcon],
  ["Путешевствия", PlaneIcon],
  ["Билеты", TicketIcon],
  ["Штрафы и налоги", GovernmentIcon],
]);

export const Title = ({ title, tag }) => {
  const Icon = icons.get(tag);

  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      {Icon && (
        <div className={styles.tag}>
          <Icon />
          {tag}
        </div>
      )}
    </div>
  );
};
