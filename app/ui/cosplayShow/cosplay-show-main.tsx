import Link from "next/link";
import { BreadcrumbsComponents } from "../breadcrumbs/breadcrumbs";
import { Image } from "@nextui-org/react";
import { EyeIcon } from "@heroicons/react/24/outline";

import { Suspense } from "react";
import {
  CosplayContainerSkeleton,
  CosplayTitleSkeleton,
  GuessYouLikeSkeleton,
} from "@/app/ui/skeletons/cosplay-show-skeleton";
import {
  fetchCosplayShowById,
  fetchGuessYouLike,
  fetchPopularRecommend,
} from "@/app/lib/fetchData/fetchCosplayShow";
import { DateFormatter } from "@internationalized/date";
import { ImageListWrapper } from "./image-show";
import { Cosplay } from "@/app/lib/definitions";
import { CosplayFlatCover } from "../cosplay/cosplay-cover";
import { addCosplayView } from "@/app/lib/actions/cosplays-show";

export function CosplayShowTitle({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}
export function GuessLikeItem({ cosplay }: { cosplay: Cosplay }) {
  const toDate = new Date(cosplay?.creation_date!.toString() || "2024/05/20");
  const date = new DateFormatter("local").format(toDate);
  return (
    <Link
      href={`/front/cosplays/${cosplay.id}?name=${cosplay.coser?.name}&coserId=${cosplay.coser?.id}&title=${cosplay.title}`}>
      <div className="relative w-full h-32 xl:h-36 2xl:h-32">
        <CosplayFlatCover src={cosplay.cover || ""} />
      </div>
      <small className="mt-2 h-10 text-sm font-medium line-clamp-2">
        {cosplay.title}
      </small>
      <div className="flex justify-between mt-2">
        <small className="text-sm text-muted-foreground">{date}</small>
        <small className="flex items-center text-sm text-muted-foreground">
          <EyeIcon className="h-4 w-4 mr-[2px]" />
          &nbsp;{cosplay.view_count}
        </small>
      </div>
    </Link>
  );
}
export async function GuessYouLike({ coserId }: { coserId: string }) {
  const data = await fetchGuessYouLike(coserId);
  return (
    <>
      <p className="text-sm text-muted-foreground">猜你喜欢</p>
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-5 mt-5">
        <Suspense fallback={<GuessYouLikeSkeleton />}>
          {data?.map((item, index) => (
            <GuessLikeItem cosplay={item} key={index} />
          ))}
        </Suspense>
      </div>
    </>
  );
}

export async function CosplayInfo({
  date,
  viewCount,
}: {
  date: string;
  viewCount: string | number;
}) {
  return (
    <div className="flex space-x-4 mt-4 mb-6">
      <div className="text-sm text-muted-foreground">{date}</div>
      <div className="text-sm text-muted-foreground">•</div>
      <div className="text-sm text-muted-foreground">
        {viewCount}&nbsp;&nbsp;浏览
      </div>
    </div>
  );
}

export function PopularItem({ recommend }: { recommend: Cosplay }) {
  const toDate = new Date(recommend?.creation_date!.toString() || "2024/05/20");
  const date = new DateFormatter("local").format(toDate);

  return (
    <Link
      href={`/front/cosplays/${recommend.id}?name=${recommend.coser?.name}&coserId=${recommend.coser?.id}&title=${recommend.title}`}
      className="transition-all hover:scale-105 flex"
      target="_blank">
      <Image
        src={recommend.cover || ""}
        classNames={{
          wrapper: "shrink-0 bg-gray-300",
        }}
        className="relative w-28 h-20 object-cover"
        alt="cover"
        loading="lazy"
        decoding="async"></Image>
      <div className="flex flex-col justify-between my-1 ml-2">
        <small className="text-sm font-medium line-clamp-2">
          {recommend.title}
        </small>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </Link>
  );
}

export async function PopularRecommend() {
  const data = await fetchPopularRecommend(8);
  return (
    <>
      <p className="text-sm text-muted-foreground">热门推荐</p>
      <div className="flex flex-col mt-5 space-y-6">
        {data.map((item, index) => (
          <PopularItem recommend={item} key={index} />
        ))}
      </div>
    </>
  );
}

export async function CosplayShowContainer({
  cosplayId,
}: {
  cosplayId: string;
}) {
  const data = await fetchCosplayShowById(cosplayId);
  const toDate = new Date(data?.creation_date!.toString() || "2024/05/20");
  const date = new DateFormatter("local").format(toDate);
  data?.id &&
    typeof data?.view_count !== "undefined" &&
    (await addCosplayView({
      cosplayId: data?.id.toString(),
      viewCount: data?.view_count + 1,
    }));
  return (
    <>
      <Suspense fallback={<CosplayTitleSkeleton />}>
        <CosplayShowTitle title={data?.title || ""} />
      </Suspense>
      <CosplayInfo date={date} viewCount={data?.view_count || 0} />
      <Suspense fallback={<CosplayContainerSkeleton />}>
        <div className="flex flex-col items-center">
          <ImageListWrapper
            markdownContent={
              data?.content || Array.from({ length: 12 }, (item) => "")
            }
          />
        </div>
      </Suspense>
    </>
  );
}

export async function CosplayShowMain({
  cosplayId,
  cosplayName,
  coserId,
}: {
  cosplayId: string;
  cosplayName: string;
  coserId: string;
}) {
  const breads = [
    { path: "/front", name: "首页" },
    { path: "/front/cosers", name: "Cosers" },
    { path: `/front/cosplays/${cosplayId}`, name: cosplayName },
  ];

  return (
    <>
      <BreadcrumbsComponents breads={breads} />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full">
          <CosplayShowContainer cosplayId={cosplayId} />
          <div className="mt-6">
            <GuessYouLike coserId={coserId} />
          </div>
        </div>
        <div className="ml-0 md:ml-8 mt-6 md:mt-0 min-w-64 max-w-64">
          <PopularRecommend />
        </div>
      </div>
    </>
  );
}
