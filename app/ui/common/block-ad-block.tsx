"use client";
import { useEffect } from "react";
import { useRouter } from "next-nprogress-bar";
import { useDetectAdBlock } from "adblock-detect-react";

export function BlockAdBlock() {
  const adBlockDetected = useDetectAdBlock();
  const router = useRouter();
  useEffect(() => {
    if (adBlockDetected) {
      router.push("/adBlock");
    }
  }, [adBlockDetected, router]);
  return <></>;
}
