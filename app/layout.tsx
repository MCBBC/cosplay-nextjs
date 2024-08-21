import type { Metadata } from "next";
import { inter } from "@/fonts";
// import { Providers } from "./providers";
import NprogressProvider from "@/components/NProgressProvider";
import "./globals.css";
import { AdsterraNativeBanner } from "./ui/common/auto-google";

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
