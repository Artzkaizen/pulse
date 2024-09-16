"use client";
import { FollowerInfo } from "@/components/FollowButton";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import { formatNumber } from "@/lib/utils";

const FollowerCount = ({
  userId,
  type,
  initialState,
}: {
  userId: string;
  type: "followers" | "following";
  initialState: FollowerInfo;
}) => {
  const { data } = useFollowerInfo(userId, initialState);

  if (type === "followers") {
    return <div> {formatNumber(data.followers)}</div>;
  }
  if (type === "following") {
    throw new Error("Not implemented");
    return <div> {formatNumber(0)}</div>;
  }
  return null;
};

export default FollowerCount;
