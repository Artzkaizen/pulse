import FollowButton from "@/components/FollowButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/db/drizzle";
import { follows, users } from "@/db/schema";
import { validateRequest } from "@/lib/auth";
import { getInitials } from "@/lib/utils";
import { and, eq, inArray, not, sql } from "drizzle-orm";

const SuggestAccounts = async () => {
  const { user } = await validateRequest();
  if (!user) return null;

  // const accounts1 = await db.query.users.findMany({
  //   where: (users, { not, eq }) => not(eq(users.id, user.id)),
  //   columns: {
  //     password: false,
  //   },
  //   with: {
  //     followers: {
  //       where: (follows, { eq, not }) => not(eq(follows.followerId, user.id)),
  //       columns: {
  //         followerId: true,
  //       },
  //     },
  //   },
  //   extras: {
  //     followerCount: sql<number>`count(distinct ${follows.followerId})`.as(
  //       "follower_count",
  //     ),
  //   },
  // });

  const accounts = await db
    .select({
      id: users.id,
      bio: users.bio,
      email: users.email,
      avatar: users.avatar,
      username: users.username,
      googleId: users.googleId,
      displayName: users.displayName,
      createdAt: users.createdAt,
      followerIds: sql<string[]>`array_agg(distinct ${follows.followerId})`.as(
        "follower_ids",
      ),
      followerCount: sql<number>`count(distinct ${follows.followerId})`.as(
        "follower_count",
      ),
    })
    .from(users)
    .leftJoin(follows, eq(users.id, follows.followingId))
    .where(
      and(
        not(eq(users.id, user.id)),
        not(
          inArray(
            users.id,
            db
              .select({ id: follows.followingId })
              .from(follows)
              .where(eq(follows.followerId, user.id)),
          ),
        ),
      ),
    )
    .groupBy(
      users.id,
      users.bio,
      users.email,
      users.avatar,
      users.username,
      users.googleId,
      users.displayName,
      users.createdAt,
    );

  const result = await db.execute<{ hashtag: string; count: number }>(sql`
  SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
  FROM pulse_posts
  GROUP BY (hashtag)
  ORDER BY count DESC, hashtag ASC
  LIMIT 5
`);
  const arr = result.rows.map((row) => ({
    hashtag: row.hashtag,
    count: Number(row.count),
  }));

  return (
    <>
      {accounts.map((account) => {
        const initials = getInitials(account.displayName!);
        const isFollowedByUser = account.followerIds.some(
          (followerId) => followerId === user.id,
        );
        return (
          <div key={account.id} className="flex items-center justify-between">
            <div className="inline-flex gap-3">
              <Avatar>
                <AvatarImage
                  src={account.avatar || ""}
                  alt={account.username}
                />
                <AvatarFallback className="uppercase">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm capitalize">{account.displayName}</p>
                <p className="text-sm">{"account.location"}</p>
              </div>
            </div>
            <FollowButton
              userId={account.id}
              initialState={{
                followers: account.followerCount,
                isFollowedByUser,
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default SuggestAccounts;
