import { Button, Skeleton } from "@nextui-org/react";

export function CosplayTitleSkeleton() {
  return (
    <Skeleton>
      <h2 className="pb-2 text-3xl font-semibold">test</h2>
    </Skeleton>
  );
}
export function CosplayInfoSkeleton() {
  return (
    <div className="flex space-x-4 mt-4 mb-6">
      <Skeleton>
        <div className="text-sm text-muted-foreground">loading</div>
      </Skeleton>
    </div>
  );
}

export function CosplayImageSkeleton() {
  return (
    <Skeleton>
      <div className="aspect-[3/4]"></div>
    </Skeleton>
  );
}

export function CosplayImageListSkeleton() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 w-full">
        {Array.from({ length: 12 }, (item, index) => (
          <CosplayImageSkeleton key={index} />
        ))}
      </div>
    </>
  );
}

export function CosplayContainerSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 w-full">
        {Array.from({ length: 12 }, (item, index) => (
          <CosplayImageSkeleton key={index} />
        ))}
      </div>
      <div className="mt-4">
        <Button>加载更多</Button>
      </div>
    </div>
  );
}

export function PopularRecommendSkeleton() {
  return (
    <Skeleton>
      <div className="ml-0 md:ml-8 mt-6 md:mt-0 min-w-64 max-w-64">
        <p className="text-sm text-muted-foreground">热门推荐</p>
        <div className="flex flex-col mt-5 space-y-6">
          {Array.from({ length: 6 }, (item, index) => (
            <div className="flex" key={index}>
              <div className="relative w-28 h-20"></div>
              <div className="flex flex-col justify-between my-1 ml-2">
                <small className="text-sm font-medium line-clamp-2">
                  title
                </small>
                <p className="text-sm text-muted-foreground">2024/06/12</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Skeleton>
  );
}

export function GuessYouLikeSkeleton() {
  return (
    <>
      <p className="text-sm text-muted-foreground">猜你喜欢</p>
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-5 mt-5">
        {Array.from({ length: 6 }, (item, index) => (
          <Skeleton key={index}>
            <div className="w-full h-32 xl:h-36 2xl:h-32"></div>
          </Skeleton>
        ))}
      </div>
    </>
  );
}

export function CosplayShowMainSkeleton() {
  return (
    <>
      <div className="py-3 flex">
        <Skeleton>
          <span>123</span>
        </Skeleton>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full">
          <CosplayTitleSkeleton />
          <CosplayInfoSkeleton />
          <CosplayContainerSkeleton />
          <div className="mt-6">
            <GuessYouLikeSkeleton />
          </div>
        </div>
        <div className="ml-0 md:ml-8 mt-6 md:mt-0 min-w-64 max-w-64">
          <PopularRecommendSkeleton />
        </div>
      </div>
    </>
  );
}
