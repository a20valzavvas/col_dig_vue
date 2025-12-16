// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true }, //
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "https://api.jikan.moe/v4",
      geminiKey: process.env.NUXT_PUBLIC_GEMINI_KEY,
    },
  },
  modules: ["@pinia/nuxt"],
});
