import { defineConfig } from 'drizzle-kit';

const { databaseUrl } = useRuntimeConfig();

export default defineConfig({
    dialect: 'postgresql',
    schema: './server/database/schema.ts',
    out: "./drizzle",
    dbCredentials: {
        url: databaseUrl,
    },
});