<template>
  <div class="card" @click="goToDetail">
    <img
      v-if="item.images?.jpg?.image_url"
      :src="item.images.jpg.image_url"
      :alt="item.title"
      class="card-image"
    />
    <div v-else class="card-image-placeholder">Sin imagen</div>

    <div class="card-content">
      <h3>{{ item.title }}</h3>
      <p v-if="item.year" class="year">{{ item.year }}</p>
      <p v-if="item.score" class="rating">{{ item.score }}</p>
      <p v-if="item.type" class="type">{{ item.type }}</p>
      <!-- <p v-if="item.status" class="status">{{ item.status }}</p> -->
      <div class="card-actions" @click.stop>
        <slot name="favorites"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["item"]);
const router = useRouter();

const goToDetail = () => {
  router.push({ name: "item-id", params: { id: props.item.mal_id } });
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.card-image-placeholder {
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  color: #999;
}

.card-content {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
}

p {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  color: #666;
}

.rating {
  color: #ff9800;
  font-weight: bold;
}

.type {
  color: #9c27b0;
  font-size: 0.8rem;
}

.card-actions {
  margin-top: auto;
  padding-top: 0.5rem;
}
</style>
