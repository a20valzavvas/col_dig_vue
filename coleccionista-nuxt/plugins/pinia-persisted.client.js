import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export default defineNuxtPlugin(({ $pinia }) => {
  // El plugin usa localStorage (cliente) — por eso .client.js
  $pinia.use(piniaPluginPersistedstate);
});
