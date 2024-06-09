import CosplaysTableWrapper from "@/app/ui/dashboard/cosplays/cosplays-table-wrapper";
import { Suspense } from "react";
export default function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    page?: string;
    query?: string;
  };
  params?: {};
}) {
  const currentPage = Number(searchParams?.page || 1);
  const query = searchParams?.query || "";
  return (
    <>
      <div className="px-8">
        <Suspense>
          <CosplaysTableWrapper currentPage={currentPage} query={query} />
        </Suspense>
      </div>
    </>
  );
}
