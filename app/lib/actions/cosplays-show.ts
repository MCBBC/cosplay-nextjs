import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
  const validatedFields = UpdateCosplay.safeParse({
    cosplayId,
    viewCount,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Cosplay.",
    };
  }
  const { cosplayId: _cosplayId, viewCount: _viewCount } = validatedFields.data;

  try {
    const data = await sql`update posts
    set view_count = ${_viewCount}
    where id = ${_cosplayId}
    returning id
    `;
    revalidatePath(`/front/cosplays/${_cosplayId}`);
    return { message: data.rows.length > 0 };
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Cosplay.",
    };
  }
}
