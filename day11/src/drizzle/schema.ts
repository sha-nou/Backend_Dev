import { date, decimal, integer, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";

export const productTable = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 20 }).notNull(),
  price: decimal(),
  categoryName:varchar().references(()=>
  categoryTable.name ,{onDelete:'cascade'}
)
});

export const userTable=pgTable("user",{
    id:uuid("id").primaryKey().defaultRandom(),
    orderId:uuid("id").references(()=>
        orderTable.id ,{onDelete:"cascade"}
    ),
    quantity:integer(),
    productId:integer().references(()=>
    productTable.id ,{onDelete:"cascade"}
)
})

export const orderTable=pgTable("order",{
    id:uuid("id").primaryKey().defaultRandom(),
    orderDate:date(),
    totalPrice:decimal()
})

export const categoryTable=pgTable("category",{
    id:uuid("id").primaryKey().defaultRandom(),
    name:varchar().notNull()
})