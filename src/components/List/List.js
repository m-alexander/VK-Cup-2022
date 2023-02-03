import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { ListItem } from "./ListItem";
import { NoItems } from "./NoItems";
import { useFilters } from "../../store";
import { useInfiniteList, useLoadingTrigger } from "./hooks";
import styles from "./List.module.css";

export const List = () => {
  const initial = useLoaderData();
  const [filters, , resetFilters] = useFilters();
  const { folder } = useParams();

  useEffect(() => {
    resetFilters();
    // eslint-disable-next-line
  }, [folder]);

  const { items, fetchNext, hasMore, loading } = useInfiniteList(
    folder,
    filters,
    initial
  );
  const loadingTriggerRef = useLoadingTrigger(fetchNext);

  return (
    <main className={styles.wrapper} key={folder}>
      <div className={styles.list} key={folder}>
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}

        {hasMore && (
          <div ref={loadingTriggerRef} className={styles.triggerLoadMore} />
        )}
      </div>

      {!loading && items.length === 0 && <NoItems />}
    </main>
  );
};
