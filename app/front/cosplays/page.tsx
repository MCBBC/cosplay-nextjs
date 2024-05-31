import CosplayMain from "@/app/ui/cosplay/cosplays_main";

export default function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
  params?: {
    id: number;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = searchParams?.page || "1";

  return (
    <CosplayMain searchParams={{ query, page: currentPage }}></CosplayMain>
  );
}
