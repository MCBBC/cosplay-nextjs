import { BreadcrumbsComponents } from "@/app/ui/breadcrumbs/breadcrumbs";
import CosplayAddWrapper from "@/app/ui/dashboard/cosplays/cosplays-add-wrapper";

export default function Page() {
  const breads = [
    { path: "/dashboard", name: "主页" },
    { path: "/dashboard/cosplays", name: "Cosplay" },
    { path: "/dashboard/cosplays", name: "新增" },
  ];
  return (
    <main className="px-8 h-full flex flex-col overflow-auto">
      <BreadcrumbsComponents breads={breads}></BreadcrumbsComponents>
      <CosplayAddWrapper />
    </main>
  );
}
