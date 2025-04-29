import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export const useInfiniteScrollQuery = <TData>({
  queryKey,
  queryFn,
  getNextPageParam,
  initialPageParam = 1,
}: {
  queryKey: any[];
  queryFn: UseInfiniteQueryOptions<TData>["queryFn"];
  getNextPageParam: (lastPage: TData, pages: TData[]) => any;
  initialPageParam?: any;
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const queryResult = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam,
    getNextPageParam,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && queryResult.hasNextPage) {
          queryResult.fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [queryResult.hasNextPage, queryResult.fetchNextPage]);

  return {
    ...queryResult,
    observerRef,
  };
};
