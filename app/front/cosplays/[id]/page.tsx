import { CosplayShowMain } from "@/app/ui/cosplayShow/cosplay-show-main";
// import { AdBanner } from "@/components/AdBanner";
import { Metadata } from "next/types";

export function generateMetadata({
  searchParams,
}: {
  params?: { id: string };
  searchParams?: {
    title?: string;
  };
}): Metadata {
  return {
    title: searchParams?.title,
  };
}

export default async function Page({
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
      {/* <AdBanner
        dataAdFormat="fluid"
        dataFullWidthResponsive={false}
        dataAdSlot="6557707820"
      /> */}
    </>
  );
}
