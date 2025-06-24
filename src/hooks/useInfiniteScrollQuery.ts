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
  queryKey: (string | number)[];
  queryFn: UseInfiniteQueryOptions<TData>["queryFn"];
  getNextPageParam: (lastPage: TData, pages: TData[]) => number | null;
  initialPageParam?: number;
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const queryResult = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam,
    getNextPageParam,
  });

  const { hasNextPage, fetchNextPage } = queryResult;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentTarget = observerRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  return {
    ...queryResult,
    observerRef,
  };
};
