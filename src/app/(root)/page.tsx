import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/db/drizzle";
import { PostWithUser } from "@/db/schema";
import { getInitials } from "@/lib/utils";
import Createpost from "./CreatePost";

export default async function Home() {
  const posts = await db.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    with: {
      user: true,
    },
  });

  console.log("posts", posts);
  return (
    <section className="h-screen w-2/4 overflow-auto bg-card p-6">
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
      <PostFeed posts={posts} />
    </section>
  );
}

export const PostFeed = ({ posts }: { posts: PostWithUser[] }) => {
  return (
    <section className="mt-6 flex w-full flex-col space-y-6">
      {posts.length > 0 &&
        posts.map((post) => {
          const initials = getInitials(post.user.displayName!);
          const date = new Date(post.createdAt!).toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          });
          return (
            <div className="relative rounded-lg bg-secondary p-4 shadow-md">
              <div className="flex flex-col justify-between">
                <div className="flex gap-2">
                  <Avatar className="size-14 border-2 border-purple-400">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback className="uppercase">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-sm font-semibold capitalize">
                      {post.user.displayName}
                    </span>
                    <span className="text-sm text-gray-500">{date}</span>
                  </div>
                </div>

                <p>{post.content}</p>

                <div>#endregion #endregion #region</div>
              </div>
              {/* <div className="mt-4">
         <Image
           src="/assets/auth-image.jpg"
           fill
           alt="post image"
           className="rounded-lg"
         />
       </div> */}
            </div>
          );
        })}

      {/* <Post />
      <Post />
      <Post />
      <Post /> */}
    </section>
  );
};

// export const Post = () => {
//   return (
//     <div className="relative rounded-lg bg-secondary p-4 shadow-md">
//       <div className="flex flex-col justify-between">
//         <div className="flex gap-2">
//           <Avatar className="size-14 border-2 border-purple-400">
//             <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//             <AvatarFallback>JM</AvatarFallback>
//           </Avatar>
//           <div className="flex flex-col items-start justify-center">
//             <span className="text-sm font-semibold">John Martins</span>
//             <span className="text-sm text-gray-500">14 Aug at 4:21 PM</span>
//           </div>
//         </div>

//         <p>
//           Design Shot is an invitation to ponder on design as a living entity,
//           capable of embodying and influencing the flow of thoughts and
//           sensations in an ever-changing reality...
//         </p>

//         <div>#endregion #endregion #region</div>
//       </div>
//       {/* <div className="mt-4">
//         <Image
//           src="/assets/auth-image.jpg"
//           fill
//           alt="post image"
//           className="rounded-lg"
//         />
//       </div> */}
//     </div>
//   );
// };
