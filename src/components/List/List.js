import { useEffect, useMemo } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { ListItem } from "./ListItem";
import { NoItems } from "./NoItems";
import { useFilters } from "../../store";
import styles from "./List.module.css";

const getFiltersFunction = (filters) => {
  const fns = [];
  if (filters.includes("unread")) fns.push((letter) => !letter.read);
  if (filters.includes("bookmark")) fns.push((letter) => letter.bookmark);
  if (filters.includes("attaches")) fns.push((letter) => letter.doc);

  if (fns.length === 0) return () => true;
  return (letter) => fns.every((fn) => fn(letter));
};

export const List = () => {
  const items = useLoaderData();
  const [filters, , resetFilters] = useFilters();
  const { folder } = useParams();

  const filterFunction = useMemo(() => getFiltersFunction(filters), [filters]);
  const letters = items.filter(filterFunction);

  useEffect(() => {
    resetFilters();
    // eslint-disable-next-line
  }, [folder]);

  return (
    <main className={styles.wrapper} key={folder}>
      {letters.length > 0 && (
        <div className={styles.list} key={folder}>
          {letters.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </div>
      )}

      {letters.length === 0 && <NoItems />}
    </main>
  );
};
