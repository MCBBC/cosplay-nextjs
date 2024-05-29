"use client";
import Image from "next/image";
import { useState } from "react";
import { CosplayCoverSkeleton } from "../skeletons/image_group";

export function CosplayCover({ src }: { src: string | undefined }) {
  const [loadingFlag, setLoadingFlag] = useState(true);
  return (
    <>
      {loadingFlag ? <CosplayCoverSkeleton /> : null}

      <Image
        src={src || ""}
        alt="封面"
        width={229}
        height={332}
        onLoad={() => setLoadingFlag(false)}
        lazyBoundary=""
        className={`h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4] ${
          loadingFlag ? "invisible w-0 h-0" : ""
        }`}
        unoptimized></Image>
    </>
  );
}
