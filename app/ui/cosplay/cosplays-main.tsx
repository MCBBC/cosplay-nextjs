"use client";
import { Breadcrumbs, BreadcrumbItem, Pagination } from "@nextui-org/react";

import { CosplayList } from "./cosplay-list";

export default function CosplayMain() {
  return (
    <>
      <Breadcrumbs
        className="py-3"
        separator="/"
        itemClasses={{
          separator: "px-2",
        }}>
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>Cosplays</BreadcrumbItem>
      </Breadcrumbs>

      <Pagination showControls total={10} initialPage={1} />
    </>
  );
}
