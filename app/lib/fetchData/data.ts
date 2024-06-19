import { prisma } from "../prisma";

const ITEMS_PER_PAGE = 30;

export async function fetchCosplayDashBoard({
  currentPage,
  query,
}: {
  currentPage: number;
  query?: string;
}) {
  return await fetchCosplay({ currentPage, query, status: { not: 0 } });
}

export async function fetchCosplay({
  currentPage,
  query,
  itemsPrePage = ITEMS_PER_PAGE,
  status = {
    not: 2,
  },
}: {
  currentPage: number;
  query?: string;
  itemsPrePage?: number;
  status?: { not: number };
}) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await prisma.posts.findMany({
      where: {
        title: {
          contains: query || "",
          mode: "insensitive",
        },
        status: status,
      },
      select: {
        id: true,
        title: true,
        cover: true,
        creation_date: true,
        status: status.not !== 2,
        coser_id: true,
        coser: {
          select: {
            id: true, // 假设你只想包含 coser 的 id
            name: true, // 和 name 字段
            avatar: true,
          },
        },
      },
      orderBy: [
        {
          creation_date: "desc",
        },
        {
          id: "desc",
        },
      ],
      skip: offset,
      take: itemsPrePage,
    });
    return data;
  } catch (error) {
    console.error("数据库错误", error);
    throw new Error(`获取Cosplay接口错误${error}`);
  }
}

export async function fetchCosplayPages({
  query,
  itemsPrePage = ITEMS_PER_PAGE,
  status = {
    not: 2,
  },
}: {
  query: string;
  itemsPrePage?: number;
  status?: { not: number };
}) {
  try {
    const count = await prisma.posts.count({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
        status: status,
      },
    });
    const totalPages = Math.ceil(count / itemsPrePage);
    return totalPages;
  } catch (error) {
    console.error("数据库错误", error);
    throw new Error(`获取Cosplay数量错误`);
  }
}

export async function fetchCosplayByCoserId({
  coserId,
  currentPage,
  itemsPrePage = ITEMS_PER_PAGE,
}: {
  coserId: number | string;
  currentPage: number;
  itemsPrePage?: number;
}) {
  const offset = (currentPage - 1) * itemsPrePage;
  try {
    const data = await prisma.posts.findMany({
      where: {
        coser_id: Number(coserId),
        status: {
          not: 2,
        },
      },
      select: {
        id: true,
        title: true,
        cover: true,
        coser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: [
        {
          title: "desc",
        },
        {
          id: "desc",
        },
      ],
      skip: offset,
      take: itemsPrePage,
    });
    return data;
  } catch (error) {
    console.error("数据库错误", error);
    throw new Error(`获取指定Coser的作品错误`);
  }
}

export async function fetchCosplayPagesByCoserId({
  coserId,
  itemsPrePage = ITEMS_PER_PAGE,
}: {
  coserId: number | string;
  itemsPrePage?: number;
}) {
  try {
    const count = await prisma.posts.count({
      where: {
        coser_id: Number(coserId),
        status: {
          not: 2,
        },
      },
    });
    const totalPages = Math.ceil(count / itemsPrePage);
    return totalPages;
  } catch (error) {
    console.error("数据库错误", error);
    throw new Error(`获取指定Coser的作品数量错误${error}`);
  }
}

export async function fetchCosplayPagesWithSitemap({
  currentPage,
  itemsPrePage = ITEMS_PER_PAGE,
}: {
  currentPage: number;
  itemsPrePage?: number;
}) {
  const offset = currentPage * itemsPrePage;
  try {
    const data = await prisma.posts.findMany({
      where: {
        status: {
          not: 2,
        },
      },
      select: {
        id: true,
        title: true,
        coser_id: true,
        creation_date: true,
        coser: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      skip: offset,
      take: itemsPrePage,
    });
    return data;
  } catch (error) {
    console.error("数据库错误", error);
    throw new Error(`获取指定Coser的作品数量错误,${error}`);
  }
}
