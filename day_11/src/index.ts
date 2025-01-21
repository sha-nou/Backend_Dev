import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { products } from "./db/schema";

const sql = neon(process.env.DATABAASE_URL);
const db = drizzle({ client: sql });
export const result = db.insert(products).values({id:1})
