# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

To execute the migrations locally, you can use node > 22.6 with the experimental stripe feature for typescript files:

```bash
node --experimental-strip-types --env-file=.env bin/migrate_dev.ts
```

To run the production bundle you need to specify those environnement variables:

```bash
LOG_LEVEL="error" ENV="production" DATABASE_URL="your_database_url"
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Execute migration

This project uses Postgresql as database engine and drizzle as an ORM and migrations manager.
To generate a migration, run :

```bash
pnpm run db:generate
```

Then, to run the migrations in a local environnement :

```bash
pnpm run db:migrate
```

In production, the migrations are executed during the build of the nuxt app with

```bash
pnpm run build
```

To run the seed script :

```bash
DATABASE_URL="postgresql://username:password@hostname:port/database" npx tsx server/database/seeder.ts
```
