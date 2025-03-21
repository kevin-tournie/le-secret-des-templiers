// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    logLevel: process.env.LOG_LEVEL,
    endgamePassword: process.env.ENDGAME_PASSWORD,
  },
  compatibilityDate: "2024-07-04",
  modules: ["nuxt-auth-utils", "@nuxt/test-utils/module"],
  routeRules: {
    "/": {
      redirect: "/accueil",
    },
  },
  css: ["~/assets/styles/main.css"],
  ssr: false,
});
