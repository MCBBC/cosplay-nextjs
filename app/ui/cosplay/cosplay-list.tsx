import { fetchCosplay } from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";

export default async function CosplayList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const dataList = await fetchCosplay(query, currentPage);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
      {dataList?.map((item, index) => (
        <div className="space-y-3 relative" key={index}>
          <Link
            href={`front/cosplay?id=${item.id}`}
            className="space-y-3"
            target="_blank">
            <div className="overflow-hidden rounded-md relative">
              <Image
                src={item.cover || ""}
                alt="封面"
                width={229}
                height={332}
                className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
                unoptimized></Image>
            </div>
            <div className="space-y-1 text-md">
              <h3 className="font-medium leading-none truncate pr-9">
                {item.title}
              </h3>
            </div>
          </Link>
          <Link
            href={`front/coser/${item.cos_id}`}
            className="flex items-center h-8 items-center">
            <Avatar
              size="sm"
              showFallback
              name={item.cos_name[0]}
              src="https://images.unsplash.com/broken"
            />
            <h3 className="font-medium leading-none text-sm ml-1 truncate">
              {item.cos_name}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
