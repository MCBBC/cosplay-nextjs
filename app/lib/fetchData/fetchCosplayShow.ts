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
    posts.coser_id as cos_id,
    posts.cover,
    posts.creation_date,
    posts.view_count,
    posts.status 
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
    where posts.coser_id = ${coserId} and posts.status !=2
    limit 5`;
    return data.rows;
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取数据错误`);
  }
}

/**
 * @Author: HideInMatrix
 * @description: 获取阅读最多的数据
 * @return {*}
 * @Date: 2024-05-31
 */
export async function fetchPopularRecommend(
  limitNumber: number
): Promise<Cosplay[]> {
  noStore();
  try {
    const data = await sql<Cosplay>`
    select
      posts.id,
      posts.title,
      posts.cover,
      posts.creation_date,
      cosers.id as cos_id,
      cosers.name as cos_name
    from posts
    join cosers on cosers.id = posts.coser_id
    where posts.status !=2
    order by
      posts.view_count desc
    limit ${limitNumber}
    `;

    return data.rows;
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取数据错误`);
  }
}
