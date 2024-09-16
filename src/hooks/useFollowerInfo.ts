import { FollowerInfo } from "@/components/FollowButton";
import { kyInstance } from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";

export default function useFollowerInfo(
  userId: string,
  initialState: FollowerInfo,
) {
  return useQuery({
    queryKey: ["follower-info", userId],
    queryFn: () =>
      kyInstance.get(`/api/followers/${userId}`).json<FollowerInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });
}
