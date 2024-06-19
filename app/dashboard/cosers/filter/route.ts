import { type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const coserId = searchParams.get("coserId");
  const query = searchParams.get("query");
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  // 首先查询匹配的coserId
  let results = [];
  if (coserId) {
    const directMatch = await prisma.cosers.findUnique({
      where: { id: parseInt(coserId, 10) },
      select: { id: true, name: true },
    });
    if (directMatch) {
      results.push(directMatch);
    }
  }

  // 然后查询匹配name的其他记录
  const nameMatches = await prisma.cosers.findMany({
    where: {
      ...(coserId ? { id: { not: parseInt(coserId, 10) } } : {}),
      ...(query ? { name: { contains: query, mode: "insensitive" } } : {}),
    },
    select: { id: true, name: true },
    take: limit,
    skip: offset,
  });

  results = results.concat(nameMatches);

  return new Response(
    JSON.stringify({
      results: results,
      ok: true,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
