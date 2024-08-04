"use server";

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { validateRequest } from "@/lib/auth";
import { createPostSchema } from "@/lib/utils";

export const submitPost = async (value: string) => {
  const session = await validateRequest();
  if (!session.user) throw new Error("Unauthorized");

  const { content } = createPostSchema.parse({ content: value });
  await db.insert(posts).values({
    content,
    userId: session.user.id,
  });
};
