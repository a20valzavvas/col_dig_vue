<template>
  <div class="favorites-page">
    <h1>Mis Favoritos</h1>
    <div v-if="store.favorites.length === 0" class="no-favorites">
      No tienes favoritos aún.
    </div>
    <div v-else class="favorites-list">
      <ItemCard
        v-for="anime in store.favorites"
        :key="anime.mal_id"
        :item="anime"
      >
        <template #favorites>
          <button
            @click="store.removeFavorite(anime.mal_id)"
            class="remove-btn"
          >
            Eliminar
          </button>
        </template>
      </ItemCard>
    </div>
  </div>
</template>
<script setup>
const store = useFavoritesStore();
</script>

<style scoped>
.favorites-page {
  padding: 2rem;
}

h1 {
  margin-bottom: 1.5rem;
}

.no-favorites {
  padding: 2rem;
  text-align: center;
  color: #666;
  font-size: 1.2rem;
}

.favorites-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.remove-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  width: 100%;
}

.remove-btn:hover {
  background: #d32f2f;
}
</style>
