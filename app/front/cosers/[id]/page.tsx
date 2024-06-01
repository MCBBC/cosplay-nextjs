import { CoserDetailMain } from "@/app/ui/cosers/coser_detail";
export default function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    name?: string;
    page?: string;
  };
  params?: {
    id?: string;
  };
}) {
  const coserName = searchParams?.name || "";
  const coserId = params?.id || 0;
  return (
    <CoserDetailMain
      name={coserName}
      id={coserId}
      searchParams={searchParams}></CoserDetailMain>
  );
}
