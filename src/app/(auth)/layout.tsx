import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="grid h-5/6 w-2/3 grid-cols-2 rounded-xl bg-white shadow-lg">
        <div className="m-auto w-3/4">{children}</div>
        <aside className="relative overflow-hidden p-4">
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
