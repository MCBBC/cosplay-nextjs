import type { Metadata } from "next";
import { inter } from "@/fonts";
// import { Providers } from "./providers";
import NprogressProvider from "@/components/NProgressProvider";
import "./globals.css";
import {
  AdsterraNativeBanner,
  AdsxoclickBanner,
} from "./ui/common/auto-google";

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
        <AdsterraNativeBanner />
        <AdsxoclickBanner />
        <link rel="icon" href="/images/favicon.ico" />
        <meta
          name="6a97888e-site-verification"
          content="29135df34c9ebbb0633daabdeb8a80c8"></meta>
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
