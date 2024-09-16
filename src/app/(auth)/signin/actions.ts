"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { authFormSchema } from "@/lib/utils";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = authFormSchema("signin");

export const login = async (
  credentials: z.infer<typeof formSchema>,
): Promise<{ error: string | null }> => {
  try {
    const { username, password } = formSchema.parse(credentials);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (!existingUser || !existingUser.password) {
      return { error: "Incorrect user or password" };
    }
    const isValidPassword = await verify(existingUser.password, password, {
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });
    if (!isValidPassword) {
      return { error: "Incorrect user or password" };
    }
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) throw error;
    return { error: "Something went wrong" };
  }
  return redirect("/");
};
