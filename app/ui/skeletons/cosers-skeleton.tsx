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

export function CoserBackgroundImageSkeleton() {
  return (
    <div
      className="relative w-full rounded-none"
      style={{ paddingBottom: "25%" }}></div>
  );
}

export function CoserDetailBackGroundSkeleton() {
  return (
    <Skeleton>
      <div className="relative">
        <CoserBackgroundImageSkeleton />
        <div className="flex items-end p-3 md:px-6 md:pb-4 md:pt-3 border border-solid border-gray-200">
          <Avatar
            className="w-20 md:w-32 h-20 md:h-32 p-1 md:p-2 border border-solid border-gray-200 bg-white -mt-16 z-10"
            radius="sm"
          />
          <div className="ml-4 md:ml-5 w-full -mt-16 md:mt-0 z-10">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white md:text-slate-950 mb-1 md:mb-2"></h4>
            <CoserDetailContactInformationSkeleton />
          </div>
        </div>
      </div>
    </Skeleton>
  );
}

export function CoserDetailContactInformationSkeleton() {
  return (
    <Skeleton>
      <div className="flex space-x-1 w-0 min-w-full overflow-x-auto"></div>
    </Skeleton>
  );
}
