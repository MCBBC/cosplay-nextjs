"use client";
import { useEffect } from "react";
import { useRouter } from "next-nprogress-bar";
import { useDetectAdBlock } from "adblock-detect-react";
import { usePathname } from "next/navigation";

export function BlockAdBlock() {
  const router = useRouter();
  const pathname = usePathname();
  const adBlockDetected = useDetectAdBlock();
  useEffect(() => {
    // console.log("router change", adBlockDetected);

    if (adBlockDetected) {
      router.push("/adBlock");
    }
  }, [pathname]);
  return <></>;
}
