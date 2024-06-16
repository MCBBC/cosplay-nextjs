import { useCallback, useEffect, useState } from "react";
import { Coser } from "../definitions";

export type UseCoserListProps = {
  filterText?: string;
  coserId?: number;
};

export function useCoserList({ filterText = "" }: UseCoserListProps = {}) {
  const [items, setItems] = useState<Coser[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  // 使用useCallback包裹loadCoser函数
  const loadCoser = useCallback(
    async (currentOffset: number) => {
      const controller = new AbortController();
      const { signal } = controller;
      try {
        setIsLoading(true);

        let res = await fetch(
          `/dashboard/cosers/api?offset=${currentOffset}&limit=${limit}&query=${filterText}`,
          { signal }
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        let json = await res.json();
        setHasMore(json.totalCount > offset + 2 * limit);
        setItems((prevItems) => [...prevItems, ...json.results]);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("There was an error with the fetch operation:", error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [filterText, offset]
  ); // 确保依赖的filterText和offset在这里

  useEffect(() => {
    setItems([]);
    setOffset(0);
    loadCoser(offset);
  }, [loadCoser, offset]);

  const onLoadMore = () => {
    const newOffset = offset + limit;

    setOffset(newOffset);
    loadCoser(newOffset);
  };

  return {
    items,
    hasMore,
    isLoading,
    onLoadMore,
  };
}
