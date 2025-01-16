import { drizzle } from "drizzle-orm/neon-http";
import * as schema  from './schema'
import postgres = require("postgres");
import { neon } from "@neondatabase/serverless";

const client = neon(
  "postgresql://Sales_owner:3RWCoU2Dydax@ep-muddy-frost-a59kvrve.us-east-2.aws.neon.tech/Sales?sslmode=require"
);
export const db = drizzle(client,{schema,logger:true})