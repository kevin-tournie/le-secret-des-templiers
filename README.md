# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

To run the production bundle:

```bash
LOG_LEVEL="error" ENV="production"
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Execute migration

This project uses SQLite as database engine.
To generate the migrations, run :

```bash
npx drizzle-kit generate
```

Then, to run the migrations :

```bash
npx tsx server/database/migrate.ts
```
