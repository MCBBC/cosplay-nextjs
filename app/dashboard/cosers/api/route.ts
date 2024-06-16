// 供前端调用的接口
import { sql } from "@vercel/postgres";
import { Coser } from "@/app/lib/definitions";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const coserId = searchParams.get("coserId");
  const query = searchParams.get("query");
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  const data = await sql<Coser>`
  SELECT cosers.id,cosers.name FROM cosers WHERE id = ${coserId}
  UNION ALL
  (SELECT cosers.id,cosers.name FROM cosers WHERE id != ${coserId} AND name ILIKE ${`%${query}%`} LIMIT ${limit});
    `;

  return Response.json({
    results: data.rows,
    ok: true,
    // totalCount: totalCount,
  });
}
