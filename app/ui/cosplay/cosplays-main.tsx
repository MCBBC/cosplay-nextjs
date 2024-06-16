import { BreadcrumbsComponents } from "../breadcrumbs/breadcrumbs";

import { CosplayList } from "./cosplay-list";
import { Suspense } from "react";
import { CosplayListSkeleton } from "../skeletons/image-group-skeleton";
import { CustomPagination } from "../common/pagination";
import { fetchCosplay, fetchCosplayPages } from "@/app/lib/fetchData/data";
import { AdBanner } from "@/components/AdBanner";
export default async function CosplayMain({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: number;
  };
}) {
  const breads = [
    { path: "/front", name: "首页" },
    { path: "/front/cosplays", name: "Cosplays" },
  ];
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const [totalPages, dataList] = await Promise.all([
    fetchCosplayPages({ query }),
    fetchCosplay({ currentPage, query }),
  ]);
  return (
    <>
      <BreadcrumbsComponents breads={breads} />
      <Suspense fallback={<CosplayListSkeleton />}>
        <CosplayList dataList={dataList} />
      </Suspense>
      <CustomPagination totalPages={totalPages} />
      <AdBanner
        dataAdFormat="fluid"
        dataFullWidthResponsive={false}
        dataAdSlot="1013737103"
      />
    </>
  );
}
