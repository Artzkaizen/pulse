import {RoutePost} from "@/app/api/posts/route";
import {InfiniteData, QueryFilters, useMutation, useQueryClient,} from "@tanstack/react-query";
import {usePathname, useRouter} from "next/navigation";
import {toast} from "sonner";
import {deletePost} from "./actions";

const useDeletePost = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters = {queryKey: ["posts"]};
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<RoutePost, number | null>>(
          queryFilter,
          (oldPosts) => {
            if (!oldPosts) return;
            return {
              pageParams: oldPosts.pageParams,
              pages: oldPosts.pages.map((page) => ({
                nextCursor: page.nextCursor,
                posts: page.posts.filter(
                    (post) => deletedPost && post.id !== deletedPost.id,
                ),
              })),
            };
          },
      );
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Failed to delete post");
    },
  });
};

export default useDeletePost;
