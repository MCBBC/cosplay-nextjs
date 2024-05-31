"use client";
import { Pagination } from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
export function CustomPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { replace } = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    console.log("page", pageNumber);

    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      showControls
      total={totalPages}
      initialPage={currentPage}
      className="mx-auto flex w-full justify-center my-6"
      onChange={(page: number) => createPageURL(page)}
    />
  );
}
