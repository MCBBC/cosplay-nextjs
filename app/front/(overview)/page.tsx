import { CosplayList } from "@/app/ui/cosplay/cosplay_list";
import { CosplayListSkeleton } from "@/app/ui/skeletons/image_group_skeleton";
import { BellIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { AdUnit } from "next-google-adsense";
import { InformationStream } from "@/app/ui/google_ads/ads";
export default async function Page() {
  const currentPage = 1;
  return (
    <>
      <div className="h-6"></div>
      <div className="flex items-center space-x-2 mb-6 p-2 rounded-lg border text-foreground text-sm">
        <BellIcon className="w-4 h-4" />
        <p>项目还未完工,有些许BUG</p>
      </div>
      <Suspense fallback={<CosplayListSkeleton />}>
        <CosplayList query={""} currentPage={currentPage}></CosplayList>
      </Suspense>
      <AdUnit
        publisherId="pub-5901616898778649"
        slotId="1013737103"
        layout="display"
      />
    </>
  );
}
