import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Cosplay } from "../definitions";

/**
 * @Author: HideInMatrix
 * @description: 获取指定的图组
 * @param {string} cosplayShowId
 * @return {*}
 * @Date: 2024-05-31
 */
export async function fetchCosplayShowById(
  cosplayShowId: string | number
): Promise<Cosplay | null> {
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

/**
 * @Author: HideInMatrix
 * @description: 获取你喜欢的 目前删除random() 这种查询过于慢
 * @return {*}
 * @Date: 2024-05-31
 */
export async function fetchGuessYouLike(
  coserId: string | number
): Promise<Cosplay[]> {
  noStore();
  try {
    const data = await sql<Cosplay>`select 
    posts.id,
    posts.title,
    posts.cover,
    posts.creation_date,
    posts.view_count,
    cosers.id as cos_id,
    cosers.name as cos_name 
    from posts
    join cosers on posts.coser_id = cosers.id
    where posts.coser_id = ${coserId}
    limit 5`;
    return data.rows;
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取数据错误`);
  }
}

/**
 * @Author: HideInMatrix
 * @description: 获取最近一个月最受欢迎的数据
 * @return {*}
 * @Date: 2024-05-31
 */
export async function fetchPopularRecommend(): Promise<Cosplay[]> {
  noStore();
  try {
    const data = await sql<Cosplay>`with recent_views as(
      select
        post_id,
        count(*) as view_count
      from post_views
      where created_at >= NOW() - INTERVAL '1 month'
      group by post_id
    )
    select
      posts.id,
      posts.title,
      posts.cover,
      posts.creation_date,
      cosers.id as cos_id,
      cosers.name as cos_name
    from posts
    join recent_views on posts.id = recent_views.post_id
    join cosers on cosers.id = posts.coser_id
    order by
      recent_views.view_count desc
    limit 8
    `;

    return data.rows;
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取数据错误`);
  }
}
