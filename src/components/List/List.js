import { useLoaderData, useParams } from "react-router-dom";
import { ListItem } from "./ListItem";
import styles from "./List.module.css";

export const List = () => {
  const items = useLoaderData();
  const { folder } = useParams();

  return (
    <main className={styles.wrapper}>
      <div className={styles.list} key={folder}>
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};
