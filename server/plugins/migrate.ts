import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import logger from "../libs/pino";

export default defineNitroPlugin(() => {
  async function runMigrations() {
    logger.info("Running migrations in production mode");

    const { databaseUrl } = useRuntimeConfig();

    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is not specified");
    }
    const db = drizzle(databaseUrl);

    await migrate(db, {
      migrationsFolder: "./drizzle",
    });

    logger.info("Migrations completed successfully");
  }

  if (process.env.NODE_ENV === "production") {
    runMigrations();
  }
});
