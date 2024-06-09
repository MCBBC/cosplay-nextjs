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
        where posts.title ilike ${`%${query}%`}
        order by posts.creation_date desc, posts.id desc
        limit ${ITEMS_PRE_PAGE} offset ${offset}
        `;
    return data.rows;
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取Cosplay接口错误`);
  }
}

export async function fetchCosplayPages(query: string) {
  noStore();
  try {
    const data =
      await sql`select count(*) from posts where posts.title ilike ${`%${query}%`}`;
    const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PRE_PAGE);
    return totalPages;
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取Cosplay数量错误`);
  }
}

export async function fetchCosplayByCoserId({
  coserId,
  currentPage,
  queryProduction,
  queryCharacter,
}: {
  coserId: number | string;
  currentPage: number;
  queryProduction?: string;
  queryCharacter?: string;
}) {
  const offset = (currentPage - 1) * ITEMS_PRE_PAGE;
  try {
    const data = await sql<Cosplay>`select
      posts.id,
      posts.title,
      posts.cover,
      cosers.name as cos_name,
      cosers.id as cos_id
      from posts
      join cosers on posts.coser_id = cosers.id
      where posts.coser_id = ${coserId}
      order by posts.title desc, posts.id desc
      limit ${ITEMS_PRE_PAGE} offset ${offset}
    `;
    return data.rows;
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取指定Coser的作品错误`);
  }
}

export async function fetchCosplayPagesByCoserId({
  coserId,
  queryProduction,
  queryCharacter,
}: {
  coserId: number | string;
  queryProduction?: string;
  queryCharacter?: string;
}) {
  try {
    const data = await sql`select
      count(id)
    from posts
    where posts.coser_id = ${coserId}
    `;
    const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PRE_PAGE);
    return totalPages;
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取指定Coser的作品数量错误`);
  }
}
