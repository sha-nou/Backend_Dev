import { db } from "./drizzle/db"
import { productTable } from "./drizzle/schema"

async function main(
) {
   await db.insert(productTable).values({
        name: "test product",
    })

  const user = await db.query.productTable.findFirst()
  console.log(user)
}
main()