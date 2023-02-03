import { useEffect, useRef, useState } from "react";
import { getLetters } from "../../api";

export const useInfiniteList = (folder, filters, initial) => {
  const [state, setState] = useState({
    items: initial.items,
    hasMore: initial?.pageInfo?.hasNextPage,
    loading: false,
    currentPage: 1,
  });

  const fetchNext = async () => {
    if (state.loading) return;
    setState((prev) => ({ ...prev, loading: true }));
    const data = await getLetters(folder, state.currentPage + 1, filters);
    setState((prev) => ({
      loading: false,
      items:
        data?.pageInfo?.page === 1
          ? [...data.items]
          : [...prev.items, ...data.items],
      hasMore: data.pageInfo?.hasNextPage,
      currentPage: data.pageInfo?.page,
    }));
  };

  useEffect(() => {
    if (!folder) return;

    getLetters(folder, 1, filters).then((data) => {
      setState({
        items: data.items,
        hasMore: data?.pageInfo?.hasNextPage,
        loading: false,
        currentPage: 1,
      });
    });
  }, [folder, filters]);

  return { ...state, fetchNext };
};

export const useLoadingTrigger = (fetchNext) => {
  const triggerRef = useRef();

  useEffect(() => {
    let fetching = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!fetching && entries?.[0]?.isIntersecting) {
          fetching = true;
          fetchNext().then(() => (fetching = false));
        }
      },
      {
        rootMargin: "1000px",
      }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNext]);

  return triggerRef;
};
