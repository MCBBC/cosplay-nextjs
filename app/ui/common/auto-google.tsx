"use client";
import { usePathname } from "next/navigation";
import AdSense from "@/components/google-ads/AdSense";
import AdsterraNativeBannerScript from "@/components/adsterra-ads/AdsterraNativeBannerScript";
import { GoogleAnalytics } from "@next/third-parties/google";
import AdsExoclickBannberScript from "@/components/exoclick-ads/AdsExoclickScript";
export function AutoGoogle() {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && (
        <>
          <AdSense pId="09f1f8d46834983118d9266f5b4eaf90" />
          <GoogleAnalytics gaId="G-15MZJRZZB1" />
        </>
      )}
    </>
  );
}

export function AdsterraNativeBanner() {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && (
        <>
          <AdsterraNativeBannerScript pId="09f1f8d46834983118d9266f5b4eaf90" />
        </>
      )}
    </>
  );
}

export function AdsxoclickBanner() {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && (
        <>
          <AdsExoclickBannberScript />
        </>
      )}
    </>
  );
}
