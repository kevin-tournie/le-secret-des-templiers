import { sql, type InferSelectModel } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

// Par défaut, drizzle crée également un schema "drizzle" dans la base de données
// et crée une table "drizzle_migrations" pour suivre les migrations

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  company: text("company"),
  time: integer("time"),
  score: integer("score").notNull().default(0),
  malus_points: integer("malus_points").notNull().default(0),

  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export type Team = InferSelectModel<typeof teams>;
