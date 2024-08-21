"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const AdsterraNativeBannerDom = () => {
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
      {isClient && <div id="container-09f1f8d46834983118d9266f5b4eaf90"></div>}
    </div>
  );
};

export default AdsterraNativeBannerDom;
