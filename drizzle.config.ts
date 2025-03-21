import { defineConfig } from "drizzle-kit";

let databaseUrl;

if (process.env.NODE_ENV !== "production") {
  databaseUrl = process.env.DATABASE_URL!;
} else {
  databaseUrl = useRuntimeConfig().databaseUrl;
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/database/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: databaseUrl,
  },
});
