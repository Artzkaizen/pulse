import SuggestAccounts from "@/app/(root)/SuggestAccount";
import { Edit, MessageCircle, Mic, Search } from "lucide-react";
import { Suspense } from "react";
import { LoadingSkeleton } from "./LoadingSekleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function RightSideBar() {
  return (
    <aside className="w-2/4 border-l-2 max-lg:hidden">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Message</h3>
          <Edit size={18} />
        </div>
        <div className="flex items-center justify-center rounded-lg border px-2 ring-2 ring-secondary focus-within:bg-transparent focus-within:ring-primary">
          <Search />
          <Input
            placeholder="Search..."
            className="border-0 outline-none ring-0 focus-within:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Mic />
        </div>
        <div>
          <div className="flex border-b-2">
            <Button className="h-5 p-0" variant={"ghost"}>
              Primary
            </Button>
            <Button className="ml-2 mr-auto h-5 p-0" variant={"ghost"}>
              General
            </Button>
            <Button className="h-5 p-0" variant={"ghost"}>
              Requests(3)
            </Button>
          </div>
          <div className="flex flex-col space-y-4 py-2">
            <div className="flex items-center justify-between">
              <div className="inline-flex gap-3">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.pwsdng"
                    alt="@shadcn"
                  />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">Joh Martins</p>
                  <p className="text-sm">Memphis, TN, US</p>
                </div>
              </div>
              <MessageCircle className="-rotate-90" />
            </div>
            <div className="flex items-center justify-between">
              <div className="inline-flex gap-3">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.pwsdng"
                    alt="@shadcn"
                  />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">Joh Martins</p>
                  <p className="text-sm">Memphis, TN, US</p>
                </div>
              </div>
              <MessageCircle className="-rotate-90" />
            </div>
            <div className="flex items-center justify-between">
              <div className="inline-flex gap-3">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.pwsdng"
                    alt="@shadcn"
                  />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">Joh Martins</p>
                  <p className="text-sm">Memphis, TN, US</p>
                </div>
              </div>
              <MessageCircle className="-rotate-90" />
            </div>
            <div className="flex items-center justify-between">
              <div className="inline-flex gap-3">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.pwsdng"
                    alt="@shadcn"
                  />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">Joh Martins</p>
                  <p className="text-sm">Memphis, TN, US</p>
                </div>
              </div>
              <MessageCircle className="-rotate-90" />
            </div>
          </div>
        </div>
      </div>

      <hr className="h-1 w-full bg-foreground" />
      <div className="flex flex-col gap-4 px-6 py-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Suggestion</h3>
          <p className="text-sm">View all</p>
        </div>
        <Suspense fallback={<LoadingSkeleton />}>
          <SuggestAccounts />
        </Suspense>
      </div>

      {/* <footer>This is the footer in aside</footer> */}
    </aside>
  );
}

export default RightSideBar;
