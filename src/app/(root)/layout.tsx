import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import NavBar from "@/components/NavBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();
  if (!session.user) redirect("/signin");
  return (
    <section>
      <SessionProvider value={session}>
        <div>
          <NavBar />
          {children}
        </div>
      </SessionProvider>
    </section>
  );
}
