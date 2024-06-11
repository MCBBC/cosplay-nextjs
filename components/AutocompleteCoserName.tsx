// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
// import { Coser } from "@/app/lib/definitions";

// const AutocompleteCoserName = ({ coserList }: { coserList: Coser[] }) => {
//   const userRef = useRef<HTMLDivElement>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const scrollElement = userRef.current;
//     console.log(scrollElement);
//     if (!scrollElement) return;
//     scrollElement.setAttribute("data-loading-flag", "true");
//   }, []);

//   return (
//     <Autocomplete
//       defaultItems={coserList}
//       labelPlacement="outside-left"
//       label="Coser"
//       placeholder="选择你的Coser"
//       scrollRef={userRef}
//       isLoading={isLoading}
//       onOpenChange={setIsOpen}
//       className="max-w-xs">
//       {(animal) => (
//         <AutocompleteItem key={animal.id}>{animal.name}</AutocompleteItem>
//       )}
//     </Autocomplete>
//   );
// };

// export default AutocompleteCoserName;

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useCoserList } from "@/app/lib/fetchData/useCoserList";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function AutocompleteCoserName() {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const { items, hasMore, isLoading, onLoadMore } = useCoserList({
    filterText,
  });

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
      onOpenChange={setIsOpen}>
      {(item) => (
        <AutocompleteItem key={item.id} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
