import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  let returnValue;
  try {
    const coserData = await request.json(); // 解析 JSON 数据
    const coserId = coserData.id;
    const coserName = coserData.name;

    if (coserId) {
      // 修改
      returnValue = await prisma.cosers.update({
        where: { id: coserId },
        data: coserData,
      });
    } else {
      // 新增前检查是否有相同名字
      const existingCoser = await prisma.cosers.findFirst({
        where: { name: coserName },
      });

      if (existingCoser) {
        return NextResponse.json({
          message: "Coser with the same name already exists",
        });
      }

      returnValue = await prisma.cosers.create({
        data: coserData,
      });
    }

    // 在这里处理 coserData，例如存储到数据库或执行其他操作

    return NextResponse.json({
      message: "Data received successfully",
      returnValue,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
