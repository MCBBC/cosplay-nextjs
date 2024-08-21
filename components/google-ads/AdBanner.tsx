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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 只在客户端渲染时设置 isClient 为 true
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      isClient &&
      adRef.current &&
      !adRef.current.getAttribute("data-loading-flag")
    ) {
      try {
        adRef.current.setAttribute("data-loading-flag", "true");
        // 尝试加载广告
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      } catch (error: any) {
        console.log(error.message);
      }
    }
  }, [isClient, router]);

  return (
    <div ref={adRef}>
      {isClient && (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5901616898778649"
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive.toString()}></ins>
      )}
    </div>
  );
};

export { AdBanner };
