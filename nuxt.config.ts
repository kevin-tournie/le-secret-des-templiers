// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },
  devtools: { 
    enabled: true 
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    logLevel: process.env.LOG_LEVEL,
    env: process.env.ENV    
  },
  compatibilityDate: "2024-07-04",
  modules: [
    "nuxt-auth-utils", 
    "@nuxt/content", 
    "@nuxt/image", 
    "@nuxt/test-utils/module"],
  routeRules: {
    "/": {
      redirect: "/accueil",
    },
  },
  css: ['~/assets/main.css'],
  ssr: false,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  }
});
