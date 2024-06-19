import {
  fetchCoserList,
  fetchCoserPages,
} from "@/app/lib/fetchData/fetchCoser";
import { CustomPagination } from "@/app/ui/common/pagination";
import { SearchComponents } from "@/app/ui/common/search-wrapper";
import CoserTable from "@/app/ui/dashboard/coser/coser-table";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    query?: string;
  };
  params?: {};
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const [tableData, totalPages] = await Promise.all([
    fetchCoserList({ currentPage, query }),
    fetchCoserPages({ query }),
  ]);
  return (
    <div className="px-8">
      <SearchComponents addUrl="/dashboard/cosers/create" />
      <Suspense>
        <CoserTable tableData={tableData} />
      </Suspense>
      <CustomPagination totalPages={totalPages} />
    </div>
  );
}
