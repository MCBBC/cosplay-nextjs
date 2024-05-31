import { Skeleton, Avatar } from "@nextui-org/react";

export function CoserItemSkeleton() {
  return (
    <Skeleton className="py-6 mt-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 gap-y-5">
        {Array.from({ length: 20 }, (_item, index) => (
          <CosersListSkeleton key={index} />
        ))}
      </div>
    </Skeleton>
  );
}
export function CosersListSkeleton() {
  return (
    <Skeleton className="flex items-center transition-all hover:bg-accent p-3">
      <Avatar name="Junior" className="w-9 h-9" />
      <h3 className="font-medium leading-none text-sm ml-2 truncate">Junior</h3>
    </Skeleton>
  );
}
