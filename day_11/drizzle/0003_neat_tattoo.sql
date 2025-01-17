ALTER TABLE "custom"."category" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "custom"."category" CASCADE;--> statement-breakpoint
ALTER TABLE "custom"."products" DROP CONSTRAINT "products_category_category_id_fk";
--> statement-breakpoint
ALTER TABLE "custom"."products" DROP COLUMN "category";