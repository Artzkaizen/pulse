import { relations } from "drizzle-orm";
import {
  foreignKey,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("pulse_users", {
  id: text("id").primaryKey(),
  bio: text("bio"),
  email: text("email").unique(),
  avatar: text("avatar").unique(),
  username: text("username").unique().notNull(),
  googleId: text("google_id").unique(),
  password: text("password"),
  gender: text("gender"),
  displayName: text("display_name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
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
export const posts = pgTable("pulse_posts", {
  id: serial("id").primaryKey().notNull(),
  content: text("content"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const follows = pgTable(
  "pulse_follows",
  {
    followerId: text("follower_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followingId: text("following_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.followerId, table.followingId] }),
    };
  },
);
export type Follow = typeof follows.$inferSelect;
export const sessionForeignKeys = {
  userId: foreignKey({ columns: [users.id], foreignColumns: [users.id] }),
};

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  following: many(follows, { relationName: "following" }),
  followers: many(follows, { relationName: "followers" }),
  sessions: many(sessions),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    relationName: "followers",
    fields: [follows.followingId],
    references: [users.id],
  }),
  following: one(users, {
    relationName: "following",
    fields: [follows.followerId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type Follows = typeof follows.$inferSelect;

export type PostWithUser = Post & {
  user: User;
  nextCursor?: number | null;
};
