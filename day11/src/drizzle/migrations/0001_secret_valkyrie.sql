CREATE TABLE "price" (
	"productId" uuid
);
--> statement-breakpoint
ALTER TABLE "price" ADD CONSTRAINT "price_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;