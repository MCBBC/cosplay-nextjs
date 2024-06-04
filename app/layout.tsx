import type { Metadata } from "next";
import { inter } from "@/fonts";
import { Providers } from "./providers";
// import { GoogleAdSense } from "next-google-adsense";
import AdSense from "@/components/AdSense";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "% | Share Cosplay",
    default: "MicroMatrix | Share Cosplay",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
