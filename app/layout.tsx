import type { Metadata } from "next";
import { inter } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "MicroMatrix | Share Cosplay",
  description: "免费的的写真网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
