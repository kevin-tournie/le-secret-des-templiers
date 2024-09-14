export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession();

  console.log("équipe connectée ?", loggedIn.value, user.value);
  if (loggedIn.value === false) {
    return navigateTo("/accueil");
  }
});
