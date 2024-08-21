import Script from "next/script";
import React from "react";

type AdsenseTypes = {
  pId: string;
};

const AdSense = ({ pId }: AdsenseTypes) => {
  return (
    // <Script
    //   rel="preload"
    //   async
    //   src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
    //   crossOrigin="anonymous"
    //   strategy="afterInteractive"
    // />
    <Script
      async
      data-cfasync="false"
      src="//pl24107554.highratecpm.com/09f1f8d46834983118d9266f5b4eaf90/invoke.js"></Script>
  );
};

export default AdSense;
