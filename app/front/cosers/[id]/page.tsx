import { fetchCoserInfoById } from "@/app/lib/fetchData/fetchCoser";
import { CoserDetailMain } from "@/app/ui/cosers/coser-detail";
export default async function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    page?: string;
  };
  params?: {
    id?: string;
  };
}) {
  const coserId = Number(params?.id) || 0;
  const coserInfo = await fetchCoserInfoById({ coserId: coserId });
  return (
    <CoserDetailMain
      coserInfo={coserInfo}
      searchParams={searchParams}></CoserDetailMain>
  );
}
