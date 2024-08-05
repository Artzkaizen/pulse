import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export function LoadingSkeleton({
  className,
  pluse,
}: {
  className?: string;
  pluse?: string;
}) {
  return (
    <div className={cn("flex items-center space-x-3 w-full", className)}>
      <Skeleton className={cn("h-12 w-12 rounded-full flex-shrink-0", pluse)} />
      <div className="flex-1 space-y-2">
        <Skeleton className={cn("h-4 w-4/5", pluse)} />
        <Skeleton className={cn("h-4 w-3/4", pluse)} />
      </div>
    </div>
  );
}
