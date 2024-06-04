import { Html, Head, Main, NextScript } from "next/document";
import { GoogleAdSense } from "next-google-adsense";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <GoogleAdSense />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
