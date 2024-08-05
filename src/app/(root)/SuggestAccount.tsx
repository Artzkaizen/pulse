import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/db/drizzle";
import { validateRequest } from "@/lib/auth";
import { getInitials } from "@/lib/utils";
import { sql } from "drizzle-orm";
import { UserRoundPlus } from "lucide-react";

const SuggestAccounts = async () => {
  const { user } = await validateRequest();
  if (!user) return null;

  const accounts = await db.query.users.findMany({
    where: (users, { not, eq }) => not(eq(users.id, user.id)),
  });

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

  console.log("hashtags", arr);

  return (
    <>
      {accounts.map((account) => {
        const initials = getInitials(account.displayName!);

        return (
          <div key={account.id} className="flex items-center justify-between">
            <div className="inline-flex gap-3">
              <Avatar>
                <AvatarImage src={"account.avatar"} alt={account.username} />
                <AvatarFallback className="uppercase">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm capitalize">{account.displayName}</p>
                <p className="text-sm">{"account.location"}</p>
              </div>
            </div>
            <UserRoundPlus />
          </div>
        );
      })}
    </>
  );
};

export default SuggestAccounts;
