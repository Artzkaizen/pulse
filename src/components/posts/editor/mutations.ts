import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { submitPost } from "./actions";

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = { queryKey: ["posts"] };
      await queryClient.cancelQueries(queryFilter);
      queryClient.setQueriesData(queryFilter, (oldPosts: any) => {
        const [firstPage] = oldPosts.pages;
        if (firstPage) {
          return {
            pageParams: oldPosts.pageParams,
            pages: [
              {
                ...firstPage,
                posts: [newPost, ...firstPage.posts],
              },
              ...oldPosts.pages.slice(1),
            ],
          };
        }
      });

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });
      toast.success("Post Created Successfully");
    },
    onError: async (error) => {
      console.error(error);
      toast.error("Failed to Create Post. Try Again!!!");
    },
  });

  return mutation;
};
