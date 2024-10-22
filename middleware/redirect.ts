export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig();
  if (to.path === "/") {
    return navigateTo("/" + config.public.cocktailCodes[0]);
  }
});
