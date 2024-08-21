import Script from "next/script";
import React from "react";

type AdsenseTypes = {
  pId: string;
};

const AdsterraNativeBannerScript = ({ pId }: AdsenseTypes) => {
  return (
    <Script
      async
      data-cfasync="false"
      src={`//comarind.com/${pId}/invoke.js`}></Script>
  );
};

export default AdsterraNativeBannerScript;
