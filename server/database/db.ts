import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const { databaseUrl } = useRuntimeConfig();

export const db = drizzle(databaseUrl);

async function runMigrations() {
    await migrate(db, {
        migrationsFolder: './drizzle'
    });

    process.exit(0);
}

runMigrations();