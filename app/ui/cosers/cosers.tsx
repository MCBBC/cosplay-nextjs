import Link from "next/link";
import { BreadcrumbsComponents } from "../breadcrumbs/breadcrumbs";
import { CustomPagination } from "../common/pagination";
import Search from "../../../components/Search";
import { Avatar } from "@nextui-org/react";
import {
  fetchCoserList,
  fetchCoserPages,
} from "@/app/lib/fetchData/fetchCoser";
import { Coser } from "@/app/lib/definitions";
import { Suspense } from "react";
import { CosersListSkeleton } from "../skeletons/cosers-skeleton";
import AdsterraNativeBannerDom from "@/components/AdsterraNativeBannerDom";
// import { AdBanner } from "@/components/AdBanner";

export async function CosersMain({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const breads = [
    { path: "/front", name: "首页" },
    { path: "/front/cosers", name: "Cosers" },
  ];

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCoserPages({ query });
  return (
    <>
    
      <BreadcrumbsComponents breads={breads}></BreadcrumbsComponents>
      <Search placeholder="输入名字搜索" className="mx-auto" />
      <CoserList currentPage={currentPage} query={query} />
      <CustomPagination totalPages={totalPages} />
      <AdsterraNativeBannerDom></AdsterraNativeBannerDom>
    </>
  );
}

export async function CoserList({
  currentPage,
  query,
}: {
  currentPage: number;
  query: string;
}) {
  const data = await fetchCoserList({ currentPage, query });
  return (
    <div className="py-6 mt-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 gap-y-5">
        <Suspense fallback={<CosersListSkeleton />}>
          {data.map((_item, index) => (
            <CoserItem coser={_item} key={index} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}

export function CoserItem({ coser }: { coser: Coser }) {
  return (
    <Link
      href={`/front/cosers/${coser.id}`}
      className="flex items-center transition-all hover:bg-accent p-3">
      <Avatar
        name={coser.name[0]}
        src={coser.avatar || ""}
        className="w-9 h-9"
        showFallback={true}
      />
      <h3 className="font-medium leading-none text-sm ml-2 truncate">
        {coser.name}
      </h3>
    </Link>
  );
}
