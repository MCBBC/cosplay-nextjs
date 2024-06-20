import {
  fetchCoserList,
  fetchCoserPages,
} from "@/app/lib/fetchData/fetchCoser";
import { MetadataRoute } from "next/types";
export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  const totalPages = await fetchCoserPages({ query: "", itemsPrePage: 50000 });
  return Array.from({ length: totalPages }, (item, index) => ({ id: index }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const products = await fetchCoserList({
    currentPage: id + 1,
    query: "",
    itemsPrePage: 50000,
  });
  const BASE_URL =
    process.env.SITE_URL ?? "https://sharecosplay.micromatrix.org";
  return products.map((product) => ({
    url: `${BASE_URL}/front/cosers/${product.id}`,
    priority: 0.9,
  }));
}
