<template>
  <div class="search-page">
    <h1>Buscar Anime</h1>
    <SearchBar @search="handleSearch" />

    <div v-if="loading" class="loading">Buscando anime...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="results.length > 0" class="results">
      <ItemCard v-for="anime in results" :key="anime.mal_id" :item="anime">
        <template #favorites>
          <button @click="store.toggleFavorite(anime)" class="favorite-btn">
            {{ store.isFavorite(anime.mal_id) ? "❤️" : "🤍" }}
          </button>
        </template>
      </ItemCard>
    </div>

    <div v-if="searched && results.length === 0 && !loading" class="no-results">
      No se encontraron resultados.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ItemCard from "@/components/ItemCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import { useFavoritesStore } from "../stores/favoritesStore";
import { useSearch } from "@/composables/useSearch";

const store = useFavoritesStore();
const { query, results, loading, error, search } = useSearch();
const searched = ref(false);

const handleSearch = async (valor) => {
  // trim elimina espacios en blanco
  if (!valor.trim()) {
    error.value = "Por favor, escribe un término de búsqueda.";
    return;
  }

  searched.value = true;
  query.value = valor;
  await search();
};
</script>

<style scoped>
.search-page {
  padding: 2rem;
}

h1 {
  margin-bottom: 1.5rem;
}

.search-box {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1.5rem;
  background: #1e90ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: #1570d6;
}

.loading,
.error,
.no-results {
  padding: 1rem;
  margin: 1rem 0;
  text-align: center;
  font-size: 1.1rem;
}

.error {
  color: #d32f2f;
  background: #ffebee;
  border-radius: 4px;
}

.no-results {
  color: #666;
}

.results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.favorite-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
}

.favorite-btn:hover {
  transform: scale(1.2);
  background: transparent;
}
</style>
