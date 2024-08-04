import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import NavBar from "@/components/NavBar";
import RightSideBar from "@/components/RightSideBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();
  if (!session.user) redirect("/signin");
  return (
    <main>
      <SessionProvider value={session}>
        <div className="flex">
          <NavBar />
          {children}
          <RightSideBar />
        </div>
      </SessionProvider>
    </main>
  );
}
