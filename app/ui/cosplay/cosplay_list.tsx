import { fetchCosplay } from "@/app/lib/fetch_data/data";
import Link from "next/link";

import { Avatar } from "@nextui-org/react";
import { Suspense } from "react";
import {
  CosPlayItemSkeleton,
  CosplayCoverSkeleton,
} from "../skeletons/image_group_skeleton";
import { Cosplay } from "@/app/lib/definitions";
import { CosplayCover } from "./cosplay_cover";

export async function CosplayList({
  query,
  currentPage,
}: {
  query?: string;
  currentPage: number;
}) {
  const dataList = await fetchCosplay(currentPage, query);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
      {dataList?.map((item, index) => (
        <div key={index}>
          <Suspense fallback={<CosPlayItemSkeleton />}>
            <CosplayItem item={item}></CosplayItem>
          </Suspense>
        </div>
      ))}
    </div>
  );
}

export function CosplayItem({ item }: { item: Cosplay }) {
  return (
    <div className="space-y-3 relative">
      <Link
        href={`/front/cosplays/${item.id}?name=${item.cos_name}&coserId=${item.cos_id}`}
        className="space-y-3"
        target="_blank">
        <div className="overflow-hidden rounded-md relative">
          <Suspense fallback={<CosplayCoverSkeleton />}>
            <CosplayCover src={item.cover} />
          </Suspense>
        </div>
        <div className="space-y-1 text-md">
          <h3 className="font-medium leading-none truncate pr-9">
            {item.title}
          </h3>
        </div>
      </Link>
      <Link
        href={`front/coser/${item.cos_id}`}
        className="flex items-center h-8 items-center">
        <Avatar
          size="sm"
          color="default"
          showFallback
          name={item.cos_name[0]}
          className="shrink-0 overflow-hidden rounded-full h-7 w-7"
        />

        <h3 className="font-medium leading-none text-sm ml-1 truncate">
          {item.cos_name}
        </h3>
      </Link>
    </div>
  );
}
