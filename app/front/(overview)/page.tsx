import { CosplayList } from "@/app/ui/cosplay/cosplay-list";
import { CosplayListSkeleton } from "@/app/ui/skeletons/image-group-skeleton";
import { BellIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import AdsterraNativeBannerDom from "@/components/AdsterraNativeBannerDom";
import { fetchRandomRecommend } from "@/app/lib/fetchData/fetchCosplayShow";
import NotificationModal from "@/app/ui/modal";

export default async function Page() {
  const dataList = await fetchRandomRecommend(30);

  return (
    <>
      <div className="h-6"></div>
      <div className="flex items-center space-x-2 mb-6 p-2 rounded-lg border text-foreground text-sm">
        <BellIcon className="w-4 h-4" />
        <p>项目还未完工,有些许BUG 邮箱:micromatrix@micromatrix.org</p>
        <p>网站转到sharecosplay.micromatrix.cf下</p>
      </div>
      <Suspense fallback={<CosplayListSkeleton />}>
        <CosplayList dataList={dataList}></CosplayList>
      </Suspense>
      <NotificationModal></NotificationModal>
      {/* <AdBanner
        dataAdFormat="fluid"
        dataFullWidthResponsive={false}
        dataAdSlot="1013737103"
      /> */}
      <AdsterraNativeBannerDom></AdsterraNativeBannerDom>
    </>
  );
}
