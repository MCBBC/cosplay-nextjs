"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type State = {
  errors?: {
    id?: string[];
    title?: string[];
    content?: string[];
    coserId?: string[];
    cover?: string[];
  };
  message?: string | null;
};

// 期望能检验到的值
const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  coserId: z.string(),
  content: z.string(),
  cover: z.string(),
});

const UpdateCosplay = FormSchema.omit({ id: true });
const CreateCosplay = FormSchema.omit({ id: true });

export async function addCosplay({
  title,
  coserId,
  content,
  cover,
}: {
  title: string;
  coserId: string | number;
  content: string;
  cover: string;
}) {
  const validatedFields = CreateCosplay.safeParse({
    title: title,
    coserId: coserId,
    content: content,
    cover: cover,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Cosplay.",
    };
  }

  const {
    title: _title,
    coserId: _coserId,
    content: _content,
    cover: _cover,
  } = validatedFields.data;

  try {
    const data = await sql`insert into posts(title, coser_id, content,cover)
      values(${_title},${_coserId},${_content},${_cover})
      returning posts.id
      `;
    revalidatePath("/dashboard/cosplays");
    return { message: data.rowCount > 0 };
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
  coserId,
  content,
  cover,
}: {
  id: number;
  title: string;
  coserId: string | number;
  content: string;
  cover: string;
}) {
  const validatedFields = UpdateCosplay.safeParse({
    title: title,
    coserId: coserId,
    content: content,
    cover: cover,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Cosplay.",
    };
  }

  const {
    title: _title,
    coserId: _coserId,
    content: _content,
    cover: _cover,
  } = validatedFields.data;
  try {
    const data = await sql`update posts
    set title = ${_title},
    coser_id = ${_coserId},
    content = ${_content},
    cover = ${_cover}
    where id = ${id}
    returning id
    `;
    revalidatePath("/dashboard/cosplays");
    return { message: data.rows.length > 0 };
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Cosplay.",
    };
  }
}

export async function deleteCosplay(cosplayId: number) {
  try {
    await sql`delete from posts where posts.id =${cosplayId}`;
    revalidatePath("/dashboard/cosplays");
    return { message: "Deleted Cosplay." };
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Cosplay.",
    };
  }
}
