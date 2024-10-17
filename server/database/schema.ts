import { sql, type InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const teams = pgTable('teams', {
  id: integer("id").primaryKey(),
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