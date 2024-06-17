import {
  fetchCosplayPages,
  fetchCosplayPagesWithSitemap,
} from "@/app/lib/fetchData/data";
import { MetadataRoute } from "next/types";
export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  const totalPages = await fetchCosplayPages({
    query: "",
    itemsPrePage: 50000,
  });
  return Array.from({ length: totalPages }, (item, index) => ({ id: index }));
}
function escapeXML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const products = await fetchCosplayPagesWithSitemap({
    currentPage: id,
    itemsPrePage: 50000,
  });
  const BASE_URL =
    process.env.SITE_URL ?? "https://sharecosplay.micromatrix.org";
  return products.map((product) => ({
    url: escapeXML(
      `${BASE_URL}/front/cosplays/${product.id}?name=${product.coser?.name}&coserId=${product.coser_id}&title=${product.title}`
    ),
    lastModified: product.creation_date,
    changeFrequency: "monthly",
    priority: 1,
  }));
}
