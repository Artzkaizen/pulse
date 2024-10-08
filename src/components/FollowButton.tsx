"use client";

import useFollowerInfo from "@/hooks/useFollowerInfo";
import { kyInstance } from "@/lib/ky";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRoundMinus, UserRoundPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}
interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}
export default function FollowButton({
  userId,
  initialState,
}: FollowButtonProps) {
  const queryClient = useQueryClient();
  const { data } = useFollowerInfo(userId, initialState);

  const queryKey: QueryKey = ["follower-info", userId];

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? kyInstance.delete(`/api/followers/${userId}`)
        : kyInstance.post(`/api/followers/${userId}`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    },
  });

  return (
    <Button
      variant={data.isFollowedByUser ? "secondary" : "default"}
      onClick={() => mutate()}
    >
      {data.isFollowedByUser ? <UserRoundMinus /> : <UserRoundPlus />}
    </Button>
  );
}
