import { Cosplay } from "@/app/lib/definitions";
import CosplaysTable from "./cosplays-table";
import {
  fetchCosplayDashBoard,
  fetchCosplayPages,
} from "@/app/lib/fetchData/data";
import { CustomPagination } from "@/app/ui/common/pagination";
import { SearchComponents } from "../../common/search-wrapper";

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
      <SearchComponents addUrl="/dashboard/cosplays/create" />
      <CosplaysTable tableData={users} />
      <CustomPagination totalPages={totalPages} />
    </>
  );
}
