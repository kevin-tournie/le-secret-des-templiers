// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const queryConnection = postgres(process.env.DATABASE_URL!);
// const migrationConnection = postgres(process.env.DATABASE_URL!, { max: 1 });

export const db = drizzle(queryConnection);

// const main = async () => {
// 	await migrate(drizzle(migrationConnection), { migrationsFolder: 'drizzle' });
// 	await migrationConnection.end();

// 	process.exit(0);
// };

// main();