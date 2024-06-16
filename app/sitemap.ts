import { fetchCoserPages } from "@/app/lib/fetchData/fetchCoser";
import { MetadataRoute } from "next/types";
import { fetchCosplayPages } from "@/app/lib/fetchData/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const totalCosplayPages = await fetchCosplayPages({
    query: "",
    itemsPrePage: 50000,
  });
  const BASE_URL =
    process.env.SITE_URL ?? "https://sharecosplay.micromatrix.org";
  const cosplaySitemap = Array.from(
    { length: totalCosplayPages },
    (item, index) => ({
      url: `${BASE_URL}/front/cosplays/sitemap/${index}.xml`,
      priority: 1,
      lastModified: new Date(),
      changeFrequency: "always",
    })
  );
  const totalPages = await fetchCoserPages({ query: "", itemsPrePage: 50000 });
  const coserSitemap = Array.from({ length: totalPages }, (item, index) => ({
    url: `${BASE_URL}/front/cosers/sitemap/${index}.xml`,
    priority: 1,
    lastModified: new Date(),
    changeFrequency: "always",
  }));
  return [...cosplaySitemap, ...coserSitemap] as MetadataRoute.Sitemap;
}
