"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { lucia } from "@/lib/auth";
import { users } from "@/db/schema";
import { cookies } from "next/headers";
import { verify } from "@node-rs/argon2";
import { redirect } from "next/navigation";
import { authFormSchema } from "@/lib/utils";
import { isRedirectError } from "next/dist/client/components/redirect";

const formSchema = authFormSchema("signin");

export const login = async (
  credentials: z.infer<typeof formSchema>,
): Promise<{ error: string }> => {
  try {
    const { username, password } = formSchema.parse(credentials);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    console.log(existingUser);
    if (!existingUser || !existingUser.password) {
      return { error: "Incorrect user or password" };
    }
    const isVaildPassword = await verify(existingUser.password, password, {
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });
    if (!isVaildPassword) {
      return { error: "Incorrect user or password" };
    }
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/");
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) throw error;

    return { error: "Something went wrong" };
  }
};
