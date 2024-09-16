import { db } from "@/db/drizzle";
import { PostWithUser } from "@/db/schema";
import { validateRequest } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const { user } = await validateRequest();
    const page = 2;
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const posts: any = await db.query.posts.findMany({
      where: (posts, { eq, lt }) => {
        if (cursor) {
          return lt(posts.id, parseInt(cursor, 10));
        }
        return eq(posts.userId, userId);
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      with: {
        user: true,
      },
      limit: page + 1,
    });

    const nextCursor = posts.length > page ? posts[page].id : null;
    const data: RoutePost = {
      posts: posts,
      nextCursor,
    };
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal sever error" }, { status: 500 });
  }
}

export interface RoutePost {
  posts: PostWithUser[];
  nextCursor: number | null;
}
