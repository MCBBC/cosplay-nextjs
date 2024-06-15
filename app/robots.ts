import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL =
    process.env.SITE_URL ?? "https://sharecosplay.micromatrix.org";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dashboard/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
