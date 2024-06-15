"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};

const AdBanner = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}: AdBannerTypes) => {
  const adRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (adRef.current && !adRef.current.getAttribute("data-loading-flag")) {
      try {
        adRef.current.setAttribute("data-loading-flag", "true");
        // 尝试加载广告
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );

        // 检测广告位是否被填充内容
        setTimeout(() => {
          let flag = AdBlockDetect(adRef.current);
          if (flag) {
            router.push("/adBlock");
          }
        }, 4000); // 可能需要调整这个时间，确保广告有足够时间加载
      } catch (error: any) {
        console.log(error.message);
      }
    }
  }, []);

  return (
    <div ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5901616898778649"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}></ins>
    </div>
  );
};

/**
 * @Author: HideInMatrix
 * @description: 检测Google广告是否被屏蔽
 * @return {*}
 * @Date: 2024-06-15
 */
function AdBlockDetect(adRef: HTMLDivElement | null) {
  if (!adRef?.firstChild?.firstChild) {
    // 如果广告位没有被填充内容，认为广告可能被屏蔽
    return true;
  }
  return false;
}

export { AdBanner, AdBlockDetect };
