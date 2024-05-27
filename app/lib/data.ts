import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Cosplay } from "./definitions";

const ITEMS_PRE_PAGE = 30;
export async function fetchCosplay(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PRE_PAGE;
  try {
    const data = await sql<Cosplay>`select posts.id,
        posts.title,
        tags.id as cos_id,
        tags.name as cos_name,
        posts.cover,
        posts.creation_date
        from posts
        join tags on posts.tag_id=tags.id
        order by posts.creation_date desc
        limit ${ITEMS_PRE_PAGE} offset ${offset}
        `;

    return data.rows;
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error("获取数据错误");
  }
}
