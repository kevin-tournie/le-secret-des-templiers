export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  if (!to.query.responses || !loggedIn.value) {
    return abortNavigation();
  }
});
