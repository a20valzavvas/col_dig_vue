import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  // Activar persistencia a nivel de store (pinia-plugin-persistedstate)
  // Persiste solo la lista de favoritos en localStorage (por defecto)
  persist: { paths: ["favorites"] },

  state: () => ({
    favorites: [],
  }),

  actions: {
    addFavorite(item) {
      // Evitar duplicados
      if (!this.isFavorite(item.mal_id)) {
        this.favorites.push(item);
      }
    },

    removeFavorite(mal_id) {
      // Cambio: f.id → f.mal_id ( Jikan API usa mal_id)
      this.favorites = this.favorites.filter((f) => f.mal_id !== mal_id);
    },

    // Nueva función para añadir/quitar con un solo botón
    toggleFavorite(item) {
      if (this.isFavorite(item.mal_id)) {
        this.removeFavorite(item.mal_id);
      } else {
        this.addFavorite(item);
      }
    },
  },

  getters: {
    isFavorite: (state) => (mal_id) =>
      state.favorites.some((f) => f.mal_id === mal_id),
  },
});
