"use client";
import { useRouter } from "next-nprogress-bar";
import { useDetectAdBlock } from "adblock-detect-react";

export function BlockAdBlock() {
  const router = useRouter();
  const adBlockDetected = useDetectAdBlock();

  if (adBlockDetected) {
    router.push("/adBlock");
  }
  return <></>;
}
