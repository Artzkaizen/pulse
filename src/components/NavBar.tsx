"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
const NavBar = () => {
  const { user } = useSession();

  const initials = getInitials(user.displayName!);

  return (
    <header className="h-screen w-1/4 overflow-auto">
      <nav className="flex flex-col items-center justify-between border-r p-8">
        {/* <Image src="/assets/pulse.svg" alt="Logo" width={40} height={40} /> */}
        <div className="flex flex-col p-2">
          {/* <UserDropDown user={user.displayName || ""} /> */}
          <Avatar className="mx-auto size-20">
            <AvatarImage src="https://github.com/sdshadcn.png" alt="@shadcn" />
            <AvatarFallback className="uppercase text-2xl font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <h2 className="mx-auto text-2xl font-bold capitalize">
            {user.displayName}
          </h2>
          <p className="mx-auto">@{user.username}</p>
          <p className="text-sm">
            Guiding the next generation through the journey of health and
            knowledge!
          </p>
          <div className="flex items-center justify-around">
            <span className="">
              <p className="block text-center font-semibold">368</p>
              <span className="text-sm">Post</span>
            </span>
            <span>
              <p className="block text-center font-semibold">284.3K</p>
              <span className="text-sm">Followers</span>
            </span>
            <span>
              <p className="block text-center font-semibold">1.02M</p>
              <span className="text-sm">Following</span>
            </span>
          </div>
        </div>
        <hr className="h-1 w-full bg-foreground" />
        <ul className="mr-auto flex w-full flex-col space-y-2 py-6">
          <li>
            <Button
              className="h-12 w-full justify-start bg-transparent text-accent-foreground hover:text-primary-foreground"
              asChild
            >
              <Link href="/" className="flex gap-3">
                <HomeIcon className="h-6 w-6" />
                Home
              </Link>
            </Button>
          </li>
          <li>
            <Button
              className="h-12 w-full justify-start bg-transparent text-accent-foreground hover:text-primary-foreground"
              asChild
            >
              <Link href="/" className="flex gap-3">
                <MessageSquare className="h-6 w-6" />
                Message
              </Link>
            </Button>
          </li>
          <li>
            <Button
              className="h-12 w-full justify-start bg-transparent text-accent-foreground hover:text-primary-foreground"
              asChild
            >
              <Link href="/" className="flex items-center gap-3">
                <Bell className="h-6 w-6" />
                <span>Notifications</span>
                <span className="ml-auto inline-block rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                  13
                </span>
              </Link>
            </Button>
          </li>

          <li>
            <Button
              className="h-12 w-full justify-start bg-transparent text-accent-foreground hover:text-primary-foreground"
              asChild
            >
              <Link href="/" className="flex gap-3">
                <Settings className="h-6 w-6" />
                Settings
              </Link>
            </Button>
          </li>
        </ul>
        <hr className="h-1 w-full bg-foreground" />
        <div className="mb-4 flex w-full items-center justify-between">
          <h3 className="text-xl font-semibold">Contacts</h3>
          <p className="text-sm">View all</p>
        </div>

        {/* Contacts section */}
        <div className="flex w-full flex-col justify-start gap-4">
          <div className="flex w-full items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
            <span>
              <h4 className="text-md font-semibold">Jack Monero</h4>
              <p className="text-xs">Liked your story</p>
            </span>
          </div>
          <div className="flex w-full items-center gap-4">
            <Avatar>
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <span>
              <h4 className="text-md font-semibold">Chris Dinner</h4>
              <p className="text-xs">Liked your story</p>
            </span>
          </div>
          <div className="flex w-full items-center gap-4">
            <Avatar>
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <span>
              <h4 className="text-md font-semibold">Martin Stilke</h4>
              <p className="text-xs">Liked your story</p>
            </span>
          </div>
          <div className="flex w-full items-center gap-4">
            <Avatar>
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>RH</AvatarFallback>
            </Avatar>
            <span>
              <h4 className="text-md font-semibold">Rick Hart</h4>
              <p className="text-xs">Liked your story</p>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default NavBar;

import {
  Bell,
  HomeIcon,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Monitor,
  PlusCircle,
  Settings,
  User,
} from "lucide-react";

import { logout } from "@/app/(auth)/actions";

import { useSession } from "@/app/(root)/SessionProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { useTheme } from "next-themes";

export function UserDropDown({ user }: { user: string }) {
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    logout();
  };
  const initials = getInitials(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full bg-green-200 p-0 hover:bg-transparent"
        >
          <Avatar>
            <AvatarFallback className="font-medium uppercase">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Monitor className="mr-2 h-4 w-4" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>System...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
