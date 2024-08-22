"use client";
import Link from "next/link";
import { Suspense } from "react";
import { CosplayCover } from "./cosplay-cover";
import { CosplayCoverSkeleton } from "../skeletons/image-group-skeleton";
import { Avatar } from "@nextui-org/react";
import { Cosplay } from "@/app/lib/definitions";
import PopunderAds from "@/components/exoclick-ads/Popunder";

export function CosplayItem({ item }: { item: Cosplay }) {
  const handleLinkClick = (url: string) => (event: React.MouseEvent) => {
    event.preventDefault(); // 阻止默认的链接跳转行为
    document.addEventListener("creativeDisplayed-5393266", console.log, false);
    window.open(url, "_blank"); // 在新标签页中打开链接
  };
  return (
    <>
      <PopunderAds></PopunderAds>
      <Link
        href={`/front/cosplays/${item.id}?name=${item.coser?.name}&coserId=${item.coser?.id}&title=${item.title}`}
        className="space-y-3 flex-auto flex flex-col"
        onClick={handleLinkClick(
          `/front/cosplays/${item.id}?name=${item.coser?.name}&coserId=${item.coser?.id}&title=${item.title}`
        )}>
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
        {item.coser?.avatar ? (
          <Avatar
            size="sm"
            color="default"
            showFallback={true}
            src={item.coser.avatar || ""}
            className="shrink-0 overflow-hidden rounded-full h-7 w-7"
          />
        ) : (
          <Avatar
            size="sm"
            color="default"
            showFallback={true}
            name={item.coser?.name && item.coser?.name[0]}
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
