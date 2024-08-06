import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Createpost from "./CreatePost";
import PostFeed from "./PostFeed";

export default async function Home() {
  return (
    <section className="h-screen w-full overflow-auto bg-card p-6">
      <div className="flex space-x-4">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="size-14 border-2 border-dashed border-purple-500 bg-transparent">
            <AvatarImage src="https://github.com/shadcn.pwsdng" alt="@shadcn" />
            <AvatarFallback>+</AvatarFallback>
          </Avatar>
          <span className="text-sm">Add Story</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Avatar className="size-14 border-2 border-purple-400">
            <AvatarImage src="https://github.com/shadcn.pwsdng" alt="@shadcn" />
            <AvatarFallback>JM</AvatarFallback>
          </Avatar>
          <span className="text-sm">John</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Avatar className="size-14 border-2 border-purple-400">
            <AvatarImage src="https://github.com/shadcn.pwsdng" alt="@shadcn" />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <span className="text-sm">Chris</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Avatar className="size-14 border-2 border-purple-400">
            <AvatarImage src="https://github.com/shadcn.pwsdng" alt="@shadcn" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <span className="text-sm">Martin</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Avatar className="size-14 border-2 border-purple-400">
            <AvatarImage src="https://github.com/shadcn.pwsdng" alt="@shadcn" />
            <AvatarFallback>KI</AvatarFallback>
          </Avatar>
          <span className="text-sm">Kir</span>
        </div>
      </div>
      <div className="bg-green-200"></div>
      <Createpost />
      <hr className="h-[2px] w-full bg-foreground my-3 " />
      <PostFeed />
    </section>
  );
}
