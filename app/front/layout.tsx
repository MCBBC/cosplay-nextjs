"use client";
import TitleHeader from "@/app/ui/mainLayout/title-header";
import SideNav from "@/app/ui/mainLayout/side-nav";
import RightContainer from "@/app/ui/mainLayout/right-container";
import DesktopFullpage from "@/components/exoclick-ads/DesktopFullpage";
import ExoclickBanner from "@/components/exoclick-ads/Banner";
// import { useDetectAdBlock } from "adblock-detect-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const adBlockDetected = useDetectAdBlock();
  return (
    <main className="flex h-screen">
      <SideNav></SideNav>
      <RightContainer>
        <TitleHeader></TitleHeader>
        {/* {adBlockDetected ? (
          <div className="flex items-center justify-center flex-col">
            <h3>Please disable your ad blocker!</h3>
            <p>
              We know ads are annoying but please bear with us here & disable
              your ad blocker!
            </p>
          </div>
        ) : (
        )} */}
        <div className="w-full px-8">
          {children}
          <DesktopFullpage />
          {/* <AdsterraNativeBannerDom></AdsterraNativeBannerDom> */}
          <ExoclickBanner></ExoclickBanner>
        </div>
      </RightContainer>
    </main>
  );
}
