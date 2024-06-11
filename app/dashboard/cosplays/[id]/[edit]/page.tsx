import { fetchCosplayShowById } from "@/app/lib/fetchData/fetchCosplayShow";
import { BreadcrumbsComponents } from "@/app/ui/breadcrumbs/breadcrumbs";
import CosplayEditWrapper from "@/app/ui/dashboard/cosplays/cosplays-edit-wrapper";
import { fetchCoserList } from "@/app/lib/fetchData/fetchCoser";

export default async function Page({
  params,
  searchParams,
}: {
  params?: { id?: number };
  searchParams?: { currentPage: string; query: string };
}) {
  const cosplayId = params?.id || "0";
  const currentPage = Number(searchParams?.currentPage || 1);
  const query = searchParams?.query || "";
  const detail = await fetchCosplayShowById(cosplayId);
  const coserList = await fetchCoserList({ currentPage, query });
  const breads = [
    { path: "/dashboard", name: "主页" },
    { path: "/dashboard/cosplays", name: "Cosplay" },
    { path: "/dashboard/cosplays", name: "编辑" },
  ];
  return (
    <main className="px-8 h-full flex flex-col">
      <BreadcrumbsComponents breads={breads}></BreadcrumbsComponents>
      <CosplayEditWrapper detail={detail} coserList={coserList} />
    </main>
  );
}
