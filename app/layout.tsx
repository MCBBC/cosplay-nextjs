import type { Metadata } from "next";
import { inter } from "@/fonts";
import { Providers } from "./providers";
import { GoogleAdSense } from "next-google-adsense";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "% | Share Cosplay",
    default: "MicroMatrix",
  },
  description: "免费的的写真网站",
  referrer: "no-referrer",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAdSense />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
