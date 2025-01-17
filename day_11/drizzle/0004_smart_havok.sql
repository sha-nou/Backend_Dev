CREATE TABLE "custom"."category" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
ALTER TABLE "custom"."products" ADD COLUMN "categoryId" integer;--> statement-breakpoint
ALTER TABLE "custom"."products" ADD CONSTRAINT "products_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "custom"."category"("id") ON DELETE no action ON UPDATE no action;