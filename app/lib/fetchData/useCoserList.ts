import { useEffect, useState } from "react";
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

  const loadCoser = async (currentOffset: number) => {
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
      // 由于是从零开始的，所以算一次未来的偏移量再算一次从0开始的偏移量
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
  };

  useEffect(() => {
    setItems([]);
    setOffset(0);
    loadCoser(offset);
  }, [filterText]);

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
