import { CosplayShowMain } from "@/app/ui/cosplay_show/cosplay_show_main";
import AdBanner from "@/components/AdBanner";
export default function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    name: string;
    coserId: string;
  };
  params?: {
    id: string;
  };
}) {
  const cosplayName = searchParams?.name || "";
  const cosplayId = params?.id || "0";
  const coserId = searchParams?.coserId || "0";
  return (
    <>
      <CosplayShowMain
        cosplayId={cosplayId}
        cosplayName={cosplayName}
        coserId={coserId}
      />
      <AdBanner
        dataAdFormat="fluid"
        dataFullWidthResponsive={false}
        dataAdSlot="6557707820"
      />
    </>
  );
}
