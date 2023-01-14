import { Icon } from "./FiltersIcon";
import { CheckIcon } from "../../../Icons";
import styles from "./Filters.module.css";

export const FilterItem = ({ checked, onClick, title, icon }) => (
  <div className={styles.filterItem} onClick={onClick}>
    {checked ? <CheckIcon /> : <div className={styles.notChecked} />}
    {icon && <Icon name={icon} />}
    {title}
  </div>
);
