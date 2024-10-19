CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"company" text,
	"time" integer,
	"score" integer DEFAULT 0 NOT NULL,
	"malus_points" integer DEFAULT 0 NOT NULL,
	"created_at" text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	"updated_at" text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	CONSTRAINT "teams_name_unique" UNIQUE("name")
);
