import { relations } from "drizzle-orm";
import { PgTable,date,decimal,integer, pgSchema, pgTable, varchar } from "drizzle-orm/pg-core";


export const products=pgTable('products',{
    id:integer().primaryKey(),
    name:varchar(),
    categoryId:integer('categoryId'),
    price:decimal()
})

export const category=pgTable('category',{
    id:integer().primaryKey(),
    name:varchar()
})

export const orders=pgTable('orders',{
    id:integer().primaryKey(),
    orderDate:date(),
    totalPrice:decimal()
})

export const productRelations=relations(products,({one})=>({
    category: one(category,{
        fields:[products.id],
        references: [category.id]
    })
}))

