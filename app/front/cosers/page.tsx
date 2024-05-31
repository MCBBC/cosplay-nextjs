import { CosersMain } from "@/app/ui/cosers/cosers";
export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  return <CosersMain searchParams={searchParams}></CosersMain>;
}
