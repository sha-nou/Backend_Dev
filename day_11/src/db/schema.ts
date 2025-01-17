import { PgTable,date,decimal,integer, pgSchema, pgTable, varchar } from "drizzle-orm/pg-core";




export const products=pgTable('products',{
    id:integer().primaryKey(),
    name:varchar(),
    categoryId:integer().references(()=>category.id),
    price:decimal()
})

export const category=pgTable('category',{
    id:integer().primaryKey(),
    name:varchar()
})
export const users=pgTable('users',{
    id:integer().primaryKey(),
    orderId:integer().references(()=>orders.id),
    productId:integer().references(()=>products.id),
    quantity:integer()

})

export const orders=pgTable('orders',{
    id:integer().primaryKey(),
    orderDate:date(),
    totalPrice:decimal()
})
