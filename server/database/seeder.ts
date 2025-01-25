import { seed } from "drizzle-seed";
import { teams } from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";

const db = drizzle(process.env.DATABASE_URL!);

async function createSeed() {
    await seed(db, { teams }).refine((f) => ({
        teams: {
            columns: {
                company: f.companyName(),
                name: f.country(),
                score: f.int({
                    minValue: 0,
                    maxValue: 15000,
                }),
                malus_points: f.int({
                    minValue: 0,
                    maxValue: 15000,
                }),
                id: f.int({
                    minValue: 0,
                    isUnique: true
                }),
                time: f.int({
                    minValue: 0,
                    maxValue: 9000,
                }),
                createdAt: f.date(),
                updatedAt: f.date(),
            },
            count: 30
        }
    }))
    process.exit(0);
}

createSeed();