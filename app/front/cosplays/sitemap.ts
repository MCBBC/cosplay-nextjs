import { BASE_URL } from "@/app/lib/constants";
import {
  fetchCosplayPages,
  fetchCosplayPagesWithSitemap,
} from "@/app/lib/fetchData/data";
import { MetadataRoute } from "next/types";
export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  const totalPages = await fetchCosplayPages("", 50000);
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
  const products = await fetchCosplayPagesWithSitemap(id, 50000);
  return products.map((product) => ({
    url: escapeXML(
      `${BASE_URL}/front/cosplays/${product.id}?name=${product.title}&coserId=${product.cos_id}`
    ),
    lastModified: product.creation_date,
    changeFrequency: "monthly",
    priority: 1,
  }));
}
