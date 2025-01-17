CREATE TABLE "category" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" integer PRIMARY KEY NOT NULL,
	"orderDate" date,
	"totalPrice" numeric
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar,
	"categoryId" integer,
	"price" numeric
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"orderId" integer,
	"productId" integer,
	"quantity" integer
);
--> statement-breakpoint
DROP TABLE "custom"."category" CASCADE;--> statement-breakpoint
DROP TABLE "custom"."orders" CASCADE;--> statement-breakpoint
DROP TABLE "custom"."products" CASCADE;--> statement-breakpoint
DROP TABLE "custom"."users" CASCADE;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
DROP SCHEMA "custom";
