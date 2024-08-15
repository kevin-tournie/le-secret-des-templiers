import { useLogger } from "nuxt/kit";

export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  console.log("équipe connectée ?", loggedIn.value);
  if (loggedIn.value === false) {
    return navigateTo("/accueil");
  }
});
