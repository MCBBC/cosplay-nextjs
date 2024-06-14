import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Coser } from "../definitions";

const ITEMS_PRE_PAGE = 20;
export async function fetchCoserList({
  currentPage,
  query,
  itemsPrePage = ITEMS_PRE_PAGE,
}: {
  currentPage: number;
  query: string;
  itemsPrePage?: number;
}): Promise<Coser[]> {
  noStore();
  const offset = (currentPage - 1) * itemsPrePage;
  const data = await sql<Coser>`select
    cosers.id,
    cosers.name
  from cosers
  where
    cosers.name ilike ${`%${query}%`}
  order by cosers.id, cosers.name
  limit ${itemsPrePage} offset ${offset}
  `;
  return data.rows;
  try {
  } catch (error) {}
}

export async function fetchCoserPages({
  query,
  itemsPrePage = ITEMS_PRE_PAGE,
}: {
  query: string;
  itemsPrePage?: number;
}): Promise<number> {
  noStore();
  try {
    const data = await sql`select count(id) 
        from cosers 
        where 
        cosers.name ilike ${`%${query}%`}`;

    const totalPages = Math.ceil(Number(data.rows[0].count) / itemsPrePage);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of Cosers.");
  }
}
