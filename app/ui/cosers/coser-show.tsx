import { fetchCosplayByCoserId } from "@/app/lib/fetchData/data";
import Link from "next/link";
import { Suspense } from "react";
import {
  CosPlayItemSkeleton,
  CosplayCoverSkeleton,
} from "../skeletons/image-group-skeleton";
import { Cosplay } from "@/app/lib/definitions";
import { CosplayCover } from "@/app/ui/cosplay/cosplay-cover";

export async function CosplayList({
  coserId,
  currentPage,
  queryProduction,
  queryCharacter,
}: {
  coserId?: string | number;
  currentPage?: string;
  queryProduction?: string;
  queryCharacter?: string;
}) {
  const _coserId = coserId || 0;

  const _queryProduction = queryProduction || "";
  const _queryCharacter = queryCharacter || "";
  const _currentPage = Number(currentPage) || 1;

  const dataList = await fetchCosplayByCoserId({
    coserId: _coserId,
    currentPage: _currentPage,
  });

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
        href={`/front/cosplays/${item.id}?name=${item.coser?.name}&coserId=${item.coser?.id}`}
        className="space-y-3 flex-auto flex flex-col"
        title={item.coser?.name}>
        <div className="overflow-hidden rounded-md relative flex-auto">
          <Suspense fallback={<CosplayCoverSkeleton />}>
            <CosplayCover src={item.cover || ""} />
          </Suspense>
        </div>
        <div className="space-y-1 text-md">
          <h3 className="font-medium leading-none truncate pr-9">
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground truncate">{item.title}</p>
        </div>
      </Link>
    </>
  );
}
