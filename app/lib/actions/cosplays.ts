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

export async function addCosplay({
  title,
  cosId,
  content,
}: {
  title: string;
  cosId: string | number;
  content: string;
}): Promise<State> {
  try {
    const data = await sql`insert into posts(title, coser_id, content)
      values(${title},${cosId},${content})
      returning posts.id
      `;
    console.log(data);
    return { message: "成功" };
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Update Cosplay.",
    };
  }
}

export async function updateCosplay({
  id,
  title,
  cosId,
  content,
}: {
  id: number;
  title: string;
  cosId: string | number;
  content: string;
}): Promise<State> {
  try {
    await sql`update posts
    set title = ${title},
    coser_id = ${cosId},
    content = ${content}
    where posts.id = ${id}
    `;
    return { message: "成功" };
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Cosplay.",
    };
  }
}
