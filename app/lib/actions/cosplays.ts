"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type State = {
  errors?: {
    id?: number[];
    title?: string[];
    content?: string[];
    coserId?: string[];
  };
  message?: string | null;
};

export async function updateCosplay({
  title,
  cosId,
  content,
}: {
  title: string;
  cosId: string|number;
  content: string;
}): Promise<State> {
  try {
    await sql``;
    return { message: "成功" };
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Cosplay.",
    };
  }
}
