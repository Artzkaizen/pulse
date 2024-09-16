import FollowButton from "@/components/FollowButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/db/drizzle";
import { Follows, Post } from "@/db/schema";
import { validateRequest } from "@/lib/auth";
import { capitalizeWords, formatRelativeDate, getInitials } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { PostCard } from "../PostFeed";
import FollowerCount from "./FollowerCount";

interface ProfilePageProps {
  params: { username: string };
}
export interface UserWithPosts {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  createdAt: Date;
  posts: Post[];
  followers: Follows[];
  following: Follows[];
}
const getUser = cache(async (username: string, userId: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users?.username, username),
    with: {
      posts: true,
      followers: true,
      following: true,
    },
  });
  if (!user) notFound();
  return user;
});

export const generateMetadata = async ({
  params: { username },
}: ProfilePageProps): Promise<Metadata> => {
  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser) return {};
  const user = capitalizeWords(
    (await getUser(username, loggedInUser.id)).displayName || "",
  );

  return {
    title: `${user}'s Profile`,
  };
};
const page = async ({ params: { username } }: ProfilePageProps) => {
  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser) notFound();

  const user = await getUser(username, loggedInUser.id);
  if (!user) notFound();
  const date = formatRelativeDate(user.createdAt);

  const follwerInfo = {
    followers: user.followers.length,
    isFollowedByUser: user.followers.some(
      (f) => f.followerId === loggedInUser.id,
    ),
  };

  const initials = getInitials(user.displayName!);

  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <section className="h-screen w-full overflow-auto p-6">
      <Avatar className="mx-auto size-32">
        <AvatarImage src={user.avatar!} alt={user.displayName!} />
        <AvatarFallback className="uppercase text-2xl font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>

      <h2 className="mx-auto text-2xl font-bold capitalize">
        {user.displayName}
      </h2>
      <p className="mx-auto">@{user.username}</p>
      {user.id !== loggedInUser.id && (
        <FollowButton userId={user.id} initialState={follwerInfo} />
      )}

      <div className="flex items-center space-x-4">
        <span className="">
          <p className="block text-center font-semibold">{user.posts.length}</p>
          <span className="text-sm">
            {user.posts.length > 1 ? "Posts" : "Post"}
          </span>
        </span>
        <span>
          <div className="block text-center font-semibold">
            <FollowerCount
              userId={user.id}
              initialState={follwerInfo}
              type={"followers"}
            />
          </div>
          <span className="text-sm">Followers</span>
        </span>
        <span>
          <p className="block text-center font-semibold">1.02M</p>
          <span className="text-sm">Following</span>
        </span>
      </div>

      <div>Joined {date} </div>

      <div className="space-y-4">
        {user.posts.map((post) => (
          <PostCard key={post.id} user={user} post={post} />
        ))}
      </div>
    </section>
  );
};

export default page;
