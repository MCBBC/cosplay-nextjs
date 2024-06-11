import { fetchCosplayShowById } from "@/app/lib/fetchData/fetchCosplayShow";
import { BreadcrumbsComponents } from "@/app/ui/breadcrumbs/breadcrumbs";
import CosplayEditWrapper from "@/app/ui/dashboard/cosplays/cosplays-edit-wrapper";

export default async function Page({ params }: { params?: { id?: number } }) {
  const cosplayId = params?.id || 0;

  const detail = await fetchCosplayShowById(cosplayId);
  const breads = [
    { path: "/dashboard", name: "主页" },
    { path: "/dashboard/cosplays", name: "Cosplay" },
    { path: "/dashboard/cosplays", name: "编辑" },
  ];
  return (
    <main className="px-8 h-full flex flex-col">
      <BreadcrumbsComponents breads={breads}></BreadcrumbsComponents>
      <CosplayEditWrapper detail={detail} />
    </main>
  );
}
