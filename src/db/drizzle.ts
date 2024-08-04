import pg from "pg";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL, // Replace with your actual PostgreSQL connection string
  ssl: {
    rejectUnauthorized: false, // For development, you might set this to true in production
  },
});
const db = drizzle(pool, { schema });

const adapter = new DrizzlePostgreSQLAdapter(db, schema.sessions, schema.users);
export { db, adapter };
