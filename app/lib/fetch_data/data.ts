import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Cosplay } from "../definitions";

const ITEMS_PRE_PAGE = 30;
export async function fetchCosplay(currentPage: number, query?: string) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PRE_PAGE;
  try {
    const data = await sql<Cosplay>`select posts.id,
        posts.title,
        cosers.id as cos_id,
        cosers.name as cos_name,
        posts.cover,
        posts.creation_date
        from posts
        join cosers on posts.coser_id = cosers.id
        order by posts.creation_date desc, posts.id desc
        limit ${ITEMS_PRE_PAGE} offset ${offset}
        `;

    return data.rows;
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取数据错误`);
  }
}

export async function fetchCosplayPages(query: string) {
  noStore();
  try {
    const data = await sql`select count(*) from posts`;
    const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PRE_PAGE);
    return totalPages;
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取数据错误`);
  }
}
