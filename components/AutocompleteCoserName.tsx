import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Coser } from "@/app/lib/definitions";
import { useAsyncList } from "@react-stately/data";

export default function AutocompleteCoserName({
  coserId,
  onSelectCoser,
}: {
  coserId: number;
  onSelectCoser?: Function;
}) {
  let list = useAsyncList<Coser>({
    async load({ signal, filterText }) {
      let res = await fetch(
        `/dashboard/cosers/api?query=${filterText}&offset=0&limit=20&coserId=${coserId}`,
        {
          signal,
        }
      );
      let json = await res.json();

      return {
        items: json.results,
      };
    },
    initialSelectedKeys: [coserId],
  });

  return (
    <>
      <Autocomplete
        className="flex mb-4"
        variant="bordered"
        inputValue={list.filterText}
        isLoading={list.isLoading}
        items={list.items}
        labelPlacement="outside-left"
        label="Coser"
        placeholder="选择你的Coser"
        onSelectionChange={(value) => {
          onSelectCoser && onSelectCoser(value);
        }}
        onInputChange={list.setFilterText}>
        {(item) => (
          <AutocompleteItem key={item.id} className="capitalize">
            {item.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
}
