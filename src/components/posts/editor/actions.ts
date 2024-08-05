"use server";

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { validateRequest } from "@/lib/auth";
import { createPostSchema } from "@/lib/utils";

export const submitPost = async (value: string) => {
  const session = await validateRequest();
  if (!session.user) throw new Error("Unauthorized");

  const { content } = createPostSchema.parse({ content: value });
  const [newpost] = await db
    .insert(posts)
    .values({
      content,
      userId: session.user.id,
    })
    .returning();

  if (newpost) {
    const postWithRelations = await db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, newpost.id),
      with: {
        user: true,
      },
    });
    return postWithRelations;
  }
};
