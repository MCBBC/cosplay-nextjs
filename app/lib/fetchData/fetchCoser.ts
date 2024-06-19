// 如果你使用Prisma，它会为你的模型自动生成类型
import { prisma } from "../prisma";

const ITEMS_PRE_PAGE = 20;

// 定义函数的参数类型
interface FetchCoserListParams {
  currentPage: number;
  query: string;
  itemsPrePage?: number;
}

// 查询Coser列表
export async function fetchCoserList({
  currentPage,
  query,
  itemsPrePage = ITEMS_PRE_PAGE,
}: FetchCoserListParams) {
  const offset = (currentPage - 1) * itemsPrePage;

  try {
    const cosers = await prisma.cosers.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        avatar: true,
      },
      orderBy: [
        {
          id: "desc",
        },
        {
          name: "asc",
        },
      ],
      take: itemsPrePage,
      skip: offset,
    });
    return cosers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Cosers.");
  }
}

// 定义函数的参数类型
interface FetchCoserPagesParams {
  query: string;
  itemsPrePage?: number;
}

// 查询Coser的总页数
export async function fetchCoserPages({
  query,
  itemsPrePage = ITEMS_PRE_PAGE,
}: FetchCoserPagesParams): Promise<number> {
  try {
    const totalItems = await prisma.cosers.count({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    const totalPages = Math.ceil(totalItems / itemsPrePage);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of Cosers.");
  }
}

export async function fetchCoserInfoById({ coserId }: { coserId: number }) {
  try {
    const data = await prisma.cosers.findUnique({
      where: {
        id: coserId,
      },
    });
    return data;
  } catch (error) {
    console.error("数据库错误", error);
    throw new Error(`获取数据错误`);
  } finally {
    await prisma.$disconnect(); // 确保数据库连接已关闭
  }
}
