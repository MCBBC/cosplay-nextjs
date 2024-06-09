"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
export function CoserDetailSearch() {
  const production: { label: string; value: string }[] = [];

  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 my-6">
      <Autocomplete
        isDisabled={true}
        defaultItems={production}
        placeholder="作品"
        defaultSelectedKey="cat"
        className="w-full md:w-3/5">
        {(item) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <Autocomplete
        isDisabled={true}
        placeholder="角色"
        defaultSelectedKey="cat"
        defaultItems={production}
        className="flex items-center w-full md:w-2/5">
        {(item) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
}
