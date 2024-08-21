import Link from "next/link";

import { Avatar } from "@nextui-org/react";
import { Suspense } from "react";
import {
  CosPlayItemSkeleton,
  CosplayCoverSkeleton,
} from "../skeletons/image-group-skeleton";
import { Cosplay } from "@/app/lib/definitions";
import { CosplayCover } from "./cosplay-cover";

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

export function CosplayItem({ item }: { item: Cosplay }) {
  return (
    <>
      <Link
        href={`/front/cosplays/${item.id}?name=${item.coser?.name}&coserId=${item.coser?.id}&title=${item.title}`}
        className="space-y-3 flex-auto flex flex-col">
        <div className="overflow-hidden rounded-md relative flex-auto">
          <Suspense fallback={<CosplayCoverSkeleton />}>
            <CosplayCover src={item.cover || ""} />
          </Suspense>
        </div>
        <div className="space-y-1 text-md">
          <h3 className="font-medium leading-none truncate pr-9">
            {item.title}
          </h3>
        </div>
      </Link>
      <Link
        href={`/front/cosers/${item.coser?.id}`}
        className="flex items-center h-8 items-center">
        {/* <Avatar
          size="sm"
          color="default"
          showFallback={true}
          name={item.coser?.name && item.coser?.name[0]}
          src={item.coser?.avatar || ""}
          className="shrink-0 overflow-hidden rounded-full h-7 w-7"
        /> */}
        {item.coser?.name ? (
          <Avatar
            size="sm"
            color="default"
            showFallback={true}
            name={item.coser.name[0]}
            className="shrink-0 overflow-hidden rounded-full h-7 w-7"
          />
        ) : (
          <Avatar
            size="sm"
            color="default"
            showFallback={true}
            src={item.coser?.avatar || ""}
            className="shrink-0 overflow-hidden rounded-full h-7 w-7"
          />
        )}

        <h3 className="font-medium leading-none text-sm ml-1 truncate">
          {item.coser?.name}
        </h3>
      </Link>
    </>
  );
}
