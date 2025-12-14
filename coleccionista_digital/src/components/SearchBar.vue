<template>
  <div class="search-box">
    <input
      v-model="query"
      type="text"
      placeholder="Busca un anime..."
      @keyup.enter="handleSearch"
    />
    <button @click="handleSearch">Buscar</button>
  </div>
</template>
<script setup>
import { ref } from "vue";

const emit = defineEmits(["search"]);
const query = ref("");

const handleSearch = () => {
  emit("search", query.value);
};
</script>

<style scoped>
.search-box {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  max-width: 800px;
}

input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #764ba2;
}

input::placeholder {
  color: #999;
}

button {
  padding: 0.75rem 1.5rem;
  background: #804fb1;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s;
}

button:hover {
  background: #5f3d85;
  transition: 0.3s;
}

@media (max-width: 480px) {
  .search-box {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>
