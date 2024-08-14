import { prisma } from "../prisma";

/**
 * @Author: HideInMatrix
 * @description: 获取指定的图组
 * @param {string} cosplayShowId
 * @return {*}
 * @Date: 2024-05-31
 */
export async function fetchCosplayShowById(cosplayShowId: string | number) {
  try {
    const data = await prisma.posts.findUnique({
      where: {
        id: Number(cosplayShowId),
      },
      select: {
        id: true,
        title: true,
        content: true,
        coser_id: true,
        cover: true,
        creation_date: true,
        view_count: true,
        status: true,
      },
    });
    return data;
  } catch (error) {
    console.error("数据库错误", error);
    throw new Error(`获取数据错误`);
  }
}

/**
 * @Author: HideInMatrix
 * @description: 获取你喜欢的 目前删除random() 这种查询过于慢
 * @return {*}
 * @Date: 2024-05-31
 */
export async function fetchGuessYouLike(coserId: string | number) {
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
        creation_date: true,
        view_count: true,
        coser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: 5,
    });
    return data;
  } catch (error) {
    console.error("数据库错误", error);
    throw new Error(`获取数据错误`);
  }
}

/**
 * @Author: HideInMatrix
 * @description: 获取阅读最多的数据
 * @return {*}
 * @Date: 2024-05-31
 */
export async function fetchPopularRecommend(limitNumber: number) {
  try {
    const data = await prisma.posts.findMany({
      where: {
        status: {
          not: 2,
        },
      },
      include: {
        coser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        view_count: "desc",
      },
      take: limitNumber,
    });
    return data;
  } catch (error) {
    console.error("数据库错误", error);
    throw new Error(`获取数据错误`);
  }
}

/**
 * @Author: HideInMatrix
 * @description: 随机获取30个图组
 * @return {*}
 * @Date: 2024-05-31
 */
export async function fetchRandomRecommend(limitNumber: number) {
  try {
    // Step 1: 获取所有符合条件的ID
    const allIds = await prisma.posts.findMany({
      where: {
        status: {
          not: 2,
        },
      },
      select: {
        id: true,
      },
    });

    // Step 2: 从所有ID中随机选择指定数量的ID
    const selectedIds = allIds
      .map((post) => post.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, limitNumber);

    // Step 3: 根据随机选择的ID获取具体的数据
    const data = await prisma.posts.findMany({
      where: {
        id: {
          in: selectedIds,
        },
        status: {
          not: 2,
        },
      },
      include: {
        coser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("数据库错误", error);
    throw new Error(`获取数据错误`);
  }
}
