import { useLoaderData } from "react-router-dom";
import { Title } from "./Title";
import { Head } from "./Head";
import { Attaches } from "./Attaches";
import { Text } from "./Text";
import styles from "./View.module.css";

export const View = () => {
  const item = useLoaderData();

  if (!item) return <div className={styles.notFound}>Not found</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Title title={item.title} tag={item.flag} />
        <Head item={item} />
        <Attaches attaches={item.doc} />
        <Text>{item.text}</Text>
      </div>
    </div>
  );
};
