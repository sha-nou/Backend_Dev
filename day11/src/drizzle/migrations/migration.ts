import 'dotenv/config'
import { max } from 'drizzle-orm'
import {drizzle} from 'drizzle-orm/postgres-js'
import {migrate} from 'drizzle-orm/postgres-js/migrator'
import postgres = require('postgres')

const migrationClient=postgres(process.env.DATABASE_URL as string ,{max:1})

async function main() {
    
migrate(drizzle(migrationClient), {
  migrationsFolder: "./src/drizzle/migrations",
})
migrationClient.end()
}
main()