// 供前端调用的接口
import { sql } from "@vercel/postgres";
import { Coser } from "@/app/lib/definitions";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const countResult =
    await sql`SELECT COUNT(*) FROM cosers where cosers.name ilike ${`%${searchParams.get(
      "query"
    )}%`}`;
  const totalCount = countResult.rows[0].count;
  const data = await sql<Coser>`select
  cosers.id,
  cosers.name
    from cosers
    where cosers.name ilike ${`%${searchParams.get("query")}%`}
    order by cosers.id, cosers.name
    limit ${searchParams.get("limit")} offset ${searchParams.get("offset")}
    `;
  return Response.json({
    results: data.rows,
    ok: true,
    totalCount: totalCount,
  });
}
