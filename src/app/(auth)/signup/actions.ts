"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { authFormSchema } from "@/lib/utils";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
const formSchema = authFormSchema("signup");

export const signUp = async (
  credentials: z.infer<typeof formSchema>,
): Promise<{ error: string }> => {
  try {
    const { username, email, password, firstname, lastname } =
      formSchema.parse(credentials);
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    const userId = generateIdFromEntropySize(10);
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (existingUser) return { error: "Username already exists" };

    if (email) {
      const existingEmail = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (existingEmail) return { error: "Email already taken" };
    }

    const avatarUrl = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    await db.insert(users).values({
      id: userId,
      username,
      email,
      gender: "male",
      avatar: avatarUrl,
      password: passwordHash,
      displayName: `${firstname} ${lastname}`,
    });

    const createdUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!createdUser) {
      console.error("User creation failed");
      return { error: "User creation failed" };
    }
    const session = await lucia.createSession(userId, {});
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
