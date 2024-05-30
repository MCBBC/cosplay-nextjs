"use client";

import { Image, Button } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import {
  CosplayImageListSkeleton,
  CosplayImageSkeleton,
} from "../skeletons/cosplay_show_skeleton";
import Fancybox from "./fancybox";

export function ImageShow({ src }: { src: string }) {
  const [loadingFlag, setLoadingFlag] = useState(true);
  return (
    <a
      data-fancybox="gallery"
      className="overflow-hidden rounded-md cursor-zoom-in "
      href={src}>
      {loadingFlag ? <CosplayImageSkeleton /> : null}
      <Image
        alt="图片"
        src={src}
        // width={249}
        // height={332}
        onLoad={() => setLoadingFlag(false)}
        className={`object-cover aspect-[3/4]  ${
          loadingFlag ? "invisible w-0 h-0" : "h-auto w-auto"
        }`}
      />
    </a>
  );
}

export function ImageListWrapper({
  markdownContent,
}: {
  markdownContent: string | string[];
}) {
  const imageSrcs: string[] = useMemo(() => {
    const tempImageSrcs: string[] = [];
    if (Object.prototype.toString.call(markdownContent) === "[object Array]") {
      tempImageSrcs.push(...markdownContent);
    } else if (typeof markdownContent === "string") {
      const regex = /!\[\]\((.*?)\)/g;
      let match;
      while ((match = regex.exec(markdownContent)) !== null) {
        tempImageSrcs.push(match[1]);
      }
    } else {
      throw new Error(
        "markdownContent is neither a string nor an array of strings"
      );
    }
    return tempImageSrcs;
  }, [markdownContent]);

  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(12);

  useEffect(() => {
    setLoadedImages(imageSrcs.slice(0, 12));
  }, [imageSrcs]);

  const loadMoreImages = () => {
    const nextIndex = currentIndex + 12;
    setLoadedImages(imageSrcs.slice(0, nextIndex));
    setCurrentIndex(nextIndex);
  };

  return (
    <>
      {loadedImages.length === 0 ? (
        <CosplayImageListSkeleton />
      ) : (
        <Fancybox
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 w-full"
          options={{
            Carousel: {
              infinite: false,
            },
          }}>
          {loadedImages.map((item, index) => (
            <ImageShow src={item} key={index} />
          ))}
        </Fancybox>
      )}

      <Button
        className="mt-4"
        color="primary"
        variant="solid"
        onClick={loadMoreImages}>
        加载更多
      </Button>
    </>
  );
}
