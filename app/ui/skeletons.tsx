import { Avatar } from "@nextui-org/react";
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function ImageItem() {
  return (
    <div className={`${shimmer} space-y-3 relative`}>
      <div className="space-y-3">
        <div className="overflow-hidden rounded-md relative">
          <div className="h-332 w-249 object-cover transition-all hover:scale-105 aspect-[3/4]"></div>
        </div>
        <div className="space-y-1 text-md">
          <h3 className="font-medium leading-none truncate pr-9">加载中</h3>
        </div>
      </div>
      <div className="flex items-center h-8 justify-between items-center">
        <Avatar
          className="w-1.5"
          name="加载中"
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        />
      </div>
    </div>
  );
}

export function CosplayListSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
      {Array(30).map((_item, index) => (
        <ImageItem key={index} />
      ))}
    </div>
  );
}
