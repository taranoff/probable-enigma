export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui", "@nuxt/eslint", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      cocktailCodes: process.env.COCKTAIL_CODES.split(/\s*,\s*/g) || ["a1"],
    },
  },

  devServer: {
    host: "0.0.0.0",
  },
});
