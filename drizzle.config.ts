import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not specified")
}

export default defineConfig({
    dialect: 'postgresql',
    schema: './server/database/schema.ts',
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});