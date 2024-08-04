import { pgTable, text, timestamp, foreignKey } from "drizzle-orm/pg-core";

// Define the `users` table
export const users = pgTable("pulse_users", {
  id: text("id").primaryKey(),
  bio: text("bio"),
  email: text("email").unique(),
  avatar: text("avatar").unique(),
  username: text("username").unique(),
  googleId: text("google_id").unique(),
  password: text("password"),
  displayName: text("display_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessions = pgTable("pulse_sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sessionForeignKeys = {
  userId: foreignKey({ columns: [users.id], foreignColumns: [users.id] }),
};
