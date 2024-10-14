// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: true 
  },
  compatibilityDate: "2024-07-04",
  modules: [
    "@nuxt/ui", 
    "nuxt-auth-utils", 
    "@nuxt/content", 
    "@nuxt/image", 
    "@nuxt/test-utils/module"],
  routeRules: {
    "/": {
      redirect: "/accueil",
    },
  },
  ssr: false,
});
