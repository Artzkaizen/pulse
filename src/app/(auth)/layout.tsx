import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (user) redirect("/");
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="grid h-5/6 w-2/3 grid-cols-2 rounded-xl border-2 shadow-lg max-md:grid-cols-1">
        <div className="m-auto w-3/4 max-md:w-full max-md:p-4">{children}</div>
        <aside className="relative overflow-hidden p-4 max-md:hidden">
          <Image
            className="rounded-r-lg"
            src="/assets/auth-image.jpg"
            alt="auth image"
            fill
          />
        </aside>
      </div>
    </section>
  );
}
