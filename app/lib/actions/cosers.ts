"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function deleteCoser(coserId: number) {
  try {
    await prisma.cosers.delete({
      where: { id: coserId },
    });
    // 重新验证路径（如果你在使用 Next.js 的 ISR）
    revalidatePath("/dashboard/cosers");
    return { message: "Deleted Coser." };
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Coser.",
    };
  }
}
