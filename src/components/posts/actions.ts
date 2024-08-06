"use server";

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { validateRequest } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const deletePost = async (postId: number) => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const post = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, postId),
  });

  if (!post || post.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const [deletedPost] = await db
    .delete(posts)
    .where(eq(posts.id, postId))
    .returning();

  if (deletedPost) {
    const deletedPostWithUser = await db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.userId, deletedPost.userId),
      with: {
        user: true,
      },
    });
    if (deletedPostWithUser) return deletedPostWithUser;
  }
};
