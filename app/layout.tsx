import type { Metadata } from "next";
import { inter } from "@/fonts";
import { Providers } from "./providers";
import NprogressProvider from "@/components/NProgressProvider";
// import { GoogleAdSense } from "next-google-adsense";
import AdSense from "@/components/AdSense";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Share Cosplay",
    default: "MicroMatrix",
  },
  description: "免费的的写真网站",
  referrer: "no-referrer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <GoogleAdSense /> */}
        <AdSense pId="5901616898778649" />
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body className={inter.className}>
        <NprogressProvider>
          {/* <Providers> */}
          {children}
          {/* </Providers> */}
        </NprogressProvider>
      </body>
    </html>
  );
}
