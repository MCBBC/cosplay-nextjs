"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
export function BreadcrumbsComponents({
  breads,
}: {
  breads: { path: string; name: string }[];
}) {
  return (
    <>
      <Breadcrumbs
        className="py-3"
        separator="/"
        itemClasses={{
          separator: "px-2",
        }}>
        {breads.map((item) => (
          <BreadcrumbItem key={item.name} href={item.path}>
            {item.name}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </>
  );
}
