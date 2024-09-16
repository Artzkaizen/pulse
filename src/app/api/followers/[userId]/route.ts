import { db } from "@/db/drizzle";
import { follows } from "@/db/schema";
import { validateRequest } from "@/lib/auth";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userWithFollowers = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
      columns: {
        password: false,
      },
      with: {
        followers: {
          where: (follows, { eq, not }) =>
            not(eq(follows.followerId, loggedInUser.id)),
          columns: {
            followerId: true,
          },
        },
      },
      extras: {
        followerCount: sql<number>`count(${follows.followerId})`.as(
          "follower_count",
        ),
      },
    });

    if (!userWithFollowers) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const data = {
      followers: userWithFollowers.followers,
      isFollowedByUser: !!userWithFollowers.followerCount,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    await db
      .insert(follows)
      .values({
        followerId: loggedInUser.id,
        followingId: userId,
      })
      .onConflictDoNothing();

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db
      .delete(follows)
      .where(
        and(
          eq(follows.followerId, loggedInUser.id),
          eq(follows.followingId, userId),
        ),
      );

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
