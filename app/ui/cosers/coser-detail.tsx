import Link from "next/link";
import { BreadcrumbsComponents } from "../breadcrumbs/breadcrumbs";
import { Image, Avatar } from "@nextui-org/react";
import { Suspense } from "react";
import { CoserDetailBackGroundSkeleton } from "../skeletons/cosers-skeleton";
import { CosplayList } from "./coser-show";
import { CustomPagination } from "../common/pagination";
import { fetchCosplayPagesByCoserId } from "@/app/lib/fetchData/data";
import { CoserDetailSearch } from "./coser-detail-search";
export async function CoserDetailMain({
  name,
  id,
  searchParams,
}: {
  name: string;
  id: number | string;
  searchParams?: {
    queryProduction?: string;
    queryCharacter?: string;
    page?: string;
  };
}) {
  const breads = [
    { path: "/front", name: "首页" },
    { path: "/front/cosers", name: "Cosers" },
    { path: "", name: name },
  ];
  const totalPages = await fetchCosplayPagesByCoserId({ coserId: id });

  return (
    <>
      <BreadcrumbsComponents breads={breads} />
      <CoserBackground coserId={id} name={name} />
      <CoserDetailSearch />
      <CosplayList
        coserId={id}
        currentPage={searchParams?.page}
        queryCharacter={searchParams?.queryCharacter}
        queryProduction={searchParams?.queryProduction}
      />
      {totalPages > 1 ? <CustomPagination totalPages={totalPages} /> : <></>}
    </>
  );
}

export async function CoserBackgroundImage() {
  return (
    <div className="relative w-full" style={{ paddingBottom: "25%" }}>
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <Image
          classNames={{
            img: "object-cover rounded-none absolute h-full w-full top-0 let-0 bottom-0 right-0",
            wrapper:
              "!max-w-full h-full w-full top-0 let-0 bottom-0 right-0 rounded-none",
          }}
          src="https://image.sharecosplay.com/efdb34b1-3f6b-4a92-b979-cdb1c6b5698e"
          alt="background"
        />
      </div>
    </div>
  );
}

export async function CoserBackground({
  coserId,
  name,
}: {
  coserId: string | number;
  name: string;
}) {
  await new Promise((resolve) => {
    setTimeout(resolve, 6000);
  });
  return (
    <Suspense fallback={<CoserDetailBackGroundSkeleton />}>
      <div className="relative">
        <CoserBackgroundImage />
        <div className="flex items-end p-3 md:px-6 md:pb-4 md:pt-3 border border-solid border-gray-200">
          <Avatar
            color="default"
            showFallback
            className="w-20 md:w-32 h-20 md:h-32 p-1 md:p-2 border border-solid border-gray-200 bg-white -mt-16 z-10 shrink-0"
            name={name[0]}
            radius="sm"
          />
          <div className="ml-4 md:ml-5 w-full -mt-16 md:mt-0 z-10">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white md:text-slate-950 mb-1 md:mb-2">
              {name}
            </h4>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export function CoserContactInformation() {
  const contactList = [
    { title: "Twitter", src: "" },
    { title: "Facebook", src: "" },
    { title: "Instagram", src: "" },
    { title: "微博", src: "" },
  ];
  return (
    <div className="flex space-x-1 w-0 min-w-full overflow-x-auto">
      {contactList.map((item, index) =>
        item.src ? (
          <Link
            key={index}
            className="text-gray-900"
            href={item.src}
            title={item.title}></Link>
        ) : (
          <div className="text-gray-400" title={item.title} key={index}></div>
        )
      )}
    </div>
  );
}
