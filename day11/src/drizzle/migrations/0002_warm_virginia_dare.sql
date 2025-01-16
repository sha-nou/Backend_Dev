CREATE TABLE "order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orderDate" date,
	"totalPrice" numeric
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid,
	"quantity" integer,
	"productId" integer
);
--> statement-breakpoint
DROP TABLE "price" CASCADE;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "price" numeric;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_order_id_fk" FOREIGN KEY ("id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;