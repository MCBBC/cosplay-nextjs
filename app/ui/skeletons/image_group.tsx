import { Avatar, Skeleton } from "@nextui-org/react";

export function ImageItemSkeleton() {
  return (
    <Skeleton>
      <div className="aspect-[3/4]"></div>
    </Skeleton>
  );
}

export function TitleSkeleton() {
  return (
    <Skeleton className="font-medium leading-none truncate pr-9">
      <h3>loading</h3>
    </Skeleton>
  );
}

export function AvatarSkeleton() {
  return (
    <Skeleton className="shrink-0 overflow-hidden rounded-full h-7 w-7">
      <Avatar size="sm" color="default" showFallback name="L" />
    </Skeleton>
  );
}

export function NameSkeleton() {
  return (
    <Skeleton className="font-medium leading-none text-sm ml-1 truncate">
      <h3>Loading</h3>
    </Skeleton>
  );
}

export function CosPlayItemSkeleton() {
  return (
    <div className="space-y-3 relative">
      <div className="space-y-3">
        <div className="overflow-hidden rounded-md relative">
          <ImageItemSkeleton></ImageItemSkeleton>
        </div>
        <div className="space-y-1 text-md">
          <TitleSkeleton></TitleSkeleton>
        </div>
      </div>
      <div className="flex items-center h-8 items-center">
        <AvatarSkeleton></AvatarSkeleton>
        <NameSkeleton></NameSkeleton>
      </div>
    </div>
  );
}

export function CosplayListSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
      {Array.from({ length: 30 }, (_item, index) => (
        <CosPlayItemSkeleton key={index} />
      ))}
    </div>
  );
}
