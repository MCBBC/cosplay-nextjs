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
  const cosplays = await fetchCosplayDashBoard({
    currentPage,
    query,
  });
  const totalPages = await fetchCosplayPages({ query, status: { not: 0 } });

  return (
    <>
      <SearchComponents addUrl="/dashboard/cosplays/create" />
      <CosplaysTable tableData={cosplays} />
      <CustomPagination totalPages={totalPages} />
    </>
  );
}
