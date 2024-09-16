"use client";

import { RoutePost } from "@/app/api/posts/route";
import { kyInstance } from "@/lib/ky";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PostCard } from "../PostFeed";

const UserPostsFeed = ({ userId }: { userId: string }) => {
  const query = useInfiniteQuery({
    queryKey: ["posts", "user-posts", userId],
    queryFn: async ({ pageParam }) => {
      const response = await kyInstance.get(`/api/user/${userId}/posts`, {
        searchParams: pageParam ? { cursor: pageParam } : {},
      });
      return response.json<RoutePost>();
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = query.data?.pages.flatMap((page) => page.posts) || [];

  return (
    <div className="flex flex-col space-y-4 w-full *:text-black">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPostsFeed;
