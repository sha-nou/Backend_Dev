import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { users } from "./db/schema";

const sql = neon(process.env.DATABAASE_URL);
const db = drizzle({ client: sql });
const result = db.insert(users).values({
  id: 1,
});
