"use client";
import { usePathname } from "next/navigation";
import AdSense from "@/components/AdSense";
import { GoogleAnalytics } from "@next/third-parties/google";
export function AutoGoogle() {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && (
        <>
          <AdSense pId="5901616898778649" />
          <GoogleAnalytics gaId="G-15MZJRZZB1" />
        </>
      )}
    </>
  );
}
