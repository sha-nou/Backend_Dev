CREATE TABLE "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "categoryName" varchar;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_categoryName_category_name_fk" FOREIGN KEY ("categoryName") REFERENCES "public"."category"("name") ON DELETE no action ON UPDATE no action;