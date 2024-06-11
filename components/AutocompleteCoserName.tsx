import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useCoserList } from "@/app/lib/fetchData/useCoserList";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function AutocompleteCoserName({
  defaultCoserId,
}: {
  defaultCoserId: number | string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const { items, hasMore, isLoading, onLoadMore } = useCoserList({
    filterText,
    defaultCoserId,
  });
  const [value, setValue] = useState(defaultCoserId);
  const [, scrollerRef] = useInfiniteScroll({
    isEnabled: isOpen,
    hasMore,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setFilterText(value);
  }, 250);

  return (
    <Autocomplete
      className="max-w-xs"
      variant="bordered"
      isLoading={isLoading}
      defaultItems={items}
      labelPlacement="outside-left"
      label="Coser"
      placeholder="选择你的Coser"
      scrollRef={scrollerRef}
      onInputChange={(value) => handleSearch(value)}
      selectedKey={value}
      onSelectionChange={setValue}
      onOpenChange={setIsOpen}>
      {(item) => (
        <AutocompleteItem key={item.id} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
