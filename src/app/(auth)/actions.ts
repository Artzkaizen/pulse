"use server";

import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const { session } = await validateRequest();
  if (!session) {
    console.error("No session found. Unauthorized access.");
    throw new Error("Unauthorized");
  }
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
