import { Suspense } from "react";
import { CosPlayItemSkeleton } from "../skeletons/image-group-skeleton";
import { Cosplay } from "@/app/lib/definitions";
import { CosplayItem } from "./CosplayItem";

export async function CosplayList({ dataList }: { dataList: Cosplay[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
      {dataList?.map((item, index) => (
        <div className="space-y-3 relative  flex flex-col" key={index}>
          <Suspense fallback={<CosPlayItemSkeleton />}>
            <CosplayItem item={item}></CosplayItem>
          </Suspense>
        </div>
      ))}
    </div>
  );
}
