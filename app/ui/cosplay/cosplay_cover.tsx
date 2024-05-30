"use client";
import { Image } from "@nextui-org/react";
import { useState } from "react";
import { CosplayCoverSkeleton } from "../skeletons/image_group_skeleton";

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
        className={`object-cover transition-all hover:scale-105 aspect-[3/4] ${
          loadingFlag ? "invisible w-0 h-0" : "h-auto w-auto"
        }`}></Image>
    </>
  );
}
