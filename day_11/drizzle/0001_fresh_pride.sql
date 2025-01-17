CREATE TYPE "public"."roles" AS ENUM('guest', 'user', 'admin');--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(256),
	"last_name" varchar(256),
	"email" varchar NOT NULL,
	"invitee" integer,
	"role" "roles" DEFAULT 'guest'
);
--> statement-breakpoint
DROP TABLE "custom"."users" CASCADE;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_invitee_users_id_fk" FOREIGN KEY ("invitee") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
DROP SCHEMA "custom";
