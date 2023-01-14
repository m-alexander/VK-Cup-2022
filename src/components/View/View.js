import { useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Title } from "./Title";
import { Head } from "./Head";
import { Attaches } from "./Attaches";
import { Text } from "./Text";
import styles from "./View.module.css";

export const View = () => {
  const { t } = useTranslation();
  const item = useLoaderData();

  if (!item) {
    return <div className={styles.notFound}>{t("letter.notFound")}</div>;
  }

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
