import { sql, type InferSelectModel } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const teams = sqliteTable('teams', {
    id: integer('id').primaryKey(),
    name: text('name').notNull().unique(),
    company: text('company').notNull(),
    start_time: text('start_time'),
    end_time: text('end_time'),
    score: integer('score').notNull().default(0),
    malus_points: integer('malus_points').notNull().default(0),

    createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updated_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export type Team = InferSelectModel<typeof teams>;