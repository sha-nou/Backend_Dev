CREATE SCHEMA "custom";
--> statement-breakpoint
CREATE TABLE "custom"."category" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE "custom"."orders" (
	"id" integer PRIMARY KEY NOT NULL,
	"orderDate" date,
	"totalPrice" numeric
);
--> statement-breakpoint
CREATE TABLE "custom"."products" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar,
	"category" varchar,
	"price" numeric
);
--> statement-breakpoint
CREATE TABLE "custom"."users" (
	"id" integer PRIMARY KEY NOT NULL,
	"orderId" integer,
	"productId" integer,
	"quantity" integer
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "custom"."products" ADD CONSTRAINT "products_category_category_id_fk" FOREIGN KEY ("category") REFERENCES "custom"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom"."users" ADD CONSTRAINT "users_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "custom"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom"."users" ADD CONSTRAINT "users_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "custom"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
DROP TYPE "public"."roles";