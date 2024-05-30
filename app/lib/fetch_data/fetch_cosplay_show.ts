import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Cosplay } from "../definitions";

export async function fetchCosplayShowById(cosplayShowId: string | number) {
  noStore();
  try {
    const data = await sql<Cosplay>`select 
    posts.id,
    posts.title,
    posts.content,
    posts.cover,
    posts.creation_date,
    posts.view_count 
    from posts 
    where id=${cosplayShowId}`;
    // 如果查询结果为空，返回 null
    if (data.rows.length === 0) {
      return null;
    }

    // 只返回查询结果的第一条记录
    return data.rows[0];
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取数据错误`);
  }
}

export async function fetchGuessYouLike(coserId: string | number) {
  noStore();
  try {
    const data = await sql<Cosplay>`select 
    posts.id,
    posts.title,
    posts.content,
    posts.cover,
    posts.creation_date,
    posts.view_count 
    from posts
    where posts.coser_id = ${coserId}
    order by random()
    limit 6`;
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows;
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取数据错误`);
  }
}
