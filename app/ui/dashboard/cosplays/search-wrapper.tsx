"use client";
import { Button, Input } from "@nextui-org/react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import Search from "@/components/Search";

export function SearchComponents() {
  return (
    <div className="flex justify-between gap-3 items-end mb-4">
      <Search placeholder="搜索名字" />
      <div className="flex gap-3">
        <Button color="primary" endContent={<PlusIcon className="w-4 h-4" />}>
          添加
        </Button>
      </div>
    </div>
  );
}
