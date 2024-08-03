import { cache } from "react";
import { adapter } from "@/db/drizzle";
import { cookies } from "next/headers";
import { Lucia, Session, User } from "lucia";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(userAttributes) {
    return {
      id: userAttributes.id,
      displayName: userAttributes.display_name,
      avatar: userAttributes.avatar_url,
      google_id: userAttributes.google_id,
      username: userAttributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseUserAttributes: UserAttributes;
  }
}

interface UserAttributes {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  google_id: string | null;
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return { user: null, session: null };
    }

    const result = await lucia.validateSession(sessionId);
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch (error) {
      console.log(error);
    }

    return result;
  },
);
