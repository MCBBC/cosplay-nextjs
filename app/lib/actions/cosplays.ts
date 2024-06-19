"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function addCosplay({
  title,
  coserId,
  content,
  cover,
}: {
  title: string;
  coserId: number;
  content: string;
  cover: string;
}) {
  try {
    await prisma.posts.create({
      data: {
        title,
        coser_id: coserId,
        content,
        cover,
      },
    });
    // revalidatePath("/dashboard/cosplays");
    return { message: "Cosplay Created.", code: 200 };
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Cosplay.",
    };
  }
}

export async function updateCosplay({
  id,
  title,
  coserId,
  content,
  cover,
  status,
}: {
  id: number;
  title: string;
  coserId: number;
  content: string;
  cover: string;
  status: number;
}) {
  try {
    const data = await prisma.posts.update({
      where: { id },
      data: {
        title,
        coser_id: coserId,
        content,
        cover,
        status,
      },
    });
    // 重新验证路径（如果你在使用 Next.js 的 ISR）
    revalidatePath("/dashboard/cosplays");
    return { message: "Cosplay Updated." };
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Update Cosplay.",
    };
  }
}
export async function deleteCosplay(cosplayId: number) {
  try {
    await prisma.posts.delete({
      where: { id: cosplayId },
    });
    // 重新验证路径（如果你在使用 Next.js 的 ISR）
    // revalidatePath("/dashboard/cosplays");
    return { message: "Deleted Cosplay." };
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Cosplay.",
    };
  }
}
