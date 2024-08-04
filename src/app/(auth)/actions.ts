"use server";

import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const logout = async () => {
  const { session } = await validateRequest();
  if (!session) {
    console.error("No session found. Unauthorized access.");
    throw new Error("Unauthorized");
  }
  console.log("Invalidating session:", session.id);
  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  console.log("logout ran");
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/signin");
};
