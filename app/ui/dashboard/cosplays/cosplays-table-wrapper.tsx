import { Cosplay } from "@/app/lib/definitions";
import CosplaysTable from "./cosplays-table";
import { fetchCosplayDashBoard, fetchCosplayPages } from "@/app/lib/fetchData/data";
import { CustomPagination } from "@/app/ui/cosplay/pagination";
import { SearchComponents } from "./search-wrapper";

export default async function CosplaysTableWrapper({
  currentPage,
  query,
}: {
  currentPage: number;
  query: string;
}) {
  const users: Cosplay[] = await fetchCosplayDashBoard(currentPage, query);
  const totalPages = await fetchCosplayPages(query);

  return (
    <>
      <SearchComponents />
      <CosplaysTable tableData={users} />
      <CustomPagination totalPages={totalPages} />
    </>
  );
}
