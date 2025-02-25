"use client";
import TitleHeader from "@/app/ui/mainLayout/title-header";
import SideNav from "@/app/ui/mainLayout/side-nav";
import RightContainer from "@/app/ui/mainLayout/right-container";

import ExoclickBanner from "@/components/exoclick-ads/Banner";
import { AdBanner } from "@/components/google-ads/AdBanner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-dvh">
      <SideNav></SideNav>
      <RightContainer>
        <TitleHeader></TitleHeader>
        <div className="w-full px-8">
          {children}
          <ExoclickBanner></ExoclickBanner>
          <AdBanner
            dataAdFormat="fluid"
            dataFullWidthResponsive={false}
            dataAdSlot="1013737103"
          />
        </div>
      </RightContainer>
    </main>
  );
}
