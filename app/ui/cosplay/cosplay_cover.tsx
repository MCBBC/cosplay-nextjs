"use client";
import { Image } from "@nextui-org/react";
import { useState } from "react";
import {
  CosplayCoverSkeleton,
  CosplayFlatCoverSkeleton,
} from "../skeletons/image_group_skeleton";

export function CosplayCover({ src }: { src: string | undefined }) {
  const [loadingFlag, setLoadingFlag] = useState(true);
  return (
    <>
      {loadingFlag ? <CosplayCoverSkeleton /> : null}
      <Image
        src={src || ""}
        alt="封面"
        onLoad={() => setLoadingFlag(false)}
        className={`object-cover transition-all  hover:scale-105 aspect-[3/4] ${
          loadingFlag ? "invisible w-0 h-0" : "h-auto w-auto"
        }`}></Image>
    </>
  );
}

export function CosplayFlatCover({ src }: { src: string | undefined }) {
  const [loadingFlag, setLoadingFlag] = useState(true);
  return (
    <>
      {loadingFlag ? <CosplayFlatCoverSkeleton /> : null}

      <Image
        src={src || ""}
        alt="封面"
        classNames={{ wrapper: "h-full w-full !max-w-full" }}
        onLoad={() => setLoadingFlag(false)}
        className={`object-cover rounded-md ${
          loadingFlag ? "invisible w-0 h-0" : "h-full w-full"
        }`}></Image>
    </>
  );
}
