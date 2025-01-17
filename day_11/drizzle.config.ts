import {defineConfig} from "drizzle-kit"

export default defineConfig({
  dialect: "postgresql",
  schema: "/home/shasha/learn_node/day_11/src/db/schema.ts",
  dbCredentials:{
    url:process.env.DATABASE_URL
  }
});