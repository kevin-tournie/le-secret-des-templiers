import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";


async function runMigrations() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL environment variable is not specified");
    }
    const db = drizzle(process.env.DATABASE_URL);

    await migrate(db, {
        migrationsFolder: './drizzle'
    });

    process.exit(0);
}

runMigrations();
