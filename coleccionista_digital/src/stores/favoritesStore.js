import { defineStore } from "pinia";
import { saveToLocal, getFromLocal } from "@/services/communicationManager";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: getFromLocal("favorites") || [],
  }),

  actions: {
    addFavorite(item) {
      // Evitar duplicados
      if (!this.isFavorite(item.mal_id)) {
        this.favorites.push(item);
        saveToLocal("favorites", this.favorites);
      }
    },

    removeFavorite(mal_id) {
      // Cambio: f.id → f.mal_id ( Jikan API usa mal_id)
      this.favorites = this.favorites.filter((f) => f.mal_id !== mal_id);
      saveToLocal("favorites", this.favorites);
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
