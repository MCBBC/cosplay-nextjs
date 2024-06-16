import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "../prisma";

export type State = {
  errors?: {
    id?: string[];
    cosplayId?: string[];
    viewCount?: number[];
  };
  message?: string | null;
};

// 期望能检验到的值
const FormSchema = z.object({
  id: z.string(),
  cosplayId: z.string(),
  viewCount: z.number(),
});

const UpdateCosplay = FormSchema.omit({ id: true });

export async function addCosplayView({
  cosplayId,
  viewCount,
}: {
  cosplayId: string;
  viewCount: number;
}) {
  try {
    const data = await prisma.posts.update({
      where: {
        id: Number(cosplayId), // 确保这个字段是你数据库中的唯一标识
      },
      data: {
        view_count: viewCount, // 确保这个字段正确对应了你的数据库中的视图计数字段
      },
    });

    // 假设你需要在更新后执行页面的重新验证
    revalidatePath(`/front/cosplays/${cosplayId}`);

    // 返回信息，表示更新是否成功
    return { message: data ? "Update successful" : "No record updated" };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to Update Cosplay.",
    };
  }
}
