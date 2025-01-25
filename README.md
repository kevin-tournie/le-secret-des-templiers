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

To run the production bundle you need to specify those environnement variables:

```bash
LOG_LEVEL="error" ENV="production" DATABASE_URL="your_database_url"
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Execute migration

This project uses Postgresql as database engine and drizzle as an ORM and migrations manager.
To generate a migration, run :

```bash
npx drizzle-kit generate
```

Then, to run the migrations :

```bash
npx drizzle-kit migrate
```
