import { BreadcrumbsComponents } from "../breadcrumbs/breadcurmbs";

import { CosplayList } from "./cosplay_list";
import { Suspense } from "react";
import { CosplayListSkeleton } from "../skeletons/image_group_skeleton";
import { CustomPagination } from "./pagination";
import { fetchCosplayPages } from "@/app/lib/fetch_data/data";
export default async function CosplayMain({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const breads = [
    { path: "/front", name: "首页" },
    { path: "/front/cosplays", name: "Cosplays" },
  ];
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCosplayPages(query);
  return (
    <>
      <BreadcrumbsComponents breads={breads} />
      <Suspense fallback={<CosplayListSkeleton />}>
        <CosplayList currentPage={currentPage} />
      </Suspense>
      <CustomPagination totalPages={totalPages} />
    </>
  );
}
