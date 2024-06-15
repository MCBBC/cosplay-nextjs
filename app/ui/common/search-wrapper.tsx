"use client";
import { Button } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Search from "@/components/Search";
import Link from "next/link";

export function SearchComponents({addUrl}:{addUrl:string}) {
  return (
    <div className="flex justify-between gap-3 items-end my-2">
      <Search placeholder="搜索名字" />
      <div className="flex gap-3">
        <Link href={addUrl}>
          <Button color="primary" endContent={<PlusIcon className="w-4 h-4" />}>
            添加
          </Button>
        </Link>
      </div>
    </div>
  );
}
