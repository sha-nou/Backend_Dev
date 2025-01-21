ALTER TABLE "products" RENAME COLUMN "categoryId" TO "category_id";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_category_id_fk";
