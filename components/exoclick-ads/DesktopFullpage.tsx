"use client";

import { useRouter } from "next-nprogress-bar";
import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
};

const DesktopFullpage = ({ className }: Props) => {
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
        ((window as any).AdProvider = (window as any).AdProvider || []).push({
          serve: {},
        });
      } catch (error: any) {
        console.log(error.message);
      }
    }
  }, [isClient, router]);
  return (
    <div ref={adRef}>
      {isClient && <ins className="eas6a97888e35" data-zoneid="5393114"></ins>}
    </div>
  );
};

export default DesktopFullpage;
