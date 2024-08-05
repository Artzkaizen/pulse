"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import { LoadingSkeleton } from "@/components/LoadingSekleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PostWithUser } from "@/db/schema";
import { kyInstance } from "@/lib/ky";
import { formatRelativeDate, getInitials } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";

const PostLoading = () => {
  return (
    <div className="flex flex-col space-y-4 mt-6">
      <LoadingSkeleton
        pluse="bg-background"
        className="bg-secondary p-4 rounded"
      />
      <LoadingSkeleton
        pluse="bg-background"
        className="bg-secondary p-4 rounded"
      />
      <LoadingSkeleton
        pluse="bg-background"
        className="bg-secondary p-4 rounded"
      />
      <LoadingSkeleton
        pluse="bg-background"
        className="bg-secondary p-4 rounded"
      />
      <LoadingSkeleton
        pluse="bg-background"
        className="bg-secondary p-4 rounded"
      />
    </div>
  );
};

const FetchPosts = () => {
  const query = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await kyInstance.get("/api/posts", {
        searchParams: pageParam ? { cursor: pageParam } : {},
      });
      return response.json<PostWithUser>();
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = query.data?.pages.flatMap((page) => page.posts) || [];
  console.log(posts);
  if (query.isPending) return <PostLoading />;
  if (query.isError) return <p>Error Occured while Loading posts</p>;

  return (
    <InfiniteScrollContainer
      className="mt-6 flex w-full flex-col space-y-6"
      onBottomReached={() =>
        query.hasNextPage && !query.isFetchingNextPage && query.fetchNextPage()
      }
    >
      {posts.map((post) => {
        const initials = getInitials(post?.user.displayName!);
        const date = formatRelativeDate(post?.createdAt);
        return (
          <article
            key={post.id}
            className="relative rounded-lg bg-secondary p-4 shadow-md"
          >
            <div className="flex flex-col justify-between">
              <div className="flex gap-2">
                <Avatar className="size-14 border-2 border-purple-400">
                  <AvatarImage src="" alt={post.user.username} />
                  <AvatarFallback className="uppercase">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center">
                  <Link
                    href={`/user/${post.user.username}`}
                    className="text-sm font-semibold capitalize"
                  >
                    {post.user.displayName}
                  </Link>
                  <span className="text-sm text-gray-500">{date}</span>
                </div>
              </div>
              <p>{post.content}</p>
              {/* <div>#endregion #endregion #region</div> */}
            </div>
          </article>
        );
      })}
      {query.isFetchingNextPage && (
        <LoadingSkeleton
          pluse="bg-background"
          className="bg-secondary p-4 rounded"
        />
      )}
      <Button onClick={() => query.fetchNextPage()}>Load more</Button>
    </InfiniteScrollContainer>
  );
};

export default FetchPosts;

export const PostFeed = ({ posts }: { posts: PostWithUser[] }) => {
  return (
    <section className="mt-6 flex w-full flex-col space-y-6">
      {posts.length > 0 &&
        posts.map((post) => {
          const initials = getInitials(post.user.displayName!);
          const date = formatRelativeDate(post.createdAt);
          return (
            <article
              key={post.id}
              className="relative rounded-lg bg-secondary p-4 shadow-md"
            >
              <div className="flex flex-col justify-between">
                <div className="flex gap-2">
                  <Avatar className="size-14 border-2 border-purple-400">
                    <AvatarImage src="" alt={post.user.username} />
                    <AvatarFallback className="uppercase">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-center">
                    <Link
                      href={`/user/${post.user.username}`}
                      className="text-sm font-semibold capitalize"
                    >
                      {post.user.displayName}
                    </Link>
                    <span className="text-sm text-gray-500">{date}</span>
                  </div>
                </div>

                <p>{post.content}</p>

                {/* <div>#endregion #endregion #region</div> */}
              </div>
            </article>
          );
        })}

      {/* <Post />
        <Post />
        <Post />
        <Post /> */}
    </section>
  );
};
