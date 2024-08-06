import useDeletePost from "@/components/posts/useDeletePost";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PostWithUser } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Ellipsis, Trash, User } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "./SessionProvider";

export default function PopoverActions({ post }: { post: PostWithUser }) {
  const deletePost = useDeletePost();
  const { user } = useSession();
  const canDelete = user.id === post.userId;
  return (
    <AlertDialog>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"secondary"}
            className={cn(
              "ml-auto opacity-0 group-hover:opacity-100 cursor-pointer",
              {
                hidden: !canDelete,
              },
            )}
          >
            <Ellipsis />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col w-fit justify-start px-0 py-1">
          <Button variant="ghost">
            <User className="mr-1 h-4 w-4" />
            View Profile
          </Button>
          <Separator className="-mx-1 my-1 h-px bg-muted" />
          <AlertDialogTrigger asChild>
            <Button variant="ghost">
              <Trash className="mr-2 h-4 w-4" />
              Delete post
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deletePost.mutate(post.id, {
                    onSuccess: () => {
                      toast.success("Post deleted successfully");
                    },
                    onError: (error) => {
                      toast.error("Failed to delete post");
                    },
                  });
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </PopoverContent>
      </Popover>
    </AlertDialog>
  );
}
